---
title: Learning About Eleventy
date: 2025-12-06
datemodified:
categories: ["Web Development"]
tags: ["Eleventy"]
description:
summary:
draft: true
---

I finished moving this blog from WordPress to Hugo. But I read about a number of other static site generators before I chose Hugo. Hugo is very popular and very capable, but it does have its oddities. Eleventy (aka 11ty) is another very popular system and I felt  I needed to understand it better before finalizing my decision to use Hugo.

<!--more-->

So I'm re-writing my blog with 11ty---no better way to learn about it.

11ty documentation is solid, if a little short on API details, but the search feature is pretty good. There doesn't seem to be all that much independent reference material on the web, fortunately there are a number of blog posts available about how to do things the 11ty way. And support for 11ty is exceptional on Discord. I owe @uncenter, @dwkns, @vrugtehagel, and @MWDelaney my thanks.

Hugo comes 'out of the box' with more features than 11ty and no dependencies; you add only the dependencies you choose as plugins from node modules.

11ty, on the other hand, is more of a static site erector set. It comes with just the basics and is intended to be extended and customized though plugins and your own JavaScript code. The code is part of my attraction to 11ty---I'm not very good at JavaScript and this blog re-design is an opportunity for me to learn it. With help on Discord, I managed to get double-pagination working for [Categories](/categories) and [Tags](/tags), next/previous buttons on individual post pages, and the sliding page window for the site's main pagination navigation.

An interesting thing about 11ty is its ability to use a variety of [different template languages](https://www.11ty.dev/docs/languages/), most via plugins. You can even use multiple template languages in the same project for different files! Vento is a relatively new language and it, too, can be added with a plugin; it's seeing some enthusiastic adoption in the 11ty community. Nunjucks and Liquid come in the box and I picked Liquid because I was already familiar with it from using Jekyll.

```javascript
templateFormats: ["html", "liquid", "vto", "md"],
```

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
