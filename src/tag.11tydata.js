export default {
  eleventyComputed: {
    title: (data) => data.postsTags?.tagName,
  },
};
