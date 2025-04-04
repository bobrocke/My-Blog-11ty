import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";

import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

// For eleventyConfig.addDateParsing below
import { DateTime } from "luxon";
const TIME_ZONE = "America/New_York";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Create a collection of all the posts in src/blog.
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->",
  });

  /** Converts the given date string to ISO8601 format. */
  const toISOString = (dateString) => new Date(dateString).toISOString();
  eleventyConfig.addFilter("toISOString", toISOString);

  /** https://simpixelated.com/custom-date-formatting-in-eleventy-js/ */
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // eleventyConfig.addDateParsing(function (dateValue) {
  //   let localDate;
  //   if (dateValue instanceof Date) {
  //     localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(
  //       TIME_ZONE,
  //       { keepLocalTime: true },
  //     );
  //   } else if (typeof dateValue === "string") {
  //     localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
  //   }
  //   if (localDate?.isValid === false) {
  //     throw new Error(
  //       `Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`,
  //     );
  //   }
  //   return localDate;
  // });

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
};
