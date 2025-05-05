import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";
import logToConsole from "eleventy-plugin-console-plus";

import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

import filters from "./_config/filters.js"
import collections from "./_config/collections.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->",
    excerpt_alias: "post_excerpt",
  });

  // Add the filters
  eleventyConfig.addPlugin(filters);

  // Add the collections
  eleventyConfig.addPlugin(collections);  

  // Add 11ty's syntax highlighter'
  eleventyConfig.addPlugin(syntaxHighlight);
  // And the markdownify filter plugin
  eleventyConfig.addPlugin(eleventyPluginMarkdown);
  // Add console plus plugin
  eleventyConfig.addPlugin(logToConsole, { depth: 2 });

  // Rebuild the site if Tailwind has updated its CSS after 11ty has run
  eleventyConfig.addWatchTarget("./_site/assets/css/tailwind.css");

  // Compile tailwind before 11ty processes the files
  // https://www.humankode.com/eleventy/how-to-set-up-tailwind-4-with-eleventy-3/
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./tailwind-input.css");
    const tailwindOutputPath = "./_site/assets/css/tailwind.css";

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    // Compile tailwind
    tailwindcss(),

    // Minify tailwind css
    cssnano({
     preset: "default",
    }),
  ]);
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  templateFormats: ["html", "liquid", "md"],

  markdownTemplateEngine: false,
};
