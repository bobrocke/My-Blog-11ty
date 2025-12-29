---
title: Learning About Eleventy
date: 2025-12-19
lastmod:
categories: ["Web Development"]
tags: ["Eleventy"]
draft: false
---

Back when I finished moving this blog from WordPress to Hugo I read about a number of other static site generators before I chose Hugo. Hugo is very popular and very capable, but it does have its oddities. [Eleventy](https://www.11ty.dev/) (aka 11ty) is another very popular framework and I felt I needed to understand it better.

<!--more-->

So I'm re-writing my blog with 11ty---no better way to learn about it.

11ty documentation is solid, if a little short on API details; the search feature is pretty good. There doesn't seem to be all that much independent reference material on the web, fortunately there are a number of blog posts available about how to do things the 11ty way. And support for 11ty is exceptional on Discord. I owe @uncenter, @dwkns, @vrugtehagel, and @MWDelaney my thanks.

Hugo comes 'out of the box' with more features than 11ty and no dependencies; you add only the dependencies you choose as plugins from node modules.

11ty, on the other hand, is more of a static site erector set. It comes with just the basics and is intended to be extended and customized though plugins and your own JavaScript code. The code is part of my attraction to 11ty---I'm not very good at JavaScript and this blog re-design is an opportunity for me to learn it. With help on Discord, I managed to get double-pagination working for [Categories](/categories) and [Tags](/tags), next/previous buttons on individual post pages, and the sliding page window for the site's main pagination navigation.

An interesting thing about 11ty is its ability to use a variety of [different template languages](https://www.11ty.dev/docs/languages/), most via plugins. You can even use multiple template languages in the same project for different files! Vento is a relatively new language and it, too, can be added with a plugin; it's seeing some enthusiastic adoption in the 11ty community. Nunjucks and Liquid come in the box and I picked Liquid because I was already familiar with it from using Jekyll.

```javascript
templateFormats: ["html", "liquid", "vto", "md"],
```

You can do pretty much anything you want with 11ty, limited only by your JavaScript coding abilities. 11ty's [data cascade](https://www.11ty.dev/docs/data-cascade/) provides a wealth of information to work with. From that, plus your own filters, plugins, and collections, you're in a position to extend 11ty into a blog, an advertising site, your portfolio, and more. [Astro](https://astro.build/) is similar, but a great deal more complicated, hence 11ty's popularity.

There are a few things to watch out for.

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

Seeing [dates displayed off by one day](https://www.11ty.dev/docs/dates/#dates-off-by-one-day) is another thing to be aware of. Once I got the UTC to local time conversion figured out, the off by one day problem cleared up.

And now it's all good. This blog is running on 11ty and I'm very happy to be away from Hugo's odd template language and its idiosyncratic way of doing things. 11ty's Liquid templates (and maybe one day, Vento) feels more natural to me.

