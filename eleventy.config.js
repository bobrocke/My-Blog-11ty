import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

// For eleventyConfig.addDateParsing below
import { DateTime } from "luxon";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Create a collection of all the posts in src/blog.
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

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->",
    excerpt_alias: "post_excerpt",
  });

  // https://www.eladnarra.com/blog/2024/dates-and-eleventy/
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let thisDateTime = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(
      "America/New_York",
      { keepLocalTime: true },
    );
    return thisDateTime.toLocaleString(DateTime.DATE_MED);
  });

  // Add 11ty's syntax highlighter'
  eleventyConfig.addPlugin(syntaxHighlight);
  // And the markdownify filter plugin
  eleventyConfig.addPlugin(eleventyPluginMarkdown);

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

  markdownTemplateEngine: false,
};
