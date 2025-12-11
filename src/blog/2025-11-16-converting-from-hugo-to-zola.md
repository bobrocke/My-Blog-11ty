---
title: Converting from Hugo to Zola
date: 2025-11-16
categories: [Web Development]
tags: [Zola]
draft: false
---

I've made the switch from Hugo to Zola mostly because I had come to dread making substantial changes to this site. Go's template language is too weird and the way I implemented Tailwind is too fragile. Zola and plain old CSS have cleared all that up.

<!--more-->

## Problems
There are plenty of complaints across the web about the Go template language; it's powerful, but much more difficult to learn and use compared to other popular template languages such as Liquid or Jinja2. Here are a couple of small examples.

This initializes and sets the variable `$end` to `$start` plus `2`:

```twig
{{ $end := add $start 2 }}
```

And this tests to see if `$start` is less than `2`:

```twig
{{ if lt $start 2 }}
```

Neither is impossible to decipher, but once you add enough template logic to build a site, looking at blocks of this unusual syntax gets confusing. I'll admit that with more experience I would come to read it more easily. Even so, it makes it harder to see examples written in more typical template languages and envision them for Hugo.

The Tailwind problem is my own doing from a sincere attempt to use it as I think is intended. But I ended up with code like this:

```twig
{{ if eq $.Paginator.PageNumber $k }}
  <li>
    <a aria-current="page" aria-label="Page {{ $k }}" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600" role="button">{{ $k }}</a>
  </li>
{{ else }}
  <li>
    <a href="{{ (index $.Paginator.Pagers (sub $k 1)).URL }}" aria-label="Page {{ $k }}" class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-red-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-600" role="button">{{ $k }}</a>
  </li>
{{ end }}
```

Verbose, repetitive, and difficult to remain consistent across the site.

## Solutions

Zola takes care of my inexperience with Go templates without giving up capabilities I need. Its Tera template language looks like Jinja2. So the examples above become:

```Jinja
{% end = start + 2 %}

{% if start < 2 %}
```

Styling for the site is now just plain CSS (in part because Zola and Tailwind do not mix well). However, there's little twist. Zola has a very primitive asset pipeline when compared to most other static site generators. It can transpile and minify SASS/SCSS and it can resize images. That's it.

I wanted to create multiple CSS files for organization and have them combined into a single file to serve. So I wrote standard CSS with `.scss` extensions and let Zola's minimal pipeline handle it from there. My `styles.scss` file looks like this:

```css
@import "_bootstrap-icons.scss";
@import "_fontawesome.scss";
@import "_brands.scss";
@import "_lightbox.scss";

@import "_reset.scss";
@import "_global.scss";

@import "CUBE/_composition.scss";
@import "CUBE/_utilities.scss";
@import "CUBE/_blocks.scss";
@import "CUBE/_exceptions.scss";

@import "_semantics.scss";
```

I also greatly simplified the styling for dark mode. The code to handle light and dark modes is this:

```css
  /*
  Light Theme (default)
  */
  --bg-color-light: lightgray;
  --bg-color-black: black;
  --color-primary: black;
  --color-primary-dim: gray;
  --color-primary-invert: white;
  --color-primary-highlight: red;

  /*
  Dark Theme
  */
  .dark {
    --bg-color-light: gray;
    --color-primary-dim: DarkGray;
  }
```

The only real pain point in the conversion was modifying post front matter from:

```yaml
---
title: Converting from Hugo to Zola
date: 2025-11-16
taxonomies:
  categories: [Web Development]
  tags: [Zola]
draft: false
---
```

to:

```yaml
---
title: Converting from Hugo to Zola
date: 2025-11-16
categories: [Web Development]
tags: [Zola]
draft: false
---
```

because Zola requires taxonomies to be explicitly identified as taxonomies.

## Future?
Even with this conversion, I plan to keep a Hugo version of this site on standby in the event Zola has a badly breaking change or I find a need for a feature Zola doesn't have, but Hugo does.

If I do go back to Hugo, I'll still use Tailwind, I think, but make use of its `@apply` directive to greatly reduce repetition while retaining the advantages of the Tailwind approach.

We'll see...
