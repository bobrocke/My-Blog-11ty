---
title: Settling on TailwindCSS
date: 2025-04-08
lastmod:
summary:
description:
draft: true
categories: [Web Development, CSS]
tags: [CSS]
---

While experimenting with various [static site generators](/2025-03-14-moving-from-wordpress.html), I've also been learning about [Bulma](https://bulma.io/) (a traditional CSS framework) and [TailwindCSS](https://tailwindcss.com/) (a 'new style' utility CSS framework). They come at the idea of a CSS framework from two very different perspectives, and if you've seen the Internet discussions, you'll know that opinions are decidedly mixed.

<!--more-->

A typical case is styling a button. Bulma let's you do it simply: `<button class="button">Button</button>` and you get a reasonably styled button. It's easy to be sure all your buttons look the same by using the same class on all of them.

TailwindCSS goes at it from another direction. You could style a button like this:

`<button
class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Button </button>
`

A 'problem' in many situations is that most of a page's content is generated from a markdown file. The site author won't have access to the HTML in order to style it in the normal way. Both Bulma and TailwindCSS have classes, `content` for Bulma and `prose` for TailwindCSS, that can be applied to a `<div>` enclosing the markdown output. Something like:

```html
<div class="prose">
  {{ markdown }}
</div>
```

Those classes can then style the HTML tags output by the markdown renderer.
