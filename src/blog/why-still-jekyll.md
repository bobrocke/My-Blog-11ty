---
title: Why Still Jekyll?
date: 2025-04-05
lastmod:
summary:
description:
draft: true
categories: []
tags: []
---

With the great variety of modern static site generators available, why am I running this blog on Jekyll? Next.js can build whole applications, Hugo is lightening fast at generating a site, and Eleventy is super flexible. Well, Jekyll is still being updated and its simplicity suits blogging.

<!--more-->

I've had a go using Jekyll, Hugo, and Eleventy (with a brief stop over trying Zola and Next.js). Hugo seemed the best fit, despite its oddities, and I got my blog running it on Netlify. It was good.

But, as I've gone back to add and tweak, I keep getting slowed down by the complicated way Hugo [automatically finds layouts] and by my lack of familiarity with the Go Template Language. That template language has its own quirks. One of them is that a comment in a layout gets executed! If you just want to include a comment in the output file you need syntax like this: `{{ "<!-- baseof.html. -->" | safeHTML }}`. Another is the unusual way to use a conditional:`{{ if ne $title .Name }}`. That means 'if $title is not equal to .Name'. A nitpick is that my favorite editor, Zed, does not have an extension to do syntax highlighting for those templates.

Jekyll just seems simpler.

Documentation is good and it's been around so long that there are years worth of guides, posts, and Stack Overflow answers to go to for help. Jekyll uses the well-known Liquid template language and Zed handles it well.

Getting dates formatted for easy reading is also simple; just `{{ post.date | date_to_string: "ordinal", "US" }}`. As an example, Eleventy uses the simple `{{ modifiedDate | postDate }}`, but it's backed by extra JavaScript in Eleventy's configuration file:

```js
import { DateTime } from "luxon";
const TIME_ZONE = "America/New_York";

eleventyConfig.addFilter("postDate", (dateObj) => {
  let thisDateTime = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(
    "America/New_York",
    { keepLocalTime: true },
  );
  return thisDateTime.toLocaleString(DateTime.DATE_MED);
});
```

I do worry that something in Jekyll's dependencies will break and that there won't be a fix as interest in the platform fades.
