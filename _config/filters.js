// For eleventyConfig.addDateParsing below
import { DateTime } from "luxon";
import slugify from "slugify";

// https://www.eladnarra.com/blog/2024/dates-and-eleventy/
export default function (eleventyConfig) {
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let thisDateTime = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(
      "America/New_York",
      { keepLocalTime: true },
    );
    return thisDateTime.toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("getPost", function (collection, url) {
    return collection.find((post) => post.data.page.url === url);
  });

  eleventyConfig.addFilter("stringSlugify", (str) =>
    slugify(str, { lower: true }),
  );
}
