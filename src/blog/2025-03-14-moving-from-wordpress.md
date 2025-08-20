---
title: Moving From WordPress
date: 2025-03-14 19:28:41
lastmod: 2025-03-19 19:28:41
summary: I've done it before and it looks like I'm doing it again. It's the right time to move my [personal blog](https://www.bobrockefeller.com) from WordPress to a static site for simplicity, security, portability, and performance.
image:
categories: [Web Development]
tags: [WordPress]
---

I've done it before and it looks like I'm doing it again. It's time to move my [personal blog](https://www.bobrockefeller.com) from WordPress to a static site for simplicity, security, portability, and performance.

<!--more-->

My objectives for this move are:

- Portability -- you can export a WordPress site into various formats but all of them take a lot of work to make functional in a new system.
- Performance -- WordPress on my shared hosting service just wasn't very fast.
- Security -- a static site doesn't have near as many vectors for hacking as a WordPress site.
- Convenience -- I can write articles in Markdown wherever I am using any text editor and not have to be logged into WordPress

With that in mind, I knew I wanted to use a static site generator and write in simple Markdown. So I needed to pick the right system for this project. My experiments, so far, have been with Jekyll and I like it. But the fact is that Jekyll is a mature system with few updates and many themes that are no longer maintained, or are being maintained only for backward compatibility with the old GitHub Pages workflow. And then there's the pain of managing gems, their breaking changes, and their dependencies.

I needed to consider some other options.

Next.js
: Written in JavaScript and using React templates, this one is very popular. But it's more of an application framework that can also create static sites.

Hugo
: Written in Go and using Go templates, Hugo is coming on like gangbusters. One of its claims to fame is the speed with which it can generate a site. It's also a 'batteries included' system that needs few add-ons.

Eleventy/11ty
: This one is written in JavaScript but is a descendant of Jekyll rather than an application framework. It's not much out of the box, but it's super extensible so you can add what you need. It can even use a number of different template languages, if you have a preference.

Nuxt
: Another JavaScript application framework, but using Vue templates.

Gatsby
: And another JavaScript application framework using React templates!

Astro
: One more JavaScript application framework and with a choice of many possible template languages.

I'm trying out Hugo. I don't want the complexity of an application framework for a static site blog, and learning Go might be interesting. It should take care of my performance, security, and convenience objectives. The portability part will take a bit of work, and discipline, on my part.

Markdown is an inherently portable document format. But plain old Markdown doesn't offer more than the very basics in formatting. Not even Definition Lists, Fenced Code Blocks, Tables, or Footnotes. These features, and others, are implemented in the many Markdown alternatives such as kramdown (Ruby), CommonMark (PHP), markdown-it (JavaScript), and GoldMark (Go).

And that's the problem. The Markdown alternatives don't all agree on syntax and features. Floating an image to the right with a caption requires using either shortcodes, plug-ins, or specialized syntax. None of that is very portable.

The good news for flexibility in image display is that all the Markdown alternatives respect plain HTML. So I can copy and paste a block of code (or, even better, create a snippet) and just edit the image path, the float direction, and add a caption. Maybe change the width.

```html
<figure style="float: right; width: 50%; margin: 1em 0em 1em 1em">
  <img src="/images/image.jpg" alt="Alternate Text" />
  <figcaption>Caption</figcaption>
</figure>
```

Making the caption look 'right' only takes a little CSS in the theme.

```css
figcaption {
  text-align: center;
  font-size: 0.85rem;
}
```

Coding for portability includes what goes in the YAML front matter. For example, some static site generators (or their themes) use an excerpt marker in the text (`<!--more-->` or `<!--excerpt-->`) and others expect the excerpt to be in the `description:` or maybe the `summary:` field in the front matter. So articles I'm writing now use both the `summary` and `<!--more-->`; the comment will just be ignored by generators not using it.

I may end up just using the front matter for excerpts because that might actually be the 'standard'. Before I'm sure, I'll need to do more work in learning how other static site generators use YAML front matter in hopes of finding what really is 'standard' and what will be a portability problem.

So far Hugo is working out pretty well. The learning curve is a little steep for me, not knowing the Go Template Language, and Hugo's documentation doesn't help -- it's broken into so many little pieces that finding what I want is better done with a web search. But most of the available themes are well maintained and several of them are very nice. Right now I'm working with [Roadster](https://roadster-hugo.pages.dev/) which is a fork of Mainroad (because that author no longer maintains it). Hugo is updated frequently and can break themes, so maintenance is important.

Hugo is indeed very fast generating my site. Jekyll was pretty fast, but Hugo is almost instant. Its development server is very good at seeing file changes and updating the browser which makes tweaking things so much easier. I like it.
