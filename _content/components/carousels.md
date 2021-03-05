---
title: Carousels
summary: A Carousel is a way to browse lots of content in a limited amount of vertical space, by scrolling a window onto that content
version: 0.1.0
published: true
accessibility: false
linkback: https://www.bbc.co.uk/gel/guidelines/carousel
---

## Introduction

The **Carousel** component is a component for browsing sets of thematically similar content. It must be implemented so that it can be operated by mouse, keyboard, and touch. 

Importantly, unlike some **Carousel** implementations, the content does not scroll automatically[^1]: the user is entirely in control of which **Carousel** items they can see and interact with at any one time.

### Recommended markup

::: info Code is elided
The markup is elided for brevity. The `<li>` elements represent the containers for the content items, such as [**Cards**](../cards) or [**Promos**](../promos).
:::

```html
<div class="gel-carousel" role="group">
  <div class="gel-carousel__buttons" hidden>
    <button class="gel-carousel__prev" type="button">
      <span class="gel-sr">previous</span>
      <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
        <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-previous"></use>
      </svg>
    </button>
    <button class="gel-carousel__next" type="button">
      <span class="gel-sr">next</span>
      <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
        <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-next"></use>
      </svg>
    </button>
  </div>
  <div class="gel-carousel__scrollable">
    <ul class="gel-carousel__list">
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
    </ul>
  </div>
</div>
```

### Notes

