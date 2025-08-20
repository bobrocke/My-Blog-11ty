---
title: Hugo is Good
date: 2025-04-05
lastmod:
summary: This site is now running on Hugo, a popular Static Site Generator (SSG). I tried [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [Astro](https://astro.build/), and [Eleventy/11ty](https://www.11ty.dev/) on the way here, but settled on Hugo. It's good!
description:
draft:
categories: [Web Development]
tags: [Hugo]
---

This site is now running on Hugo, a popular Static Site Generator (SSG). I tried [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [Astro](https://astro.build/), and [Eleventy/11ty](https://www.11ty.dev/) on the way here, but settled on Hugo. It's good!

<!--more-->

All of those other SSGs were very good and in wide use, but didn't quite fit, for me.

Jekyll
: One of the original SSGs, but it's getting a bit old, now. Ruby isn't as popular as it once was and many of the available Jekyll themes were released years ago and not updated since. Gems can be a bit of a pain to work with, too, because each version of Ruby on your machine needs its own set of gems.

Astro
: A very popular option, but a bit too much for this site. It's really a complete app framework that goes far beyond what I need. It's just too 'heavy'.

Eleventy/11ty
: Another popular SSG that's fast, customizable, and extendable via plugins and JavaScript. A little _too_ extendable for my tastes -- it's very basic out-of-the-box and needs those plugins. It seems as if every little thing has to be installed and configured almost from scratch -- dates, categories, next/previous post links,...

An often reported, stand out feature of Hugo is its speed in generating content. This is not a big site, but it takes Hugo only 1.2 seconds to generate 82 pages, 16 paginated pages, and move 45 images. Changing a couple of pages takes Hugo milliseconds to regenerate and serve. It feels almost instant and that makes development pleasant.

As opposed to Jekyll's gems and 11ty's node modules, Hugo is a single binary with no dependencies to manage unless you decide you need them. I've added only [TailwindCSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/), and [PostCSS](https://postcss.org/) -- all popular and well-maintained packages.

There's built-in support for multiple taxonomy page displays and the posts for each category within. This site uses 'categories' and 'tags', but many more taxonomies are possible. 11ty can't do that without plugins and extra custom code.

But there's a bit more of a learning curve for Hugo than the others. Hugo is an all Go environment -- it's written in Go and uses only the Go Template Language. If you've been working in more widely used template languages, you'll need a bit to get up to speed. For example here's a conditional: `{{ if ne $title .Name }}`. That means 'if $title is not equal to .Name'. More typical would be `{% if $title != .Name %}`.

I don't find Hugo's [documentation](https://gohugo.io/documentation/) easy to navigate, so I often use a web search to find what I need. When I get stuck, which is often, I've gotten excellent help on [their Discourse forum](https://discourse.gohugo.io/).

After some time at it, I'm getting more comfortable with the things in Hugo that seemed odd to me at first. But the way that Hugo [finds layouts](https://gohugo.io/templates/lookup-order/#home-templates) still makes me think hard.

On the good side, this is all it takes to output a nicely formatted date: `{{ .Date | time.Format ":date_long" }}`. In 11ty, you start with `{{ modifiedDate | postDate }}` and then write the `postDate` filter:

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

Yep, you have to configure every little thing.
