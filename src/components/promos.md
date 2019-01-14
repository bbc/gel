---
title: Promos
summary: A promo is a snippet of content which links to a full piece of content elsewhere on the BBC site or app.
version: 0.1.0
published: false
accessibility: false
linkback: http://www.bbc.co.uk/gel/guidelines/promos
---

## Overview

The Promo component is composed of several sub-components:

* a required link
* an optional image
* optional badge
* required heading text
* optional body text
* an optional metadata strip

These are shown in more detail in the [BBC GEL Promo documentation](https://www.bbc.co.uk/gel/guidelines/promos).

## Recommended markup

Promos are typically presented as a set, and together must be marked up as an unordered list, with each Promo marked as a list item (`<li>`). This enables structural and navigational cues in screen reader software[^1]. Each Promo's primary link must be contained within a heading, with each promo's heading of the same level, and the set of promos introduced as its own section within the document by a heading one level higher. The wording of the Promo's primary link should resemble that of the target page's `<title>` and `<h1>`. This consistency aids cognitive accessibility and improves <abbr title="search engine optimization">SEO</abbr>[^3].

```html
<h2>Latest news</h2>
<ul class="gel-promos">
  <li class="gel-promo">
    <div class="gel-promo-content">
      <div class="gel-promo-headline">
        <h3>
          <a href="#example/permalink/1">Heading text goes here</a>
        </h3>
      </div>
      <div class="gel-promo-desc">
        <p>Some description text goes here.</p>
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
            <a href="#example/link/to/category">US & Canada</a>
          </dd>
        </div>
      </dl>
    </div>
    <div class="gel-promo-image">
      <img src="{{site.basedir}}static/images/placeholder.png" alt="">
    </div>
  </li>
  <li class="gel-promo">
    <div class="gel-promo-content">
      <div class="gel-promo-headline">
        <h3>
          <a href="#example/permalink/2">Another heading text goes here</a>
        </h3>
      </div>
      <div class="gel-promo-desc">
        <p>More description text here.</p>
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
            <a href="#example/link/to/category">UK</a>
          </dd>
        </div>
      </dl>
    </div>
    <div class="gel-promo-image">
      <img src="{{site.basedir}}static/images/placeholder.png" alt="">
    </div>
  </li>
</ul>
```

Images can be considered decorative (`alt=""`; the first Promo in our example) or non-decorative (`alt="[description of image]"`; the second Promo in our example). They must appear _after_ the textual content (`gel-promo-content`) in the markup since the heading introduces the promo content, including the image content. **Non-decorative images must have alternative text that does not simply repeat information in the headline or description**.

## Recommended layout

A group of Promos in a set should share the same height. This is possible by making the `<ul>` a CSS Flexbox or CSS Grid context. The appearance of each promo is improved by distributing the metadata (if present) to the bottom of the container. This is possible by making the promo a Flexbox context and giving the metadata element `margin-top: auto`. Padding can be combined with margin to ensure a minimum space between the metadata and the element above it.

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
While [Metadata Strips](../metadata-strips/) are documented as their own component, the `margin-top` and `padding-top` styles specified here are needed in the Promo context.
:::

### The image

As stated in [Recommended markup](#recommended-markup), the image must come _after_ the text content in the source order. However, it is designed to appear before it visually. Using Flexbox, it is possible to augment the visual order without affecting the source order:

```css
.gel-promo-image {
  order: -1;
}
```

::: info Note
Augmenting the source order can produce a [WCAG 2.4.3 Focus Order failure](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html), but the image is not focusable so there is no such issue.
:::

The image will need to fit the available space, regardless of the Promo's dimensions (which are likely to change across breakpoints) without distorting. This is possible by setting the desired height of the image box and using the `object-fit` property:

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

### Horizontal Promos

It is permissible to create a horizontal configuration, with the image to the left of the content. In the [Example implementation](../demos/promos/) this is achieved without changing the markup, except to place the class `gel-promos-horizontal` on the `<ul>` element and `gel-promo-horizontal` on each subject Promo.

A small amount of additional CSS is then applied. Note the switch in `flex-direction` from `column` to `row`.

```css
@supports (display: grid) {
  .gel-promos.gel-promos-horizontal {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

.gel-promo.gel-promo-horizontal {
  flex-direction: row;
}

.gel-promo.gel-promo-horizontal .gel-promo-image {
  width: 15rem;
  height: auto;
}
```

### Focus styles

A `text-decoration` focus style is recommended for the headline link and any linked meta information (which should be the only focusable elements inside the promo). In addition, the promo itself can take an outline via `focus-within`, to better draw attention to the promo 'in hand':

```css
.gel-promo-headline a:focus {
  outline: none;
  text-decoration: underline;
}

.gel-promo:focus-within {
  outline: 0.25rem solid;
}
```

### Metadata icons

Some items of metadata come with icons, such as a clock prefixing the 'Published' time. These should be provided from [GEL's iconography system](https://www.bbc.co.uk/gel/guidelines/iconography). Ensure their fill is applied using `currentColor` so that the icon is compatible with high contrast themes.

## Recommended behaviour

Mouse and touch users should be able to activate the primary (headline) link by pressing either the headline text _or_ the image. However, the image should not represent an additional, redundant tab stop to keyboard users or be perceivable as a link to screen reader users. Too many and redundant 'tab stops' can be cumbersome for keyboard-only users[^4].

In which case, you need to add a JavaScript `click` listener to the image and use it to trigger the link's `click` event by proxy. In plain JavaScript this would look something like the following:

```js
// Assuming that `link` represents the headline link node
// and `img` represents the image node...
img.addEventListener('click', function(){link.click()});
```

This is the only JavaScript enhancement. In an environment where the card is not client rendered, the card will be functional where JavaScript is not available. Accordingly, only add the `cursor` style if JavaScript has run:

```js
img.style.cursor = 'pointer';
```

If the metadata contains links, these will fall into focus order after the headline, as expected.

## Example implementation

::: alert Important
Example implementations are intended to demonstrate **what needs to be achieved** but not how to achieve it. To meet our recommendations your HTML semantics, layout and behaviour must conform to the example implementation. Your server-side and front-end frameworks will likely differ.
:::

<include src="components/demos/promos.html">

<p><a class="geldocs-button geldocs-button--dark geldocs-long-primer-bold" href="../demos/promos/" target="_new">Open in new window <svg class="geldocs-button__icon geldocs-icon geldocs-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link" style="fill:currentColor"></use></svg></a></p>

## Related accessibility guidelines

<dl class="gel-2col-list">
  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/design/actionable-elements">Actionable elements</a></dt>
  <dd>"All users must be able to determine if an element is actionable or if it is static content." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/design/07_actionable_elements.feature">test spec for actionable elements</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/design/visible-focus">Visible focus</a></dt>
  <dd>"When focused, all actionable and focusable elements must have a visible state change." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/design/08_visible_focus.feature">test spec for visible focus</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/focus/content-order">Content order</a></dt>
  <dd>"All users benefit when content is logically ordered, in particular users of assistive technology that follows the flow of the page or screen." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/focus/03_content_order.feature">test spec for content order</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/focus/user-interactions">User interaction</a></dt>
  <dd>"Actions must be triggered when appropriate for the type of user interaction." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/focus/05_user_interactions.feature">test spec for user interaction</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/links/combining-repeated-links">Combining repeated links</a></dt>
  <dd>"Repeated links to the same resource must be combined within a single link." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/links/03_combining_repeated_links.feature">test spec for combining repeated links</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/structure/headings">Headings</a></dt>
  <dd>"Content must provide a logical and hierarchical heading structure, as supported by the platform." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/structure/02_headings.feature">test spec for headings</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/design/touch-target-size">Touch target size</a></dt>
  <dd>"Touch targets must be large enough to touch accurately." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/design/04_touch_target_size.feature">test spec for touch target size</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/structure/containers-and-landmarks">Containers and landmarks</a></dt>
  <dd>"Containers should be used to describe page/screen structure, as supported by the platform." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/structure/03_containers_and_landmarks.feature">test spec for containers and landmarks</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/structure/grouped-elements">Grouped elements</a></dt>
  <dd>"Controls, objects and grouped interface elements must be represented as a single accessible component." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/structure/04_grouped_elements.feature">test spec for grouped elements</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/text-equivalents/alternatives-for-non-text-content">Alternatives for non-text content</a></dt>
  <dd>"Alternatives must briefly describe the editorial intent or purpose of the image, object, or element." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/text_equivalents/01_alternatives_for_non_text_content.feature">test spec for alternatives for non-text content</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/text-equivalents/decorative-content">Decorative content</a></dt>
  <dd>"Decorative images must be hidden from assistive technology." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/text_equivalents/02_decorative_content.feature">test spec for decorative content</a>.</dd>

  <dt><a href="https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/text-equivalents/visual-formatting">Visual formatting</a></dt>
  <dd>"Visual formatting alone must not be used to convey meaning." View the <a href="https://github.com/bbc/bbc-a11y/blob/master/features/standards/mag/text_equivalents/05_visual_formatting.feature">test spec for visual formatting</a>.</dd>
</dl>

## Related research

This component was originally developed and tested at the BBC in a prototype of the BBC Homepage. During user research we tested with X users, including subjects with a variety of impairments and a range of digital skills. You can read more about our research and findings on [the project Wiki page, hosted on GitHub](#linktocome).

### Further reading, elsewhere on the Web

[^1]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
[^2]: Gist of the `vh` (visually hidden) class <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: "How To Write Page Titles For Google & Other Search Engines in 2018", <https://www.hobo-web.co.uk/title-tags/#page-titles-example-use>
[^4]: "Keyboard Accessibility" — WebAIM, <https://webaim.org/techniques/keyboard/>
[^5]: `object-fit` (caniuse data), <https://caniuse.com/#feat=object-fit>