* **`role="group"`** This is a generic ARIA role, used here to indicate that the buttons and the scrollable area they control are related
* **previous and next buttons:** One can scroll the through the content in incremental steps using the previous and next buttons. It's important these are `<button>` elements with `type="button"`. Their labels are provided using visually hidden text (the `gel-sr` class) because, unlike `aria-label`, it will be translated by browser translation extensions. Buttons that are not applicable (e.g. the previous button on page load) receive the `disabled` property. The button is removed from focus order and identified as disabled (or 'dimmed') in screen reader output.
* **`hidden`:** The buttons are hidden by default because they do not work in the absence of JavaScript. They are revealed when the JavaScript runs.
* **`gel-icon` SVGs:** These must be the official `#gel-icon-previous` and `#gel-icon-next` icons from the [GEL Iconography](http://bbc.github.io/gel-iconography/) set. They have `aria-hidden="true"` and `scrollable="flase"` to hide them from assistive technologies and remove them from focus order.
* **`gel-carousel__scrollable`:** This is the scrollable 'window' for the list of carousel content items (see [Recommended layout](#recommended-layout))
* **`gel-carousel__list`:** The singular child element of `gel-carousel__scrollable` must be a `<ul>`, with each item as an `<li>`. List markup is identified as such in assistive technologies, and the items are enumerated. This lets screen reader users know they are met with a set of related content, and how much of it there is.

## Recommended layout

The basic scrolling functionality is achieved without JavaScript by making sure:

1. The items do not wrap
2. The parent has `overflow-x: auto`

This basic layout uses `inline-block` and enhances to a Flexbox context using `@supports`. The advantage of Flexbox is that its stretching algorithm makes each of the items (**Promos** in the [Reference implementation](#reference-implementation)) the same height.

```css
.gel-carousel__list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
}

.gel-carousel__list > li {
  display: flex;
  flex-shrink: 0;
  white-space: normal;
  width: 266px; /* standard Promo width */
  transition: opacity 0.5s linear;
}

.gel-carousel__list > li + li {
  margin-left: 1rem;
}
```

On some operating systems, the horizontal scrollbar is not visible by default, meaning the scrollable container lacks perceived affordance[^2]. It's possible to reveal the scrollbar in webkit browsers by giving them a custom styling:

```css
.gel-carousel__scrollable::-webkit-scrollbar {
  height: 0.5rem;
}

.gel-carousel__scrollable::-webkit-scrollbar-track {
  background-color: $gel-color--dusty-gray;
}

.gel-carousel__scrollable::-webkit-scrollbar-thumb {
  background-color: $gel-color--tundora;
}
```

### Obscured items

Items that are less than 50% in view are made to look faint with a reduced opacity. This indicates that the item must be brought further into view before it is interactive (see [**Recommended behaviour**](#recommended-behaviour)). The opacity style is applied using a CSS transition, to avoid a distracting 'blinking' effect as the user scrolls back and forth.

```css
.gel-carousel__list > li {
  transition: opacity 0.5s linear;
}

.gel-carousel__list > li[inert] {
  opacity: 0.3;
}
```

### Buttons

The previous and next buttons, `class="gel-carousel__buttons"`, is absolutely positioned over the **Carousel** at the top right, necessitating `position: relative` on the parent `gel-carousel` element. Disabled buttons take a reduced opacity.

```css
.gel-carousel__buttons button[disabled] {
  opacity: 0.5;
}
```

### Smooth scrolling

Where supported, `scroll-behavior: smooth` animates scrolling, whether scrolling is instigated by pressing a previous or next button, or by other means. Where the property is not supported, the browser steps over it and the interface remains usable.

This feature is only applied if the user has not chosen to reduce animations in their system settings:

```css
.gel-carousel__scrollable {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  .gel-carousel__scrollable {
    scroll-behavior: auto;
  }
}
```

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active.

![Promo components are already distinct with borders, and the scroll bar adopts a bolder style in Windows Edge](../../static/images/hcm_carousel.png)

## Recommended behaviour

Where JavaScript is absent, the interface is already usable. One can scroll the **Carousel** using touch or touch pad gestures, the scrollbar, or by focusing items that are (currently) obscured. JavaScript adds the previous and next buttons, and the `inert` behaviour (see below).

### Inert items

As the user scrolls by mouse, touch, gesture, or by using the auxiliary buttons, browsers that support `IntersectionObserver` add the `inert` attribute to items that go out of view and remove it from items that come into view.

```js
Array.prototype.forEach.call(items, function (item) {
  if (item.isIntersecting) {
    item.target.removeAttribute('inert');
  } else {
    item.target.setAttribute('inert', 'inert');
  }
});
```

This not only invokes the 'fading' effect described in [**Recommended layout**](#recommended-layout), but also removes inert items from focus order and the accessibility tree[^3]. The upshot is that, like sighted mouse users, keyboard and screen reader users can only perceive and interact with items that are not inert. 

Were the inert attribute not employed, a keyboard user could scroll to the end of a long set of items, only to find that the first (currently obscured) item was still first in focus order. Pressing tab would scroll the container back to the beginning and progress would be lost. 

::: info Inert polyfill
The [**Reference implementation**](#reference-implementation) includes a small polyfill[^4] for the `inert` attribute, increasing the reach of the behaviour it enables.
:::

### Button controls

Keyboard users must scroll the content using the buttons. Each time a button is pressed, the scrollable container scrolls half of its own width (as measured on page load).

```js
var scrollAmount = list.offsetWidth / 2;
```

Buttons that are not applicable (the previous button if the user is scrolled all the way left, or the next button if the user is scrolled all the way to the right) are `disabled`. This is made possible by listening to the `scroll` event, which necessitates debouncing[^5] to address performance concerns.

```js
var debounced;
scrollable.addEventListener('scroll', function () {
  window.clearTimeout(debounced);
  debounced = setTimeout(disableEnable, 200);
});
```

Buttons taking the `disabled` attribute are removed from focus order and identified as _"disabled"_ or _"dimmed"_ in screen reader output.

### Lazy loading

Although it is not provided as an intrinsic part of the [**Reference implementation**](#reference-implementation) to follow, it is recommended you use a lazy loading[^6] solution for images inside the carousel. Since the image containers for [**Card**](../cards) and [**Promo**](../promos) components have a fixed height, you do not need to address the vertical scroll jumping issues associated with lazy loading.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/carousels.html">

<cta label="Open in new window" href="../demos/carousels/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: "Image Carousels: Getting Control of the Merry-Go-Round" — usability.gov, <https://www.usability.gov/get-involved/blog/2013/04/image-carousels.html>
[^2]: "Perceived Affordances and Designing for Task Flow" — Johnny Holland, <http://johnnyholland.org/2010/04/perceived-affordances-and-designing-for-task-flow/>
[^3]: "The Accessibility Tree" — developers.google.com, <https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree>
[^4]: Inert polyfill on Github, <https://github.com/GoogleChrome/inert-polyfill>
[^5]: Throttling and Debouncing in JavaScript — Codeburst.io, <https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf>
[^6]: Lazy loading images using Intersection Observer — Dean Hume,  <https://deanhume.com/lazy-loading-images-using-intersection-observer/>
