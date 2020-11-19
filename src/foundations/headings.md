---
title: Headings
summary: Headings provide a semantic and visual hierarchical structure to a document
version: 0.1.0
published: true
accessibility: true
---

## Introduction

Buttons, links, and form elements all have labels. Labels tell users what these elements are for. Headings are also labels, and describe sections of the document. A correct use of heading elements is especially important when supporting screen reader users[^1] because headings together create a table of contents, navigable by a variety of shortcuts and other means.

## Recommended markup

### The `<h1>`

The `<h1>` is the principle heading in the document, and labels the document itself. The following must be true for `<h1>` elements:

1. There is only one in the document
2. Its content is unique to the current document
3. It is the first semantic element inside the `<main>` region of the document
4. Its text relates to / is a subset of the page's `<title>`[^2]

For a search results page, the `<title>` should indicate that the page indeed contains search results, which term was used to search, and a reminder of the site in which the search took place.

```html
<title>Search results for "Chuggingtion": CBeebies - BBC</title>
```

The `<h1>`, accordingly, would be a subset which excludes the site information:

```html
<h1>Search results for "Chuggington"</h1>
```

### Subheadings

The heading level (h1—h6) for any other section of the page should be chosen in terms of belonging. That is, if the heading labels a child subsection of the page, then `<h2>` is appropriate. If the heading labels a subsection _of_ a subsection, then the level should be one higher than the parent.

- UK Politics (h1)
  - Top stories (h2)
    - Bid to get Labour to change Brexit stance (h3)
    - Ban on electric shock collars for pets (h3)

As in the above example, sibling/equivalent sections should have the same heading level. In cases where one subsection is considered more important than another, it is _not_ appropriate to change the heading level to elicit a larger heading for size (for example). This makes a nonsense of the document structure for screen reader users. Instead, use one of the following techniques:

- Promote the item so it appears first in the order (a 'sticky post' in blogging terms)
- Include the text 'featured' (or similar; 'breaking' for a breaking news story) as part of the heading or in close proximity to it

Whether or not subheadings are used explicitly with sectioning elements[^5], they should be the first element that contains content within the section.

#### <mark is="bad"> Bad example

In this version, a screen reader user navigating by heading (for example, by using the <kbd>H</kbd> key with NVDA) would be skipped past the "Breaking" identifier and miss it.

```html
<section>
  <h2>Top stories</h2>
  <section>
    <div class="alert">Breaking:</div>
    <h3>Bid to get Labour to change Brexit stance</h3>
  </section>
</section>
```

#### <mark is="good"> Good example

In the adjusted version, "Breaking" is made part of the heading and will be read out along with it.

```html
<section>
  <h2>Top stories</h2>
  <section>
    <h3>
      <span class="breaking">Breaking:</span>
      Bid to get Labour to change Brexit stance
    </h3>
  </section>
</section>
```

::: alert The document outline algorithm is not implemented
Part of the intention of sectioning elements (like `<section>` and `<article>`) was to automate heading levels as perceived by assistive technologies. That is, an `<h1>` for a  `<section>` inside `<body>` would be perceived as an `<h2>`. However, the algorithm was never implemented by any browser vendors[^6]. You still need to use explicit (h1—h6) according to your sections' nesting depth.
:::

### Wording

As labels, headings must describe the sections they introduce[^3]. 

Many screen readers aggregate headings into a table of contents. For example, JAWS produces a headings dialogue when the user presses <kbd>Insert</kbd> + <kbd>F6</kbd>. For this reason, it's important headings are sufficiently descriptive independent of their surrounding content.

#### Bad example

```html
<h2>Let's get baking!</h2>
```

#### Good example

```html
<h2>A delicious cookie recipe</h2>
```

## Recommended layout

To establish a logical visual hierarchy, heading font sizes should decrease along with depth. An `<h1>` should have the greatest `font-size`, and an `<h6>` the smallest. There are other means to differentiate heading levels but font size is the most conventional, and therefore the most widely understood.

```css
h1,
.h1 {
  font-size: 3rem;
}
h2,
.h2 {
  font-size: 2.25rem;
}
h3,
.h3 {
  font-size: 1.75rem;
}
/* etc */
```

In the above example, classes are named after heading levels to match their size. This may be useful when wishing to enlarge some arbitrary text. It is important headings are reserved as section labels, so use the class in place of a heading element if you are just intending to add some visual emphasis.

```html
<blockquote>
  <p class="h3">"I'd like to do a kind of 'Sunday Night At The Palladium'-style variety show on the BBC."</p>
  <p>— Anton du Beke</p>
</blockquote>
```

## Recommended behaviour

Where headings adopt `id`s and are used as document fragments to be navigated between using same-page links, they should take `tabindex="-1"`. This forces browsers that would not otherwise update their sequential focus starting point[^4] to move keyboard focus to the destination heading and section.

```html
<h2 tabindex="-1">Navigable subsection</h2>
```

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: "Responses To The Screen Reader Strategy" — heydonworks.com, <http://www.heydonworks.com/article/responses-to-the-screen-reader-strategy-survey>
[^2]: WCAG 2.4.2: Page Titled, <https://www.w3.org/TR/WCAG21/#page-titled>
[^3]: WCAG 2.4.6: Headings and labels, <https://www.w3.org/TR/WCAG21/#page-titled>
[^4]: "Focus should cycle from named anchor" — bugs.chromium.org, <https://bugs.chromium.org/p/chromium/issues/detail?id=262171>
[^5]: HTML 5.3: Sections (W3C), <https://www.w3.org/TR/html53/sections.html#sections>
[^6]: "There Is No Document Outline Algorithm" — Adrian Roselli , <http://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html>

