import { chunk } from "lodash-es";
import slugify from "slugify";

export default function (eleventyConfig) {
  // Create a collection of all the posts in src/blog and add previousPost and nextPost data.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
    const numberOfPosts = posts.length;
    posts.forEach((element, index) => {
      console.log(": ", posts[index].data.page.url);
      element.data["numberOfPosts"] = numberOfPosts;
      element.data["currentPostIndex"] = index;

      // you'll need to deal with the first and last posts
      // otherwise you'll get an error
      if (index === 0) {
        element.data["previousPost"] = null;
      } else {
        element.data["previousPost"] = posts[index - 1].page.url;
      }

      if (index === numberOfPosts - 1) {
        element.data["nextPost"] = null;
      } else {
        element.data["nextPost"] = posts[index + 1].page.url;
      }
    });
    return posts;
  });

  // A collection of the posts by each category with pagination.
  eleventyConfig.addCollection("postsByCategories", (collectionAPI) => {
    let numberOfresultsPerPage = 8; // number of results per page
    let slugPrefix = "/posts"; // Optional: the prefix for the slug could be /articles or /blog etc

    // some variables to help with creating our data structure
    let postsByCategories = [];
    let pageDataForAllCategories = [];
    let categoryData = {};

    // Create a collection of posts.
    const posts = collectionAPI.getFilteredByGlob("./src/blog/*.md");

    // Create a Set to store unique categories.
    let uniqueCategories = new Set();

    // Loop through each post and add its category to the Set.
    posts.forEach(post => {
      if (post.data.categories) {
        if (Array.isArray(post.data.categories)) {
          post.data.categories.forEach(category => {
            uniqueCategories.add(category.toString());
          })
        }
        else {
            uniqueCategories.add(post.data.categories);
        }
      }
    });

    // We now have a set of uniquie categories
    // console.log(`There are ${posts.length} posts in ${uniqueCategories.size} unique categories`)
    // console.log(uniqueCategories)

    // Loop through each unique category
    uniqueCategories.forEach((categoryName) => {
      let allPostinCurrentCategory = [];

      // loop through all the posts.
      // If the current post category matches the current category
      // then add it to the allPostinCurrentCategory array.
      posts.forEach(post => {
        if (post.data.categories) {
          if (Array.isArray(post.data.categories)) {
            post.data.categories.forEach(category => {
              if (category.toString() == categoryName) {
                allPostinCurrentCategory.push(post);
              }
            });
          }
          } else {
            if (post.data.category == categoryName) {
              allPostinCurrentCategory.push(post);
            }
          }
      });

      console.log(categoryName);

      // chunk up all the posts in this category by the number of results/page we want.
      // We need to do this so we can create pagination.
      // chunk() is from lodash-es imported above
      let chunks = chunk(allPostinCurrentCategory, numberOfresultsPerPage);

      // create the slug for this category
      let slug = `${slugPrefix}/${slugify(categoryName, { lower: true })}/`;

      // create an array of pageSlugs for this category
      let pageSlugs = [];
      for (let i = 0; i < chunks.length; i++) {
        let thisSlug = slug;
        // If there is more than one page of results.
        if (i > 0) {
          thisSlug = `${i + 1}`;

          // check to see if the slug has a prefix
          // don't want to add an addianal / if its not needed.
          if (slug != "") {
            thisSlug = `${slug}${i + 1}/`;
          }
        }
        pageSlugs.push(`${thisSlug}`);
      }

      // create a data structure to hold the category data
      // makes the UI easier to create.
      categoryData[categoryName] = {
        name: categoryName,
        slug: slug,
        numberOfPosts: allPostinCurrentCategory.length,
      };

      // console.log(`[ categoryData ]:`, categoryData);

      // create a data structure to hold all the posts
      pageDataForAllCategories.push({
        categoryName: categoryName,
        posts: allPostinCurrentCategory,
        categoryData: categoryData,
        chunkedPosts: chunks,
        numberOfPosts: allPostinCurrentCategory.length,
        numberOfPagesOfPosts: chunks.length,
        pageSlugs: pageSlugs,
      });
    });

    //  console.log(`[ pageDataForAllCategories ]:`, pageDataForAllCategories);

    // Create a single flattened aray of all the posts and pagination data.
    // This allows us to use pagination in our templates.
    pageDataForAllCategories.forEach((category) => {
      let thisCategoriesPageSlugs = category.pageSlugs;

      // loop each of the chunked posts
      category.chunkedPosts.forEach((posts, index) => {
        // set some properties useful in the UI
        let isFirstPage = index == 0 ? true : false;
        let isLastPage = category.numberOfPagesOfPosts == index + 1 ? true : false;

        // contruct the pagination object and add to blogPostsByCategories Array
        postsByCategories.push({
          categoryName: category.categoryName,
          // contructs the pageslugs needed for pagination controls.
          pageSlugs: {
            all: thisCategoriesPageSlugs,
            next: thisCategoriesPageSlugs[index + 1] || null,
            previous: thisCategoriesPageSlugs[index - 1] || null,
            first: thisCategoriesPageSlugs[0] || null,
            last:
              thisCategoriesPageSlugs[thisCategoriesPageSlugs.length - 1] ||
              null,
            count: thisCategoriesPageSlugs.length,
          },
          slug: thisCategoriesPageSlugs[index],
          totalPages: category.numberOfPagesOfPosts, // total number of pages of posts
          numberOfPosts: category.numberOfPosts, // total number of posts in this category
          isFirstPage: isFirstPage, // true if this is first chunk/page of results.
          isLastPage: isLastPage, // true if this is last chunk/page of results.
          currentPage: index + 1, // the current page (useful for UI)
          posts: posts, // the posts in this chunk
          categoryData,
        });
      });
    });

    return postsByCategories;
  });
}
