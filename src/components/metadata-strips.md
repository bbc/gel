---
title: Metadata Strips
summary: The metadata strip defines key metadata for an item of content, in a compact form
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/cards
---

## Introduction

The **Metadata Strip** is a simple component to be provided as part of content such as a [**Promo**](#link-todo). It defines key information attributed to the content, for example its publish date, and derivation.

## Expected markup

::: info Note
The following example assumes the content is a [**Promo**](#link-todo) and includes just publishing and derivation information. Other definitions may be applicable elsewhere.
:::

```html
<dl class="gel-metadata-strip">
  <div>
    <dt class="vh">Published:</dt>
    <dd>
      <span aria-hidden="true">
        <span class="gel-icon">
          <svg>
            <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-duration"></use>
          </svg>
        </span>
        1m
      </span>
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
```

### Notes

* **`<dl>` and `<div>`:** The most appropriate markup for key/value based information is the definition (or 'description') list. It is permitted[^1] to use `<div>` elements to wrap pairs of `<dt>` and `<dd>` elements for layout purposes. 
* **`class="vh"` for `<dt>`:** The defition titles (`<dt>`s) are only needed for non-visual clarification in screen reader output. They are hidden visually using the `vh` class[^2].
* **`aria-hidden="true"`** In some cases, the visually displayed text may not be sufficient for synthetic voice announcement. In these cases, the displayed text (and associated iconography) is hidden from assistive technologies with `aria-hidden="true"`[^3] and an alternative wording is provided non-visually (using the `vh` class to hide this text).

## Expected layout

The `<dl>`, `<dt>`, and `<dd>` must have their user agent styles removed. The child `<div>`s are set to `inline-block`, with `white-space: nowrap`.

```css
.gel-metadata-strip > div {
  display: inline-block;
  white-space: nowrap;
}
```

The purpose of `nowrap` is to ensure pairs of definition titles and their definitions wrap together and are never split across lines. This aids scanning and comprehension.

A border separator is included between—and only between—definition `<div>`s using pseudo-content:

```css
.gel-metadata-strip > div + div::before {
  content: '';
  border-left: 1px solid;
  margin: 0 0.25rem;
}
```

This is preferable to using a character such as a pip ("|") which will be announced unhelpfully in some screen readers.

### Links

Some metadata values may be linked, such as the 'From' value in the [**Expected markup**](#expected-markup) example. It is important these links are not differentiated by color alone[^4]. People who are colorblind or who use non-color displays cannot perceive color differences and will not be able to distinguish the link.

Accompany any color differentiation with `text-decoration: underline`, if this style is not already being inherited.

```css
.gel-metadata-strip a {
  text-decoration: underline;
}
```

## Expected behavior

Aside from linked metadata, metadata strips are largely static. If a link uses `target="_blank"`, warn the user by incorporating the external link icon[^5] and some visually hidden text for screen reader users.

```html
<a href="/link/to/category">
  UK
  <span class="vh">(opens new tab)</span>
  <span class="gel-icon">
    <svg>
      <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-external-link"></use>
    </svg>
  </span>  
</a>
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behavior of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/metadata-strips.html">

<p><a class="gel-button gel-button--dark gel-long-primer-bold" href="../demos/metadata-strips/" target="_new">Open in new window <svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link" style="fill:currentColor"></use></svg></a></p>

## Test specifications

[TODO]

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "Allow &lt;div> around each &lt;dt>&lt;dd> group in &lt;dl>" (WHATWG merged pull request), <https://github.com/whatwg/html/pull/1945>
[^2]: Gist of the `vh` (visually hidden) class, <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: "Accessibility chops: `hidden` and `aria-hidden`" — The Paciello Group, <https://developer.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/>
[^4]: Use Of Color: Understanding WCAG 1.4.1, <https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html>