import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets", {
    // Don't copy the tailwind-input.css file into _site
    filter: ["!**/*tailwind-input.css"],
  });

  // Create a collection of all the posts in src/posts.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  // Add 11ty's syntax highlighter'
  eleventyConfig.addPlugin(syntaxHighlight);
  // And the markdown filter plugin
  eleventyConfig.addPlugin(eleventyPluginMarkdown);

  // Make 11ty reload after Tailwind runs
  eleventyConfig.addWatchTarget("./_site/assets/css/tailwind.css");

  // Compile tailwind before eleventy processes the files
  // https://www.humankode.com/eleventy/how-to-set-up-tailwind-4-with-eleventy-3/
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/assets/css/tailwind.css");

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
    //cssnano({
    //  preset: "default",
    //}),
  ]);
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  templateFormats: ["html", "liquid", "md"],
};
