---
title: Metadata strips
summary: The metadata strip defines key metadata for an item of content, in a compact form
version: 1.0.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/cards
---

## Introduction

The **Metadata strip** is a simple component to be provided as part of content such as a [Promo](../promos). It defines key information attributed to the content like its publish date, and derivation.

## Recommended markup

::: info Promo implementation
The following example assumes the content is a [Promo](../promos) and includes just publishing and derivation information. Other definitions may be applicable elsewhere.
:::

```html
<ul class="gel-metadata-strip">
  <li>
    <div class="gel-sr">Published:</div>
    <div>
      <span aria-hidden="true">
        <svg class="gel-icon gel-icon--text" focusable="false">
          <use xlink:href="path/to/gel-icons-all.svg#gel-icon-duration"></use>
        </svg>
        1m
      </span>
      <span class="gel-sr">1 minute ago</span>
    </div>
  </li>
  <li>
    <div class="gel-sr">From:</div>
    <div>
      <a href="link/to/category">UK</a>
    </div>
  </li>
</ul>
```

* **`class="gel-sr"` for `<div>`:** These are only needed for non-visual clarification in screen reader output. They are hidden visually using the `gel-sr` class.
* **gel-icon:** The SVG icon (if present) is hidden along with the display text. It takes `focusable="false"` to remove it from focus order in some versions of IE and Edge[^1]
* **`aria-hidden="true"`** In some cases, the visually displayed text may not be sufficient for synthetic voice announcement. In these cases, the displayed text (and associated iconography) is hidden from assistive technologies with `aria-hidden="true"`[^2] and an alternative wording is provided non-visually (using the `gel-sr` class to hide this text visually).

## Recommended layout

The `<ul>` must have its user agent styles removed. The child `<li>`s are set to `inline-block`, with `white-space: nowrap`.

```css
.gel-metadata-strip > li {
  display: inline-block;
  white-space: nowrap;
}
```

The purpose of `nowrap` is to ensure items are never split across lines. This aids scanning and comprehension.

A border separator is included between—and only between—definition `<li>`s using pseudo-content:

```css
.gel-metadata-strip > li + li::before {
  content: '';
  border-left: 1px solid;
  margin: 0 0.25rem;
}
```

This is preferable to using a character such as a pip ("|") which will be announced unhelpfully in some screen readers.

### Links

Some metadata values may be linked, such as the 'From' value in the [**Expected markup**](#expected-markup) example. It is important these links are not differentiated by colour alone[^3]. People who are colour-blind or who use non-colour displays cannot perceive colour differences and will not be able to distinguish the link.

Accompany any colour differentiation with `text-decoration: underline`, if this style is not already being inherited.

```css
.gel-metadata-strip a {
  text-decoration: underline;
}
```

## Recommended behaviour

Aside from linked metadata, metadata strips are largely static. If a link uses `target="_blank"`, warn the user by incorporating the external link icon and some visually hidden text for screen reader users.

```html
<a href="/link/to/category">
  UK
  <span class="gel-sr">(opens new tab)</span>
  <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
    <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-external-link"></use>
  </svg>
</a>
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/metadata-strips.html">

<cta label="Open in new window" href="../demos/metadata-strips/">


## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Don't make every `<svg>` focusable by default (issue) — Microsoft, <https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8090208/>
[^2]: "Accessibility chops: `hidden` and `aria-hidden`" — The Paciello Group, <https://developer.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/>
[^3]: Understanding Success Criterion 1.4.1: Use of Color, <https://www.w3.org/WAI/WCAG21/Understanding/use-of-color>
