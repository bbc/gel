---
title: Carousels
summary: A carousel is a great way to view lots of content in a limited amount of vertical space. It presents a window to view some of a row of content, while indicating there is more out of view that can be scrolled to.
version: 0.1.0
published: false
accessibility: false
linkback: https://www.bbc.co.uk/gel/guidelines/carousel
---

## Introduction

The carousel component is a component for browsing sets of thematically similar content. It must be implemented so that it can be operated by mouse, keyboard, and touch. 

Importantly, unlike some carousel implementations, the content does not scroll automatically[^1]: the user is entirely in control of which carousel items they can see and interact with at any one time.

### Expected markup

::: info Code is elided
The markup is elided for brevity. The `<li>` elements represent the containers for the content items, such as [**Cards**](#link-todo) or [**Promos**](#link-todo).
:::

```html
<div class="gel-carousel" role="group">
  <div class="gel-carousel-buttons">
    <button class="gel-carousel-prev" type="button" disabled>
      <span class="vh">previous</span>
      <span class="gel-icon">
        <svg>
          <use xlink:href="#gel-icon-previous"></use>
        </svg>
      </span>
    </button>
    <button class="gel-carousel-next" type="button">
      <span class="vh">next</span>
      <span class="gel-icon">
        <svg>
          <use xlink:href="#gel-icon-next"></use>
        </svg>
      </span>
    </button>
  </div>
  <div class="gel-carousel-scrollable">
    <ul class="gel-carousel-list">
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
* **previous and next buttons:** One can scroll the through the content in incremental steps using the previous and next buttons. It's important these are `<button>` elements with `type="button"`. Their labels are provided using visually hidden text (the `vh` class[^2]) because, unlike `aria-label` it will be translated by browser translation extensions. Buttons that are not applicable (e.g. the previous button on page load) receive the `disabled` property. The button is removed from focus order and identified as disabled (or 'dimmed') in screen reader output.
* **`gel-icon` SVGs:** These must be the official `#gel-icon-previous` and `#gel-icon-next` icons from the [GEL Iconography](http://bbc.github.io/gel-iconography/) set.
* **`gel-carousel-scrollable`:** This is the scrollable 'window' for the list of carousel content items (see [**Expected layout**](#expected-layout))
* **`gel-carousel-list`:** The singular child element of `gel-carousel-scrollable` must be a `<ul>`, with each item as an `<li>`. List markup is identified as such in assistive technologies, and the items are enumerated. This lets screen reader users know they are met with a set of related content, and how much of it there is.

## Expected layout

The basic scrolling functionality is achieved without JavaScript by making sure:

1. The items do not wrap
2. The parent has `overflow-x: auto`

Since flex children do not wrap by default, simply adding `display: flex` to the `gel-carousel-list` (`<ul>`) element is sufficient. It also ensures that each item adopts the height of the tallest item.

```css
.gel-carousel-scrollable {
  overflow-x: auto;
}

.gel-carousel-list {
  display: flex;
}
```

On some operating systems, the horizontal scrollbar is not visible by default, meaning the scrollable container lacks perceived affordance[^3]. It's possible to reveal the scrollbar in webkit browsers by giving them a custom styling:

```css
.gel-carousel-scrollable::-webkit-scrollbar {
  height: 0.5rem;
}

.gel-carousel-scrollable::-webkit-scrollbar-track {
  background-color: $gel-color--dusty-gray;
}

.gel-carousel-scrollable::-webkit-scrollbar-thumb {
  background-color: $gel-color--tundora;
}
```

### Obscured items

Items that are less than 50% in view are made to look faint with a reduced opacity. This indicates that the item must be brought further into view before it is interactive (see [**Expected behaviour**](#expected-behaviour)). The opacity style is applied using a CSS transition, to avoid a distracting 'blinking' effect as the user scrolls back and forth.

```css
.gel-carousel-list > li {
  transition: opacity 0.5s linear;
}

.gel-carousel-list > li[inert] {
  opacity: 0.3;
}
```

### Buttons

The previous and next buttons, `gel-carousel-buttons`, is absolutely positioned over the carousel at the top right, necessitating `position: relative` on the parent `gel-carousel` element. Disabled buttons take a reduced opacity.

```css
.gel-carousel-buttons button[disabled] {
  opacity: 0.5;
}
```

### Expected behaviour

#### Scrolling

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

This not only invokes the 'fading' effect described in [**Expected layout**](#expected-layout), but also removed inert items from focus order and the accessibility tree[^4]. The upshot is that, like sighted mouse users, keyboard and screen reader users can only perceive and interact with items that are not inert. 

Were the inert attribute not employed, a keyboard user could scroll to the end of a long set of items, only to find that the first item was still first in focus order. Pressing tab would scroll the container back to the beginning and progress would be lost. 

::: info Inert polyfill
The [**Reference implementation**](#reference-implementation) includes a small polyfill[^5] for the `inert` attribute, increasing the reach of the behaviour it enables.
:::

#### Button controls

Keyboard users must scroll the content using the buttons. Each time a button is pressed, the scrollable container scrolls half of its own width (as measured on page load).

```js
var scrollAmount = list.offsetWidth / 2;
```

Buttons that are not applicable (the previous button if the user is scrolled all the way left, or the next button if the user is scrolled all the way to the right) are `disabled`. This is made possible by listening to the `scroll` event, which necessitates debouncing[^6] to address performance concerns.

```js
var debounced;
scrollable.addEventListener('scroll', function () {
  window.clearTimeout(debounced);
  debounced = setTimeout(disableEnable, 200);
});
```

Buttons taking the `disabled` attribute are removed from focus order and identified as "disabled" or "dimmed" in screen reader output.

#### Lazy loading

Although it is not provided as an intrinsic part of the [**Reference implementation**](#reference-implementation) to follow, it is recommended you use a lazy loading[^7] solution for images inside the carousel. Since the image containers for [**Card**](#link-todo) and [**Promo**](#link-todo) components have a fixed height, you do not need to address the scroll jumping issues associated with lazy loading.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/carousels.html">

<cta label="Open in new window" href="../demos/carousels/">


## Test specifications

[TODO]

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "Image Carousels: Getting Control of the Merry-Go-Round" — usability.gov, <https://www.usability.gov/get-involved/blog/2013/04/image-carousels.html>
[^2]: Gist of the `vh` (visually hidden) class <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: "Perceived Affordances and Designing for Task Flow" — Johnny Holland, <http://johnnyholland.org/2010/04/perceived-affordances-and-designing-for-task-flow/>
[^4]: "The Accessibility Tree" — developers.google.com, <https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree>
[^5]: Inert polyfill on Github, <https://github.com/GoogleChrome/inert-polyfill>
[^6]: Throttling and Debouncing in JavaScript — Codeburst.io, <https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf>
[^7]: Lazy loading images using Intersection Observer — Dean Hume,  <https://deanhume.com/lazy-loading-images-using-intersection-observer/>
