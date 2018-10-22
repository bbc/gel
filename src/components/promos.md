---
title: Promos
summary: A promo is a snippet of content which links to a full piece of content elsewhere on the BBC site or app.
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/promos
---

## Semantics

The Promo component represents a link to a full piece of content elsewhere on the BBC site or app. It should only be incorporated within an interface where:

1. It is used to create a standout call-to-action, possibly including an image or additional information
2. There is a permanent URL to which the Promo can be linked

::: info Note
A Promo differs from a Card because cards are used to _actually show_ content within a card-like format; cards do not link anywhere. The purpose of a promo is to tease content which is displayed elsewhere on the site so promos always link.
:::

The case for a Promo versus a Card interface can be subtle, so it is important to understand the different uses, and when a Card or Promo might be most appropriate[^1].

Providing what would otherwise be a simple text link, with design signifiers[^2] like a bordered block, an accompanying image, and emboldened text communicates that the link has extra significance, and so this pattern should be used sparingly and only for links to content that deserve extra attention.

## Expected markup

Promos are normally shown as a collection, so a set of promos must be marked up as an unordered list, with each promo marked as a list item (`<li>`). This communicates to assistive technologies that the items are part of a related set. It also enables the list navigation mechanism in screen reader software[^3].

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

The accompanying image should be considered decorative and thus an empty alternative text value must be provided (`alt=""`):

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

The working example below shows an implementation of a series of horizontally formatted promos.

<include src="components/demos/promos.html">

## Test specifications

A list of gherkin-style feature specifications (including requirements for the [BBC Mobile Accessibility Guidelines](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile)) for this component has been developed and published in a format suitable for use with an automated testing framework. You can review and download these feature files from [the project Wiki page, hosted on GitHub](#linktocome).

## Related research

This component was originally developed and tested at the BBC in a prototype of the BBC Homepage. During user research we tested with X users, including subjects with a variety of impairments and a range of digital skills. You can read more about our research and findings on [the project Wiki page, hosted on GitHub](#linktocome).

### Further reading, elsewhere on the Web

[^1]: "Using Card-Based Design To Enhance UX" by Nick Babich, _Don't Use Cards_ <https://uxplanet.org/using-card-based-design-to-enhance-ux-51f965ab70cb#dfb8>
[^2]: "Signifiers, not affordances" by Don Norman, _People need some way of understanding the product or service, some sign of what it is for, what is happening, and what the alternative actions are._ <https://www.jnd.org/dn.mss/signifiers_not_affordances.html>
[^3]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
