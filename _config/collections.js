import { chunk } from "lodash-es";
import slugify from "slugify";

export default function (eleventyConfig) {
  // Create a collection of all the posts in src/blog and add previousPost and nextPost data.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    let posts = collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
    const numberOfPosts = posts.length;
    posts.forEach((element, index) => {
      // console.log(": ", posts[index].data.page.url);
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

  // Create a collection of all the tils (Today I Learned) in src/tils and add previousPost and nextPost data.
  eleventyConfig.addCollection("tils", function (collectionApi) {
    let tils = collectionApi.getFilteredByGlob("src/tils/*.md").reverse();
    const numberOfPosts = tils.length;
    tils.forEach((element, index) => {
      // console.log(": ", tils[index].data.page.url);
      element.data["numberOfPosts"] = numberOfPosts;
      element.data["currentPostIndex"] = index;

      // you'll need to deal with the first and last posts
      // otherwise you'll get an error
      if (index === 0) {
        element.data["previousPost"] = null;
      } else {
        element.data["previousPost"] = tils[index - 1].page.url;
      }

      if (index === numberOfPosts - 1) {
        element.data["nextPost"] = null;
      } else {
        element.data["nextPost"] = tils[index + 1].page.url;
      }
    });
    return tils;
  });

  // Create a collection of the posts in each category with pagination.
  // https://chriskirknielsen.com/blog/double-pagination-in-eleventy/
  // https://github.com/dwkns/posts-by-categories/tree/main
  eleventyConfig.addCollection("postsByCategories", function (collectionAPI) {
    let numberOfresultsPerPage = 4; // number of results per page
    let slugPrefix = "/categories"; // Optional: the prefix for the slug could be /articles or /blog etc

    // some variables to help with creating our data structure
    let postsByCategories = [];
    let pageDataForAllCategories = [];
    let categoryData = {};

    // Create a collection of posts.
    const posts = collectionAPI.getFilteredByGlob("./src/blog/*.md").reverse();

    // Create a Set to store unique categories.
    let uniqueCategories = new Set();

    // Loop through each post and add its category to the Set.
    // Deals with a string or an array of strings.
    posts.forEach((post) => {
      if (post.data?.categories) {
        if (Array.isArray(post.data.categories)) {
          // Category is an array
          // loop the array and extract categories
          post.data.categories.forEach((element) => {
            uniqueCategories.add(element.toString());
          });
        } else {
          // Category is a string
          uniqueCategories.add(post.data.categories);
        }
      }
    });

    // we now have a set of unique categories
    // console.log(`There are ${posts.length} posts in ${uniqueCategories.size} unique categories`)
    // console.log(uniqueCategories);

    // Loop through each unique category
    uniqueCategories.forEach((categoryName) => {
      let allPostinCurrentCategory = [];

      // loop through all the posts.
      // If the current post category matches the current category
      // then add it to the allPostinCurrentCategory array.
      posts.forEach((post) => {
        if (Array.isArray(post.data.categories)) {
          // Category is an array
          if (post.data.categories.includes(categoryName)) {
            allPostinCurrentCategory.push(post);
          }
        } else {
          // Category is a string
          if (post.data.category == categoryName) {
            allPostinCurrentCategory.push(post);
          }
        }
      });

      // chunk up all the posts in this category by the number of results per page we want.
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
          // don't want to add an additional / if its not needed.
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

    // Create a single flattened array of all the posts and pagination data.
    // This allows us to use pagination in our templates.
    pageDataForAllCategories.forEach((category) => {
      let thisCategoriesPageSlugs = category.pageSlugs;

      // loop each of the chunked posts
      category.chunkedPosts.forEach((posts, index) => {
        // set some properties useful in the UI
        let isFirstPage = index == 0 ? true : false;
        let isLastPage =
          category.numberOfPagesOfPosts == index + 1 ? true : false;

        // construct the pagination object and add to postsByCategories Array
        postsByCategories.push({
          categoryName: category.categoryName,

          // constructs the page slugs needed for pagination controls.
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

    // console.log(postsByCategories);
    return postsByCategories;
  });

  // Create a collection of all tags used in /blog
  eleventyConfig.addCollection("tagList", function (collectionAPI) {
    const tagsSet = new Set();
    collectionAPI.getFilteredByGlob(["blog/*.md"]).forEach((item) => {
      if (item.data.tags) {
        // Ensure item.data.tags is an array, even if it's a single string
        const itemTags = Array.isArray(item.data.tags)
          ? item.data.tags
          : [item.data.tags];
        itemTags.forEach((tag) => tagsSet.add(tag));
      }
    });

    // Convert Set to Array and sort alphabetically
    return Array.from(tagsSet).sort();
  });
}
