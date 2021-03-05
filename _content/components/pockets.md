---
title: Pockets
summary: The Pocket pattern allows the user to reveal longform content at their discretion
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/pocket
---

## Introduction

The **Pocket** component contains the page's main content in a truncated form. The purpose of this is to not overwhelm the user with content upon first arriving at the page. With the content shortened it is easier to see (and reach by keyboard or screen reader-based navigation) the functionality at the foot of the page.

A 'Show more' button at the foot of the **Pocket** allows the reader to unveil the obscured content. Importantly, when the unveiling takes place, a cue to continue reading is inserted between the last item of initial/preview content and the first of the unveiled content. This ensures the user does not lose their place.

Note that, although the patterns are similar, the **Pocket** differs from the [**Load more**](../load-more) pattern in that it simply obscures content, rather than deferring the loading of content. The **Pocket** should be implemented without reliance on XHR.

## Recommended markup

The markup is quite simple, since the [Reference implementation](#reference-implementation) uses progressive enhancement, and only adds the button functionality where JavaScript runs. Just two nested wrapping elements are needed.

```html
<div class="gel-pocket">
  <div class="gel-pocket__truncated">
    <!-- content here -->
  </div>
</div>
```

::: info Main content
Note that the **Pocket** is intended for truncating the _main_ content of a page. In most circumstances, you should be nesting the `class="gel-pocket"` element directly inside a `<main>` element or, alternatively, _making_ it the `<main>` element. The page should contain a skip link that navigates the user to `<main>`, in accordance with WCAG 2.4.1 Bypass Blocks[^1]. The `tabindex="-1"` in the example to follow ensures all browsers move focus to the link when it is navigated to via the skip link.
:::

```html
<main id="main" tabindex="-1">
  <div class="gel-pocket">
    <div class="gel-pocket__truncated">
      <!-- content here -->
    </div>
  </div>
</main>
```

## Recommended layout

The `class="gel-pocket__truncated"` needs to adopt a reasonable fixed height on initialization. Something set in viewport units[^2] is recommended since they pertain to a proportion of the viewport and would befit a viewport of any physical height: `50vh` is 50% of the height of any screen. This value is set as one of the parameters of the [Reference implementation](#reference-implementation)'s constructor.

The same element must, of course, take `overflow-y: hidden` for the truncation to work.

```css
.gel-pocket__truncated {
  overflow-y: hidden;
}
```

The 'foot' of the **Pocket** element contains the 'Show more' button, centrally justified. It has no height and appears as a single line, with the button placed centrally over it on the vertical axis, using a transform.

```css
.gel-pocket__foot button {
  transform: translateY(-50%);
}
```

When the **Pocket** is in its unveiled/showing state, the button's text changes to 'Show less' (see [Recommended behaviour](#recommended-behaviour), below) and a class of `gel-pocket--foot-shown` is applied, enabling a `margin-top` style to separate the transformed button from the now unveiled content.

```css
.gel-pocket__foot.gel-pocket--foot-shown {
  margin-top: double($gel-spacing-unit);
}
```

When the _"Continue below..."_ element is focused, it draws attention by showing a brief `outline` animation:

```css
@keyframes focus {
  0%{
    outline-width: 0px;
  }
  50% {
    outline-width: 2px;
  }
  100% {
    outline-width: 0px; 
  }
}

.gel-pocket__continue:focus {
  outline-style: solid;
  outline-width: 0px;
  outline-offset: 2px;
  animation: focus 1s linear 1;
}
```

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. 

![Black on white theme with all the same shapes intact](../../static/images/hcm_pocket.png)

## Recommended behaviour

The **Pocket** is treated as a progressive enhancement. It does not initialize at all if JavaScript does not run or `IntersectionObserver` is not supported. Support for `IntersectionObserver` is covered by Chrome, Edge, Firefox, Opera, and various Android browsers at the time of writing[^3]. Browsers that do not enhance to a **Pocket** simply show the content in its expanded form.

The purpose of the `IntersectionObserver` is to apply (polyfilled) `inert`[^4] status to all the visually obscured children within the `class="gel-pocket__truncated"` element.

```js
if (!item.isIntersecting) {
  // Add the inert attr if the element is cut off
  // or invisible
  item.target.setAttribute('inert', 'inert');
} else {
  // Remove inert from all elements when the
  // truncated element's height becomes 'auto'
  item.target.removeAttribute('inert');
}
```

Since `inert` hides items from assistive technologies like screen readers and makes them unfocusable by keyboard, `IntersectionObserver` creates a parity between the experience of sighted mouse users and other kinds of user. The content is hidden accessibly, until unveiled, and the 'Show more' button is the first tab stop after the last of the items above it.

### Switching state

When the 'Show more' button is pressed, the content is expanded. A _"Continue reading..."_ element is injected between the last of the preview/initial content and the first of the unveiled content. This element is focused, meaning keyboard dependent users are relocated to the correct position in the content to continue reading. The [Reference implementation](#reference-implementation) lets you choose your own text to override _"Continued below..."_ if so desired.

```js
self.constructor.prototype.showMore = function () {
  this.shown = true;
  this.next = this.truncated.querySelector('[inert]').previousElementSibling;
  this.truncated.style.height = 'auto';
  this.truncated.insertBefore(this.continue, this.next);
  this.continue.focus();
  this.button.textContent = 'Show less';
}
```

::: info The previous element
Instead of placing the _"Continue reading"_ element directly before the first of the originally hidden elements, it goes one element before that. This addresses a quirk with `isIntersecting` and makes browser behaviour more consistent. 
:::

In this state, the 'Show more' button now reads 'Show less', and pressing it switches the **Pocket** back into its initial truncated state. In this case, focus is not moved anywhere. It remains on the button. The screen reader user can browse back into just the preview content from this point, or continue down into the footer.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/pockets.html">

<cta label="Open in new window" href="../demos/pockets/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: WCAG 2.1 2.4.1 Bypass Blocks, <https://www.w3.org/TR/WCAG21/#bypass-blocks>
[^2]: CSS Viewport Units: A Quick Start — Sitepoint, <https://www.sitepoint.com/css-viewport-units-quick-start/>
[^3]: `IntersectionObserver` support table — caniuse.com, <https://caniuse.com/#feat=intersectionobserver>
[^4]: `inert` polyfill — WICG, <https://github.com/WICG/inert>