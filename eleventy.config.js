import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets", {
    // Don't copy the tailwind-input.css file into _site
    // filter: ["!**/*tailwind-input.css"],
  });

  // Create a collection of all the posts in src/posts.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  eleventyConfig.setBrowserSyncConfig({
    files: ["dist/**/*"],
    open: true,
  });

  // Add 11ty's syntax highlighter'
  eleventyConfig.addPlugin(syntaxHighlight);
  // And the markdown filter plugin
  eleventyConfig.addPlugin(eleventyPluginMarkdown);
  // And the vite plugin
  eleventyConfig.addPlugin(EleventyVitePlugin);
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  templateFormats: ["html", "liquid", "md"],
};
