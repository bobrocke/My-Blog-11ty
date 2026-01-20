---
title: Sublime Text in 2026?
date: 2026-01-06
<<<<<<< HEAD
lastmod: 2026-01-20
=======
lastmod:
>>>>>>> GitHub/master
categories: ["Development"]
tags: ["Sublime Text"]
draft: false
---

I was using [Sublime Text](https://www.sublimetext.com/) back in 2016, or so. After working through [Atom](https://atom-editor.cc/), [VS Code](https://code.visualstudio.com/), and most recently [Zed](https://zed.dev/), I'm almost back to Sublime Text (now version 4), again.

<!--more-->

<figure style="float: right; width: 20%; margin: 1em 0em 1em 1em">
  <img src="/assets/images/post-images/sublime-logo.png" alt="Sublime HQ Logo" >
</figure>

Is Sublime Text truly a solid option in 2026? Although I think Zed is the future of native code editors, Zed is still relatively new. Sublime Text is plenty fast (it's written in C++), has a wealth of packages (even though some are getting pretty old and unmaintained), support on Discord is excellent, and is more easily customizable than Zed (written in Rust).

<<<<<<< HEAD
## The Good

Much about Sublime Text is "done", as in essentially feature complete. More modern features (things than came along after Sublime Text's foundation was established) are available as packages. LSP servers [can be connected](https://lsp.sublimetext.io/) by a number of different packages. And AI is supported by several packages which give access to GitHub Copilot, ChatGPT, and OpenAI. In truth, AI is not as fully supported as in Zed or Cursor, which were built with AI in mind.
=======
Much about Sublime Text is "done", as in essentially feature complete. More modern features (things than came along after Sublime Text's foundation was established) are available as packages. LSP servers [can be connected](https://lsp.sublimetext.io/) by a number of different packages. And AI is supported by several packages which give access to GitHub Copilot, ChatGPT, and OpenAI. In truth, AI is not as fully supported as in Zed, which was built with AI in mind.
>>>>>>> GitHub/master

Language support in Sublime Text is excellent. I often use [Liquid](https://shopify.github.io/liquid/), [Gotmpl](https://pkg.go.dev/html/template), and [Vento](https://vento.js.org/); all of their implementations as packages are better than those for Zed and even VS Code. The [ColorHelper](https://packagecontrol.io/packages/ColorHelper) package is excellent. And, to match Zed and VS Code, the [Terminus](https://packagecontrol.io/packages/Terminus) package adds a tightly integrated terminal pane.

<img src="/assets/images/post-images/ZedLogo.png" alt="Zed Logo" style="float: left; width: 20%; margin: 1em 1em 1em 0em">

If a Zed extension exists for the programming language you use and you like the results of syntax highlighting, all is well. But if you need to tweak something, get ready for a lot of studying. The tree-sitter parsers and grammar used by Zed are pretty tough to learn and Zed makes it hard to even tell what scope has been applied to which part of your code.

Sublime Text uses the old TextMate approach to syntax definitions (.tmLanguage), as does VS Code, evolved to the newer .sublime-syntax. Both use regex to match parts the code to specific scopes. Those scopes can then be styled by color schemes (.sublime-color-scheme) which are based on, and evolved, from the TextMate .tmTheme format. It's very easy to find what scope has been applied and then to edit the color scheme to taste.

My configuration for Sublime Text is every bit as good as Zed for my purposes.

<figure style="float: left; width: 50%; margin: 1em 1em 1em 0em">
  <a class="glightbox" href="/assets/images/post-images/sublime-interface-find.png"><img src="/assets/images/post-images/sublime-interface-find.png" alt="Sublime Text Find Interface"></a>
</figure>

<figure style="float: left; width: 50%; margin: 1em 1em 1em 0em">
  <a class="glightbox" href="/assets/images/post-images/sublime-interface-completion.png"><img src="/assets/images/post-images/sublime-interface-completion.png" alt="Sublime Text Completion Interface" ></a>
</figure>

<<<<<<< HEAD
## The Less Good

But it's not all a bed of roses. You can see a bit of Sublime Text's age in some of its interface. Here are the find and code completion panels (click to enlarge). The buttons and their size are perfectly functional, but old school.

=======
But it's not all a bed of roses. You can see a bit of Sublime Text's age in some of its interface. Here are the find and code completion panels (click to enlarge). The buttons and their size are perfectly functional, but old school.

>>>>>>> GitHub/master
Keep an eye out for old packages meant for Sublime Text 3, some of those may not behave well in version 4. And, as you search for helpful packages, you'll start to notice many that are several years old. Sublime Text is no longer the modern darling of the developer community, so some development effort is being directed away from it.

VS Code and Zed are free; Sublime Text costs $99 for a three-year license. After that, you must renew in order to continue getting updates. The good news is that one personal license covers all your computers and operating systems. That makes Sublime Text an oddity in today's market, but it's not supported by large corporations (VS Code by Microsoft and Zed by $42 million in investor funding). You can see some of that lack of funding in the slow release cycle (the last update was in May).

<<<<<<< HEAD
After having said that Zed is the future, it's just not ready for me yet. My major complaints are all around language support for Vento, Gotmpl, and Liquid. None are excellent and all are not as good as Sublime Text's. Perhaps I put too much weight on syntax coloring in the editor, but I find it makes the code easier to read and often can point out syntax errors before build time.
=======
After having said that Zed is the future, it's just not ready for me just yet. My major complaints are all around language support for Vento, Gotmpl, and Liquid. None are excellent and all are not as good as Sublime Text's. Perhaps I put too much weight on syntax coloring in the editor, but I find it makes the code easier to read and often can point out syntax errors before build time.
>>>>>>> GitHub/master

So, until, and if, Zed language support improves, it looks like it is, indeed, Sublime Text in 2026.
