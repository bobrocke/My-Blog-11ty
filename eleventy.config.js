import syntaxHighlight from "eleventy-plugin-highlightjs";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";
import logToConsole from "eleventy-plugin-console-plus";
import markdownItDef from "markdown-it-deflist";

import tailwindcss from "eleventy-plugin-tailwindcss-4";

import filters from "./_config/filters.js";
import collections from "./_config/collections.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDef));

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->",
    excerpt_alias: "post_excerpt",
  });

  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
    if (data.draft && process.env.DRAFTS !== "1") {
      return false;
    }
  });

  // Add my filters
  eleventyConfig.addPlugin(filters);

  // Add my collections
  eleventyConfig.addPlugin(collections);

  // Add the Highlight.js syntax highlighter
  eleventyConfig.addPlugin(syntaxHighlight);
  // And the markdownify filter plugin
  eleventyConfig.addPlugin(eleventyPluginMarkdown);
  // Add console plus plugin
  eleventyConfig.addPlugin(logToConsole, { depth: 4 });

  eleventyConfig.addPlugin(tailwindcss, {
    input: "tailwind-input.css",
    output: "assets/css/tailwind.css",
    minify: false,
  });
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  templateFormats: ["html", "liquid", "md"],

  markdownTemplateEngine: false,
};
