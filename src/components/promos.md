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
  <li class="gel-promo">
    <div class="gel-promo-headline">
      <h3>
        <a href="/to/permalink/1">Suspect package found at De Niro restaurant</a>
      </h3>
    </div>
    <div class="gel-promo-image">
      <img src="path/to/image.png" alt="" />
    </div>
    <div class="gel-promo-desc">
      <p>Police investigate a package at the New York restaurant owned by the actor, reports say.</p>
    </div>
    <dl class="gel-metadata-strip">
      <div>
        <dt class="vh">Published:</dt>
        <dd>
          <span aria-hidden="true">1h</span>
          <span class="vh">1 hour ago</span>
        </dd>
      </div>
      <div>
        <dt class="vh">From:</dt>
        <dd>
          <a href="link/to/category">US & Canada</a>
        </dd>
      </div>
    </dl>
  </li>
  <li class="gel-promo">
    <div class="gel-promo-headline">
      <h3>
        <a href="/to/permalink/2">UK Sorry For Forcing DNA Tests On Immigrants</a>
      </h3>
    </div>
    <div class="gel-promo-image">
      <img src="path/to/image.png" alt="Home secretary Sajid Javid in parliament" />
    </div>
    <div class="gel-promo-desc">
      <p>The home secretary says people were wrongly forced to take tests to prove their right to be in the UK.</p>
    </div>
    <dl class="gel-metadata-strip">
      <div>
        <dt class="vh">Published:</dt>
        <dd>
          <span aria-hidden="true">1m</span>
          <span class="vh">1 minute ago</span>
        </dd>
      </div>
      <div>
        <dt class="vh">From:</dt>
        <dd>
          <a href="link/to/category">UK</a>
        </dd>
      </div>
    </dl>
  </li>
</ul>
```

### Notes

* **`<ul>` and `<li>`:** Promos are typically presented as a set, and together must be marked up as an unordered list, with each promo marked as a list item (`<li>`). This enables structural and navigational cues in screen reader software[^1].
* **Headings:** Each promo's primary (headline) link must be contained within a heading, each of the promo's headings must be of the same level, and the set of promos must be introduced as a section within the document by a heading one level higher. The wording of the promo's primary link should resemble that of the target page's `<title>` and `<h1>`. This consistency aids cognitive accessibility and improves SEO[^3].
* **Image (optional):** Images can be considered decorative (`alt=""`; the first Promo in the code example) or non-decorative (`alt="[description of image]"`; the second Promo in the example). They must appear _after_ the headline in the markup since the headline's heading introduces the promo content. **Non-decorative images must have alternative text that does not simply repeat information in the headline or description**.
* **Metadata (optional):** [**Metadata Strips**](#link-todo) are specified as their own component

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

.gel-metadata-strip {
  margin-top: auto;
  padding-top: 1rem;
}
```

::: info Note
While [**Metadata Strips**](#link-todo) are documented as their own component, the `margin-top` and `padding-top` styles specified here are needed in the **Promo** context.
:::

### The image

As stated in **[Expected markup](#expected-markup)**, the image must come _after_ the headline in the source order. However, it is designed to appear before it visually. Using Flexbox, it is possible to augment the visual order without affecting the source order:

```css
.gel-promo-image {
  order: -1;
}
```

The image will need to fit the available space, regardless of the promo's dimensions (which are likely to change across breakpoints) without distorting. This is possible by setting the desired height of the image box and using the `object-fit` property:

```css
.gel-promo-image {
  order: -1;
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
At the time of writing, the `object-fit` property is supported everywhere but Internet Explorer[^5]. The code uses `@supports` and falls back to showing the image at its natural width, cropping the right edge or leaving a right margin.
:::

### Focus styles

A `text-decoration` focus style is recommended for the headline link and any linked meta information (which should be the only focusable elements inside the promo). In addition, the promo itself can take an outline via `focus-within`, to better draw attention to the promo 'in hand':

```css
.gel-promo :focus {
  outline: none;
  text-decoration: underline;
}

.gel-promo:focus-within {
  outline: 0.25rem solid;
}
```

### Metadata icons

Some items of metadata come with icons, such as a clock prefixing the 'Published' time. These should be provided from [GEL's iconography system](https://www.bbc.co.uk/gel/guidelines/iconography). Ensure their fill is applied using `currentColor` so that the icon is compatible with high contrast themes.

## Expected behavior

Mouse and touch users should be able to activate the primary (headline) link by pressing either the headline text _or_ the image. However, the image should not represent an additional, redundant tab stop to keyboard users or be perceivable as a link to screen reader users. Too many and redundant 'tab stops' can be cumbersome for keyboard-only users[^4].

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

::: alert Important
Reference implementations are intended to demonstate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behavior of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/promos.html">

<p><a class="gel-button gel-button--dark gel-long-primer-bold" href="../demos/promos/" target="_new">Open in new window <svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link" style="fill:undefined;"></use></svg></a></p>

## Test specifications

A list of gherkin-style feature specifications (including requirements for the [BBC Mobile Accessibility Guidelines](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile)) for this component has been developed and published in a format suitable for use with an automated testing framework. You can review and download these feature files from [the project Wiki page, hosted on GitHub](#linktocome).

## Related research

This component was originally developed and tested at the BBC in a prototype of the BBC Homepage. During user research we tested with X users, including subjects with a variety of impairments and a range of digital skills. You can read more about our research and findings on [the project Wiki page, hosted on GitHub](#linktocome).

### Further reading, elsewhere on the Web

[^1]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
[^2]: Gist of the `vh` (visually hidden) class <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: "How To Write Page Titles For Google & Other Search Engines in 2018", <https://www.hobo-web.co.uk/title-tags/#page-titles-example-use>
[^4]: "Keyboard Accessibility" — WebAIM, <https://webaim.org/techniques/keyboard/>
[^5]: `object-fit` (caniuse data), <https://caniuse.com/#feat=object-fit>
