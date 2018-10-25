---
title: Promos
summary: A promo is a snippet of content which links to a full piece of content elsewhere on the BBC site or app.
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/promos
---

## Introduction

The **Promo** component is similar to the [**Card**](#link-todo) but exists solely for linking to permalink content. It optionally contains meta information, a description,  and/or an image. Read the [original GEL Promo documentation](https://www.bbc.co.uk/gel/guidelines/promos) for more.

## Expected markup

```html
<h2>Latest news</h2>
<ul>
  <li>
    <div class="gel-promo">
      <h3>
        <a href="/to/permalink/1">Suspect package found at De Niro restaurant</a>
      </h3>
      <div class="gel-promo-image">
        <img src="path/to/image.png" alt="" />
      </div>
      <p>Police investigate a package at the New York restaurant owned by the actor, reports say.</p>
      <dl class="gel-promo-meta">
        <dt class="vh">Published:</dt>
        <dd>
          <span aria-hidden="true">1h</span>
          <span class="vh">1 hour ago</span>
        </dd>
        <dt class="vh">From:</dt>
        <dd>
          <a href="link/to/category">US & Canada</a>
        </dd>
      </dl>
    </div>
  </li>
  <li>
    <div class="gel-promo">
      <h3>
        <a href="/to/permalink/2">UK Sorry For Forcing DNA Tests On Immigrants</a>
      </h3>
      <div class="gel-promo-image">
        <img src="path/to/image.png" alt="Home secretary Sajid Javid in parliament" />
      </div>
      <p>The home secretary says people were wrongly forced to take tests to prove their right to be in the UK.</p>
      <dl class="gel-promo-meta">
        <dt class="vh">Published:</dt>
        <dd>
          <span aria-hidden="true">1m</span>
          <span class="vh">1 minute ago</span>
        </dd>
        <dt class="vh">From:</dt>
        <dd>
          <a href="link/to/category">UK</a>
        </dd>
      </dl>
    </div>
  </li>
</ul>
```

### Notes

* **`<ul>` and `<li>`:** Promos are typically presented as a set, and together must be marked up as an unordered list, with each promo marked as a list item (`<li>`). This enables structural and navigational cues in screen reader software[^3].
* **Headings:** Each promo's primary (headline) link is contained within a heading, each of the promo's headings are of the same level, and the set of promos is introduced as a section within the document by a heading one level higher. The wording of the promo's primary link should resemble that of the target page's `<title>` and `<h1>`. This consistency aids cognitive accessibility and improves SEO.
* **Image (optional):** Images can be considered decorative (`alt=""`; the first promo in the code example) or non-decorative (`alt="[description of image]"`; the second promo in the example). They must appear _after_ the headline in the markup since the headline's heading introduces the promo content. **Non-decorative images must have alternative text that does not simply repeat information in the headline or description**.
* **Metadata (optional):** Metadata is presented as a description list. The `<dt>` labels are optionally visually hidden (using the `vh` class in the example), making them available to just screen reader users. If the visible wording is likely to confuse screen reader users, provide an alternative version and hide the visible version using `aria-hidden="true"` (see the 'Published' examples). Do _not_ use `aria-label` to provide auxiliary labels, because it will not be translated by in-browser translation services. Metadata values may or may not be linked.

## Expected layout

As with [**Cards**](#link-todo), promos in a set should share the same height. This is possible by making the `<ul>` a CSS Flexbox or CSS Grid context. The appearance of each promo is improved by distributing the metadata (if present) to the bottom of the container. This is possible by making the promo a Flexbox context and giving the metadata element `margin-top: auto`. Padding can be combined with margin to ensure a minimum space between the metadata and the element above it.

```css
.gel-promo {
  display: flex;
  flex-diection: column;
}

.gel-promo > * + * {
  margin-top: 1rem; /* generic spacing between components of the promo */
} 

.gel-promo-meta {
  margin-top: auto;
  padding-top: 1rem;
}
```

### The image

As stated in **[Expected markup](#expected-markup)**, the image must come _after_ the headline in the source order. However, it is designed to appear before it visually. Using Flexbox, it is possible to augment the visual order without affecting the source order:

```css
.gel-promo-image {
  order: 1;
}
```

The image will need to fit the available space, regardless of the promo's dimensions (which are likely to change across breakpoints) without distorting. This is possible by setting the desired height of the image box and using the `object-fit` property:

```css
.gel-promo-image {
  height: 10rem;
  overflow: hidden;
}

.gel-promo-image img {
  height: 100%;
  width: auto;
}

@supports (object-fit: cover) {
  .gel-promo-image img {
    width: 100%;
    object-fit: cover;
  }
}
```

::: info Note
At the time of writing, the `object-fit` property is supported everywhere but Internet Explorer. The code uses `@supports` and falls back to showing the image at its natural width, cropping the right edge or leaving a right margin.
:::

### Metadata icons

Some items of metadata come with icons, such as a clock prefixing the 'Published' time. These should be provided from [GEL's iconography system](https://www.bbc.co.uk/gel/guidelines/iconography). Ensure their fill is applied using `currentColor` so that the icon is compatible with high contrast themes.

## Expected behavior

Mouse and touch users should be able to activate the primary (headline) link by pressing either the headline text _or_ the image. However, the image should not represent an additional, redundant tab stop to keyboard users or be perceivable as a link to screen reader users. 

In which case, you need to add a JavaScript `click` listener to the image and use it to trigger the link's `click` event by proxy. In plain JavaScript this would look something like the following:

```js
// Assuming that `link` represents the headline link node
// and `img` represents the image node...
img.addEventListener('click', () => link.click());
```

This is the only JavaScript enhancement. In an environment where the card is not client rendered, the card will be functional where JavaScript is not available. Accordingly, only add the `cursor` style if JavaScript has run:

```js
img.style.cursor = 'pointer';
```

If the metadata contains links, these will fall into focus order after the headline, as expected.

## Reference implementation

<include src="components/demos/promos.html">

<p><a class="gel-button gel-button--dark gel-long-primer-bold" href="../demos/promos/" target="_new">Open in new window</a></p>

## Test specifications

A list of gherkin-style feature specifications (including requirements for the [BBC Mobile Accessibility Guidelines](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile)) for this component has been developed and published in a format suitable for use with an automated testing framework. You can review and download these feature files from [the project Wiki page, hosted on GitHub](#linktocome).

## Related research

This component was originally developed and tested at the BBC in a prototype of the BBC Homepage. During user research we tested with X users, including subjects with a variety of impairments and a range of digital skills. You can read more about our research and findings on [the project Wiki page, hosted on GitHub](#linktocome).

### Further reading, elsewhere on the Web

[^1]: "Using Card-Based Design To Enhance UX" by Nick Babich, _Don't Use Cards_ <https://uxplanet.org/using-card-based-design-to-enhance-ux-51f965ab70cb#dfb8>
[^2]: "Signifiers, not affordances" by Don Norman, _People need some way of understanding the product or service, some sign of what it is for, what is happening, and what the alternative actions are._ <https://www.jnd.org/dn.mss/signifiers_not_affordances.html>
[^3]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
