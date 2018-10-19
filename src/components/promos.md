---
title: Promos
summary: A promo is a snippet of content which links to a full piece of content elsewhere on the BBC site or app.
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/promos
---

## When to use a promo

The Promo component represents a link to a full piece of content eleswhere on the BBC site or app. It should only be incorporated within you interface where:

1. It is used to create a standout call-to-action, possibly including an image or additional information
2. There is a permanent URL to which the Promo can be linked

::: info Note
A Promo differs from a Card because cards are used to _actually show_ content within a card-like format; cards do not link anywhere. The purpose of a promo is to tease content which is displayed elsewhere on the site so promos always link.
:::

## Expected markup

Promos are normally shown as a collection, so a set of promos must be marked up as an unordered list, with each promo maqrked as a list item (`<li>`). This communicates to assistive technologies that the items are part of a related set. It also enables the list navigation mechanism in screen reader software.

```html
<ul>
  <li class="gel-promo">
    <a href="[url]">
      <!-- first promo content -->
    </a>
  </li>
  <li class="gel-promo">
    <a href="[url]">
      <!-- second promo content -->
    </a>
  </li>
</ul>
```

### Headings

It is recommended that each promo's primary (headline) link is contained within a heading, that each of the promo's headings are of the same level, and that the set of promos is introduced by a heading one level higher. For example:

```html
<h2>Top Stories</h2>

<ul>
  <li class="gel-promo">
    <a href="[url]">
      <div class="gel-promo-body">
        <h3>Story Title</h3>
      </div>
    </a>
  </li>
</ul>
```

This marks out and labels the set as a subsection within the page and provides a sound hierarchy for those traversing the page non-visually.

For search engine optimization and cognitive accessibility, the promo's primary link text should match, or at least closely resemble, the `<h1>` text of the target URL.

### Images

Promos may contain images. These should be considered decorative and thus an empty alternative text value must be provided (`alt=""`):

```html
<li class="gel-promo">
  <a href="[url]">
    <div class="gel-promo-media">
      <img src="image.png" alt="" />
    </div>
    <div class="gel-promo-body">
      <h3>Trade Talks "Breakthrough" Announced</h3>
    </div>
  </a>
</li>
```

### Metadata

Promos may contain a short list of metadata at the bottom of the component. Examples include information like the date or time the linked-to content was updated, or the category of pages to which the linked-to content belongs.

```html
<li class="gel-promo">
  <a href="[url]">
    <div class="gel-promo-media">
      <img src="image.png" alt="" />
    </div>
    <div class="gel-promo-body">
      <h3>Trade Talks "Breakthrough" Announced</h3>
    </div>
    <ul class="gel-promo-meta">
      <li><time datetime="2018-08-13T20:01Z">16m</time></li>
      <li>UK News</li>
    </ul>
  </a>
</li>
```

## Expected layout

There are generally two layouts possible with promos: one vertical with the image stacked above the promo headline, and the other horizontal with the image sitting to to the side of the promo headline.

## Reference implementation

<live-demo id="promo1">
  <template>
    <style>
      ul {
        margin: 0;
        padding: 0;
      }
      .cf:after {
        content: "";
        display: table;
        clear: both;
      }
      .gel-promo {
        display: inline-block;
        color: #404040;
        font-family: sans-serif;
        background: #F1F1F1;
        width: 100%;
        margin-bottom: 16px;
      }
      .gel-promo__horz .gel-promo-media {
        display: inline-block;
        float: left;
        line-height: 0;
        width: 40%;
        margin-right: 16px;
      }
      .gel-promo .gel-promo-media img {
        display: inline-block;
        height: 100%;
        width: 100%
      }
      .gel-promo__horz .gel-promo-body {
        padding: 0 16px 0 0;
      }
      .gel-promo a {
        display: inline-block;
        height: 100%;
        position: relative;
      }
      .gel-promo a,
      .gel-promo a:hover,
      .gel-promo a:visited {
        text-decoration: none;
        color: #333;
      }
      .gel-promo a img,
      .gel-promo a:hover img,
      .gel-promo a:visited img {
        border: 0;
      }
      ul.gel-promo-meta {
        left: 40%;
        padding: 0;
        bottom: 0;
        position: absolute;
        padding-left: 16px;
        padding-bottom: 16px;
      }
      .gel-promo-meta li {
        display: inline;
        list-style-type: none;
      }
      .gel-promo-meta li:not(:last-child)::after {
        content: "\007c";
        margin: 0 0.6em;
      }
      @media (max-width: 37.5em) {
        .gel-promo-body {
          padding: 0 8px 0 0;
        }
        .gel-promo-body h3 {
          padding: 0 8px 0 0;
          margin-block-start: 8px;
          margin-block-end: 8px;
        }
        .gel-promo-body p { display: none; }
        .gel-promo__horz .gel-promo-media {
          margin-right: 8px;
        }
      }
      @media (max-width: 30em) {
        .gel-promo-meta { display: none; }
      }
    </style>
    <div class="cf" style="max-width:600px">
      <ul>
        <li class="gel-promo gel-promo__horz cf">
          <a href="#example-link-1">
            <div class="gel-promo-media">
              <img src="{{site.basedir}}static/images/placeholder.png" alt="">
            </div>
            <div class="gel-promo-body">
              <h3>Trade Talks "Breakthrough"</h3>
              <p>Both sides reportedly happy, eager to move forward</p>
              <ul class="gel-promo-meta">
                <li><time datetime="2018-08-13T20:01Z">16m</time></li><li>UK News</li>
              </ul>
            </div>
          </a>
        </li>
        <li class="gel-promo gel-promo__horz cf">
          <a href="#example-link-2">
            <div class="gel-promo-media">
              <img src="{{site.basedir}}static/images/placeholder.png" alt="">
            </div>
            <div class="gel-promo-body">
              <h3>All Gold for New Olympic Trampoline Team</h3>
              <ul class="gel-promo-meta">
                <li><time datetime="2018-08-13T20:01Z">42m</time></li><li>Sports</li>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <script>
    </script>
  </template>
</live-demo>

## Test Specs

There are currently no test specs.

## Related Research

There is currently no related research.
