---
title: Breakout Boxes
summary: Breakout Boxes interject supplementary content within the flow of a document
version: 0.1.0
published: false
accessibility: false
linkback: http://www.bbc.co.uk/gel/guidelines/promos
---

## Introduction

Sometimes its worth noting or alerting users to certain information, but that information cannot be considered part of the main narrative for the document. This is what the **Breakout Box** component is for. 

**Breakout Boxes** can contain tips, warnings, research notes, interesting facts, and all sorts of tangential information.

## Expected markup

The following example is a "Note" type breakout. The same structure should be used for other types of breakout, differing only in terms of content and iconography.

```html
<aside class="gel-breakout-box" aria-labelledby="aside-1540915290281">
  <h4 aria-hidden="true" id="aside-1540915290281">
    <svg class="gel-icon gel-icon--text">
      <use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-info"></use>
    </svg>
    Note
  </h4>
  <!-- the content of the breakout; usually just a paragraph or two -->
</aside>
```

### Notes

* **`<aside>`:** The `<aside>` element is a sectioning element, and is identified as such (sometimes using the term 'complementary') in screen reader software. It is counted as a landmark[^1] and included in screen readers' aggregated landmark menus, making it highly discoverable (JAWS opens a landmarks/regions menu with <kbd>Insert</kbd> + <kbd>Ctrl</kbd> + <kbd>R</kbd>)[^2].
* **`aria-labelledby`:** This property labels the `<aside>` by association to the heading's `id`. In aggregated landmark menus, this makes it possible to identify the type of `<aside>`. The label is announced along with the ('complementary') role when the user traverses into the `<aside>` element.
* **`aria-hidden="true"`:** Breakouts should not be considered part of the parent document's main structure; their headings are for labeling and presentational purposes only. The `aria-hidden` attribute removes the heading from the document outline (and screen reader navigation) but does _not_ silence the text node as an associated label.

::: info Tip
To associate `aria-labelledby` with the respective `id`, they must share a value and that value must be unique. In your templating system, you can create a unique string at the time of compilation using `Date()`:

```js
const unique = + new Date(); // e.g. 1540915290281
```

An `id` that is not unique is considered a parsing error and, since it affects accessible naming associations here, would mean a failure under **WCAG 4.1.1 Parsing**[^3].
:::

## Expected layout

The `<h4>` element is used to invoke a heading/label of a suitable size, despite its semantics being removed from the document outline (see [**Expected markup**](#expected-markup)).

The icon supplied to the heading must be from the [GEL Iconography Set](http://bbc.github.io/gel-iconography/). It must have a fill of `currentColor` so that it matches the surround text colour and respects high contrast settings.

## Expected behaviour

The **Breakout Box** has no special behaviours; it is a static component. 

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

The following implementation is a copy of the 'tip' provided in this document.

<include src="components/demos/breakout-boxes.html">

<cta label="Open in new window" href="../demos/breakout-boxes/">


## Test specifications

[TODO]

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "ARIA Landmarks Example: Complementary Landmark" — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/complementary.html>
[^2]: "JAWS Keystrokes" — Freedom Scientific, <https://doccenter.freedomscientific.com/doccenter/archives/training/jawskeystrokes.htm>
[^3]: WCAG 1.4.1 Parsing, <https://www.w3.org/TR/WCAG20/#ensure-compat>