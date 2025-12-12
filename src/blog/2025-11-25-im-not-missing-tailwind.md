---
title: I'm Not Missing Tailwind
date: 2025-11-25
categories: [Web Development]
tags: [CSS]
draft: false
---

While converting this site from [Hugo to Zola](/blog/2025-11-16-converting-from-hugo-to-zola), I elected to dispense with Tailwind; partially because I wanted to try using plain CSS and partially because Zola and Tailwind don't make an easy pairing. Along the way, I discovered that I don't like Tailwind as much as I thought I did.

<!--more-->

## Bothersome Things

For one thing, styling with Tailwind classes can get pretty verbose:

```html
<li>
  <a aria-current="page" aria-label="Page {{ $k }}" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600" role="button">{{ $k }}</a>
</li>
```

That makes it more difficult read through all that to understand just how an element is being styled. But worse than that, if those same styles are applied in various places around the site to style multiple instances of the same element, it's very hard to be sure all the instances are the same. When the elements are first created, copying and pasting the styles works fine. But if changes have to be made later, consistency becomes a real problem.

Tailwind has the `@apply` directive to address this. You create a class of your choice and define it like this:

```css
.your-class {
@apply w-30 flex items-center justify-center px-4 h-10 leading-tight text-primary bg-lightest border border-gray-300 hover:bg-primary-highlight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-600;
}
```

It works. But guess what? The more you de-clutter and de-duplicate your Tailwind classes, the more your code starts to look like regular CSS! You are back to coming up with class names and switching context from HTML to CSS files, which are things Tailwind tries to eliminate.

## Improvements

I don't like Tailwind's default color system, either, especially for gray or neutral colors. The steps between colors at the lightest and darkest ends of the spectrum have too little contrast. It's hard to tell one from the next one.

<img src="/assets/images/post-images/tailwind-neutral-scale.png" alt="Neutral Scale" style="display: block; margin: 1em auto 1em auto">

You may not be able to tell, but there are 11 separate shades of neutral shown.

For this site I used 11 shades of neutral, too, but each step has a constant change in contrast so you can tell one from the other.

[This article](https://dev.to/finnhvman/grayscale-color-palette-with-equal-contrast-ratios-2pgl) got me started towards that end and [his codepen](https://codepen.io/finnhvman/pen/QWwYYwJ) allowed me to calculate each color value. I used a contrast ratio of 1.33 which gave me the 11 steps I wanted.

You can replace Tailwind's defaults, of course, but that gives up the simplicity of the system and you're back to regular CSS, again.

Another change I made from Tailwind in my CSS is for text size and spacing as the viewport changes size. The [Utopia](https://utopia.fyi/) fluid design system creates a smooth flow of steps, rather than discrete jumps as the viewport hits various `@media (min-width: )` breakpoints. Try adjusting your browser window narrower and narrower to see what happens before the layout switches to single column.

For spacing, as an example, I used Utopia's [space calculator](https://utopia.fyi/space/calculator) to develop this:

```CSS
--space-3xs: clamp(0.1875rem, 0.1065rem + 0.3322vw, 0.3125rem);
--space-2xs: clamp(0.375rem, 0.213rem + 0.6645vw, 0.625rem);
--space-xs: clamp(0.5625rem, 0.3196rem + 0.9967vw, 0.9375rem);
--space-s: clamp(0.75rem, 0.4261rem + 1.3289vw, 1.25rem);
--space-m: clamp(1.125rem, 0.6391rem + 1.9934vw, 1.875rem);
--space-l: clamp(1.5rem, 0.8522rem + 2.6578vw, 2.5rem);
--space-xl: clamp(2.25rem, 1.2782rem + 3.9867vw, 3.75rem);
--space-2xl: clamp(3rem, 1.7043rem + 5.3156vw, 5rem);
--space-3xl: clamp(4.5rem, 2.5565rem + 7.9734vw, 7.5rem);
```

This spacing system is somewhat similar to Tailwind's `-3xs` through `-7xl` steps, but smoother because they are calculated from the actual viewport width.

## What's Next?

I haven't given up on Tailwind. It's used on websites big and small, so there must be techniques to mitigate the verbosity and maintainability problems that I just haven't learned. That's what I need to do; it would be a shame to give up on Tailwind's other advantages without doing more work, first.

And I do have a Hugo version of this site using Tailwind on standby in the event I need it, and there I've used the `@apply` directive to simplify the styling for it. Maybe I'll leave it like that, but I do like the flexibility of regular CSS and that won't go out of style.
