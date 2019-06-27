---
title: Zack Nado
layout: home
---

### This is my site!  I write things here about AI, cats, and/or space.

* * *

{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
    {{ post.excerpt }}
  </li>
{% endfor %}
