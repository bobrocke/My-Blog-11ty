// For eleventyConfig.addDateParsing below
import { DateTime } from "luxon";

// https://www.eladnarra.com/blog/2024/dates-and-eleventy/
export default function(eleventyConfig) {
  eleventyConfig.addFilter("postDate", (dateObj) => {
  let thisDateTime = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(
    "America/New_York",
    { keepLocalTime: true }
  );
  return thisDateTime.toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.getFilter("slugify");
}
