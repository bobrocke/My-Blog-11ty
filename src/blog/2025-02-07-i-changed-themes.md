---
title: I Changed Themes
date: 2025-02-07 10:09:00
summary: A simple (I thought) desire to add a Stack Overflow icon, and link to my account there, in this blog's footer sent me looking for a different, but still uncomplicated theme. Soon, I was off in the weeks. And I said I wouldn't...
image:
categories: [Web Development]
tags: [Jekyll]
---

A simple (I thought) desire to add a Stack Overflow icon, and link to my account there, in this blog's footer sent me looking for a different, but still uncomplicated theme. Soon, I was off in the weeks. And I said I wouldn't...

<!-- more -->

I knew I wanted a theme design with the blog front and center, clear documentation for configuration (preferably made via the `_config.yml` file), simple layout (I like single columns), and the ability to show icons and links to developer related social media sites (such as Stack Overflow or GitHub).

There are several sites offering lists of available Jekyll themes. Here are the ones I found useful:

- [Jekyll Themes](http://jekyllthemes.org/)
- [Best Jekyll Themes](https://www.bestjekyllthemes.com/)
- [JAMstack Themes](https://jamstackthemes.dev/ssg/jekyll/)

Thinking that all Jekyll themes were distributed as gem files, I was surprised to find many themes were only available as GitHub repositories that were meant to be downloaded and built upon by the user. The Jekyll Remote Theme gem allows you to use a theme from its repository without downloading anything -- Clever! But I had nothing but trouble trying to get it to work and gave up.

It's notable, and perhaps a little concerning, that almost all the themes I found were old. A fair number were so old that links to their GitHub repositories went nowhere. A theme newer than 2022 is 'new' and there are many six, or more, years old. Jekyll is not as popular as it once was now that there are more 'modern' static site generators (Next.js in JavaScript, Hugo in Go, and Nuxt in JavaScript are popular examples) inspired by the JAMstack architecture for web projects. The theme I ended up picking was last updated 5 years ago.

So what did I end up doing? Exactly what I said I didn't want to just a couple of days ago. I downloaded the Lanyon theme from GitHub and went to work customizing it. It is a wonderful theme created by a real web developer (he also created Bootstrap!) and you can tell. My customizations were small and, fortunately, didn't detract from Mark Ott's work.

The biggest thing I did was to add the code necessary to put social media icons and links in Lanyon's sidebar. The key to that was [Jessica Reel's post](https://jreel.github.io/social-media-icons-on-jekyll/) from 2017. The central idea is to create a data file and then an `.erb` fragment to loop over that data and format it. Here's the data file:

```yaml
email:
  id: bob@bobrockefeller.com
  href: "mailto: "
  title: "Email"
  fa-icon: "fa-envelope"

github:
  id: "bobrocke"
  href: "https://github.com/"
  title: "GitHub"
  fa-icon: "fa-github"

stackoverflow:
  id: "bob-rockefeller"
  href: "https://stackoverflow.com/users/1938118/"
  title: "Stack Overflow"
  fa-icon: "fa-stack-overflow"

codepen:
  id: "bobrocke"
  href: "https://codepen.io/"
  title: "Code Pen"
  fa-icon: "fa-codepen"

gitlab:
  id: "bobrocke"
  href: "https://gitlab.com/"
  title: "GitLab"
  fa-icon: "fa-gitlab"
```

Using a data file gives me a place to list the various sites, their icons (from Font Awesome), and a link. Add a bit of CSS styling and it's done.

The good side of downloading the theme's source code into my blog project is that I can easily see how it was created and learn. Yes, you can do that with a gem theme, too, but it's just not as effortless. And making little tweaks to the code is straightforward.

For example, I changed the date format from using `{page.date | date_to_string}` to `{page.date | date_to_string: "ordinal", "US"}`. But if the theme were ever updated, which is very unlikely, it would be a real pain to merge the changes.

In the end, I'm happy. I spent a bunch more time getting this blog setup the way I wanted, but I learned a bit more about Jekyll and how its themes work.
