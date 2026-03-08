export default {
  eleventyComputed: {
    title: (data) => data.postsCategories?.categoryName,
  },
};
