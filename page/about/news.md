---
layout: default
title: News
parent: About
nav_order: 4
toc: false
summary: "What's new?"
permalink: /page/about/news.html
---

## What's new?
{: .no_toc }

---

{% for post in site.posts %}
  <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}

