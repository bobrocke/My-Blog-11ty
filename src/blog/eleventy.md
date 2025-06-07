---
title: Learning About Eleventy
date: 2025-06-06
datemodified:
categories: ["Web Development"]
tags: ["Eleventy"]
description:
summary:
draft: true
---

I finished moving this blog from WordPress to Hugo. But I read about a number of other static site generators before I chose Hugo. Hugo is very popular and very capable, but it does have its oddities. Eleventy (aka 11ty) is another very popular system and I felt as if I needed to understand it better before finalizing my decision to use Hugo.

<!--more-->

So I'm re-writing my blog with 11ty---no better way to learn about it.

11ty documentation is solid, if a little short on API details, but the search feature is pretty good. There doesn't seem to be all that much independent reference material on the web, but there are a number of blog posts about how to do things the 11ty way. And support for 11ty is exceptional on Discord. I owe @uncenter, @dwkns, @vrugtehagel, and @MWDelaney my thanks.


While I experimented with 11ty, I tried out the Bulma CSS library after having used TailwindCSS with Hugo. My impressions will have to wait for another post, suffice it to say that I'm continuing to work with 11ty using TailwindCSS.

Hugo comes 'out of the box' with more features than 11ty; you add others as plugins from node modules. I have these:

```json
"dependencies": {
  "@11ty/eleventy": "^3.0.0",
  "@11ty/eleventy-plugin-syntaxhighlight": "^5.0.0",
  "@jgarber/eleventy-plugin-markdown": "^2.0.1",
  "@tailwindcss/postcss": "^4.0.17",
  "@tailwindcss/typography": "^0.5.16",
  "cssnano": "^7.0.6",
  "flowbite": "^3.1.2",
  "postcss": "^8.5.3",
  "tailwindcss": "^4.0.17"
},
```

Almost all of them are related to getting TailwindCSS, and the TailwindCSS component library [Flowbite](https://flowbite.com/), working.

11ty, on the other hand, is more of a static site erector set. It comes with all the basics but is intended to be customized though plugins and your own JavaScript code. The code is part of my attraction to 11ty---I'm not very good at JavaScript and this blog re-design is an opportunity for me to learn it. With help on Discord, I managed to get double-pagination working for [Topics](/topics), next/previous buttons on individual post pages, and the sliding page window for the site's main pagination.

An interesting thing about 11ty is it's ability to use a variety of [different template languages](https://www.11ty.dev/docs/languages/), most via plugins. Vento is a relatively new language that can be added with a plugin and is seeing some adoption in the 11ty community. Nunjucks and Liquid come in the box and I picked Liquid because I was already familiar with it from using Jekyll.




Dates in 11ty are tricky. The default is UTC time and it took me a while to figure out how to change those dates into my local time and format them in a friendly way. I got some of the way by trial and error, but I eventually got stuck. Stuck until I found [the solution here](https://www.eladnarra.com/blog/2024/dates-and-eleventy/).

```js
import { DateTime } from "luxon";

eleventyConfig.addFilter("postDate", (dateObj) => {
  let thisDateTime = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(
    "America/New_York",
    { keepLocalTime: true },
  );
  return thisDateTime.toLocaleString(DateTime.DATE_MED);
});
```

Seeing [dates displayed off by one day](https://www.11ty.dev/docs/dates/#dates-off-by-one-day) is another thing to watch out for. Once I got the UTC to local time conversion figured out, the off by one day problem cleared up.
