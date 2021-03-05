---
title: Breakout boxes
summary: Breakout Boxes interject supplementary content within the flow of a document
version: 0.1.0
published: true
accessibility: false
---

## Introduction

Sometimes its worth noting or alerting users to certain information, but that information cannot be considered part of the main narrative for the document. This is what the **Breakout box** component is for. 

**Breakout boxes** can contain tips, warnings, research notes, interesting facts, and all sorts of tangential information.

## Recommended markup

The following example is a "Note" type breakout. The same structure should be used for other types of breakout, differing only in terms of content and iconography.

```html
<aside class="gel-breakout-box" aria-labelledby="aside-1540915290281">
  <h4 aria-hidden="true" id="aside-1540915290281">
    <svg class="gel-icon gel-icon--text">
      <use xlink:href="/gel/static/images/gel-icons-core-set.svg#gel-icon-info"></use>
    </svg>
    The unique title for the breakout
  </h4>
  <!-- The content of the breakout; usually just a paragraph or two -->
</aside>
```

### Notes

* **`<aside>`:** The `<aside>` element is a sectioning element, and is identified as such (sometimes using the term 'complementary') in screen reader software. It is counted as a landmark[^1] and included in screen readers' aggregated landmark menus, making it highly discoverable (JAWS opens a landmarks/regions menu with <kbd>Insert</kbd> + <kbd>Ctrl</kbd> + <kbd>R</kbd>)[^2].
* **`aria-labelledby`:** This property labels the `<aside>` by association to the heading's `id`. In aggregated landmark menus, this makes it possible to identify the **Breakout box** by its label. The label is announced along with the ('complementary') role when the user traverses into the `<aside>` element. It also labels the `<aside>` in landmark lists (see the previous point), so it should be unique — that is, not just _"Note"_ or _"Warning"_ in each case.
* **`aria-hidden="true"`:** **Breakout boxes** should not be considered part of the parent document's main structure; their headings are for labeling and presentational purposes only. The `aria-hidden` attribute removes the heading from the document outline (and screen reader navigation) but does _not_ silence the text node as an associated label.

::: info Labeling by relationship
To associate `aria-labelledby` with the respective `id`, they must share a value and that value must be unique. In your templating system, you can create a unique string at the time of compilation using `Date()`:

```js
const unique = + new Date(); // e.g. 1540915290281
```

An `id` that is not unique is considered a parsing error and, since it affects accessible naming associations here, would mean a failure under **WCAG 4.1.1 Parsing**[^3].
:::

## Recommended layout

The `<h4>` element is used to invoke a heading/label of a suitable size, despite its semantics being removed from the document outline (see [**Recommended markup**](#recommended-markup)).

The icon supplied to the heading must be from the [GEL Iconography Set](http://bbc.github.io/gel-iconography/). It must have a fill of `currentColor` so that it matches the surround text colour and respects high contrast settings.

### Windows High Contrast Mode

The `background-color` that demarcates the **Breakout box** from the surrounding page will be eliminated by Windows High Contrast Mode. A transparent top and bottom border is applied. This becomes visible as a solid colour when Windows HCM is turned on, achieving the same purpose of demarcation.

```css
.gel-breakout-box {
  background: #eee;
  border-top: 1px solid transparent; /* for high contrast mode */
  border-bottom: 1px solid transparent; /* for high contrast mode */
}
```

![A white border appears above and below the breakout](../../static/images/hcm_breakout_boxes.png)

## Recommended behaviour

The **Breakout box** has no special behaviours; it is a static component. 

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

The following implementation is a copy of the `aria-labelledby` tip provided in this document.

<include src="components/demos/breakout-boxes.html">

<cta label="Open in new window" href="../demos/breakout-boxes/">


## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: "ARIA Landmarks Example: Complementary Landmark" — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/complementary.html>
[^2]: "JAWS Keystrokes" — Freedom Scientific, <https://doccenter.freedomscientific.com/doccenter/archives/training/jawskeystrokes.htm>
[^3]: WCAG 1.4.1 Parsing, <https://www.w3.org/TR/WCAG20/#ensure-compat>