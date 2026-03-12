---
title: vento
date: 2026-03-09
lastmod:
categories: ["Web Development"]
tags: ["Vento"]
draft: true
---

<!--more-->

In tag.vto

```yaml
eleventyComputed:
  title: "{{ postsTags.tagName }}"
```

Sidecar file `tag.11tydata.js`

```javascript
export default {
  eleventyComputed: {
    title: (data) => data.postsTags?.tagName,
  },
};
```

Vento example:

```vento
<div class="content">
  {{ for post of results }}
  <div>
    {{ include "partials/post-meta-dates.vto" { date: post.date, lastmod:
    post.lastmod } }}

    <h2 class="blog-title">
      <a href="{{ post.url }}">{{ post.title |> md }}</a>
    </h2>

    {{ include "partials/post-meta-tax.vto" { categories: post.categories, tags:
    post.tags, pageUrl: url } }}

    <div class="prose post-summary">{{ post.excerpt |> md }}</div>
  </div>
  {{ /for }} {{ if pagination.totalPages > 1 }}
  <div class="pagination">
    {{ include "partials/pagination.vto" { pagination: pagination } }} {{ /if }}
  </div>
</div>
```
