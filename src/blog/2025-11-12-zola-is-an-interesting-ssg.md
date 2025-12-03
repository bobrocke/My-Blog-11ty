---
title: Zola is an Interesting SSG
date: 2025-11-12
categories: [Web Development]
tags: [Zola]
draft: false
---

[Zola](https://www.getzola.org/) is a Static Site Generator very similar to [Hugo](https://gohugo.io/). In fact, its author, [Vincent Prouillet](https://github.com/Keats), created Zola partially because he hated the Go Template language but liked Hugo. Since I'm in the same boat, I had to give Zola a try and I'm generally pretty happy with it.

<!--more-->

<img src="/assets/images/post-images/zola-logo.svg" alt="Zola Logo" style="float: right; width: 30%; margin: 1em 0em 1em 1em">
  
There are more things in common between Hugo and Zola than different. They share many important features including speed, custom taxonomies, pagination, single binaries with no dependencies, Markdown as their primary content format, syntax highlighting, shortcodes, and the like. They are written as blog frameworks rather than general purpose frameworks such as [Eleventy](https://www.11ty.dev/) or [Astro](https://astro.build/).

The primary, most obvious difference between creating a blog in Zola vs. Hugo is Zola's template language -- [Tera](https://keats.github.io/tera/). It's heavily inspired by [Jinja2](https://pypi.org/project/Jinja2/) and looks enough like most other template languages you may be familiar with that getting up to speed is easy. So much easier than the Go template language.

Hugo, written in Go, may be the fastest of the SSGs in building a site. But Zola, written in Rust, is every bit as fast. Nether disappoints and builds so fast you almost don't notice. This site builds in 100ms, or less, with Zola.

Blogs are not very complicated websites so Zola has what you need to create one.  I think Zola should be added to [Hugo and Eleventy](@/blog/2025-08-27-hugo-or-11ty.md) when looking for a SSG for your blog. It's a little simpler than Hugo so is missing a few things that Hugo does well.

- Asset Pipeline -- Hugo has a powerful, general purpose asset pipeline for images, stylesheets, and JavaScript. Zola will transpile SASS/SCSS to CSS and handle basic image resizing, but that's it.
- Support -- Zola is basically a one-man show which means Vincent does the best he can responding to questions and problems. Support for Hugo comes on their Discourse Forum and is fast, detailed, and super helpful.
- TailwindCSS -- While Tailwind can be used with Zola, it's very much a second class citizen. Hugo makes Tailwind integration easy.

It's about as easy to move a blog post Markdown file from Hugo to Zola as it is between other static site generators except for taxonomy assignments. Most other systems assign taxonomies in front matter in this form:

```yaml
categories: [Photography Software]
tags: [PhotoLab]
```

Zola requires this:

```yaml
taxonomies:
  categories: [Photography Software]
  tags: [PhotoLab]
```

So there's going to be a bit more text wrangling to migrate blog posts if you use taxonomies.

The command line tool `zola check` is a handy addition that checks for dead links in your site and is a good way to avoid link rot. Unfortunately it will sometimes report a link as broken that is not really broken. I've opened a github issue and hope to see that fixed.

Because Zola development is done by a very small team, it doesn't see frequent updates. That's good from a breakage point of view, but also means that if Zola doesn't do something you need done, you can't really depend on an update to provide it.

But if you're looking for a batteries-included static site generator for your blog, Zola has to rank up there with Hugo.
