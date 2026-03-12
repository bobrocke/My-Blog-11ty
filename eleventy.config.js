import logToConsole from "eleventy-plugin-console-plus";
import markdownItDef from "markdown-it-deflist";
import markdownItShiki from "@shikijs/markdown-it";
import { VentoPlugin } from "eleventy-plugin-vento";
import markdownIt from "markdown-it";

import filters from "./_config/filters.js";
import collections from "./_config/collections.js";

import vento from "./vento.tmLanguage.json" with { type: "json" };

const md = markdownIt({ typographer: true }).use(
  await markdownItShiki({
    langs: [
      "javascript",
      "typescript",
      "blade",
      "ruby",
      "php",
      "css",
      "html",
      "python",
      "twig",
      "jinja",
      "toml",
      {
        ...vento,
        id: "vento",
        aliases: ["vto"],
      },
    ],
    theme: "one-dark-pro",
  }),
);

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");

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
  eleventyConfig.addFilter("markdownify", (content) => md.render(content));

  // Add my collections
  eleventyConfig.addPlugin(collections);

  // Add console plus plugin
  eleventyConfig.addPlugin(logToConsole, { depth: 10 });

  eleventyConfig.addPlugin(VentoPlugin, {
    autotrim: true,
  });

  // Set markdown-it as the library with Shiki and deflist
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDef));
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  templateFormats: ["vto", "md"],
  markdownTemplateEngine: false,
};
