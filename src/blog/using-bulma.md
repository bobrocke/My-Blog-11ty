---
title: Using Bulma
date: 2025-04-30
lastmod:
summary:
description:
draft: true
categories: []
tags: []
---

Write your blog content here.

<!--more-->

It's a bit complex to customize. Figuring out what variables to override takes some work. And the use of HSL for colors is somewhat out of the ordinary if you're used to defining colors with hex.

Special cases, such as a menu item that changes text color instead of background color when hovered over, will require at least one overriding class. Each special case takes another class override.

In :root, @media (prefers-color-scheme: light), [data-theme=light],
--bulma-family-primary
  --bulma-family-secondary
  --bulma-family-code

   .is-family-primary
   .is-family-secondary
   .is-family-sans-serif
   .is-family-monospace
   .is-family-code
