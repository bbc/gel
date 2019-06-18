---
title: Filter & Sort
summary: Filters help the user find what they’re looking for. Allowing the user to refine content by selecting criteria that’s relevant to their needs.
version: 0.1.0
published: false
linkback: https://www.bbc.co.uk/gel/guidelines/filter
---

## Introduction

Users arrive at search results pages having submitted a search query to a global or local [**Search**](../search) component. To help them find what they are looking for among the results, filtering and sorting tools are provided.

Unlike in some implementations, utilizing XHR requests, BBC filtering tools constitute a set of links corresponding to the "q" query parameter. The base URL is [https://www.bbc.co.uk/search](https://www.bbc.co.uk/search). Since this method does not require JavaScript, the filtering itself should not either. JavaScript is only incorporated as a progressive enhancement, and only to improve the component's responsiveness.

## Recommended markup

Since it incorporates lists of links to separate pages, the filtering functionality is encapsulated in a navigation region[^1]. The following code sample illustrates the filter component in its initial state, where JavaScript has yet to run. It is perfectly funtional in this state.

```html
<nav class="gef-filter" aria-labelledby="filter-label">
  <div class="gef-filter__bar">
    <span class="gef-filter__label" id="filter-label" aria-hidden="true">Filter:</span>
    <ul class="gef-filter__list">
      <li><a href="?filter=filter+1" aria-current="page">Filter 1</a></li>
      <li><a href="?filter=filter+2">Filter 2</a></li>
      <li><a href="?filter=filter+3">Filter 3</a></li>
      <!-- more -->
    </ul>
    <button class="gef-filter__more" aria-expanded="false" hidden>
      More
      <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
        <use xlink:href="{{site.basedir}}static/images/gel-icons-all.svg#gel-icon-down"></use>
      </svg>
    </button>
  </div>
  <div class="gef-filter__popup" hidden></div>
</nav>
```

### Notes

* **`aria-labelledby="filter-label"`:** The visible label 'filter' is associated with the `<nav>` element explicitly. This relationship means that screen reader users will find the region marked as "Filter" in aggregated landmark menus. This differentiates it from other navigation regions/landmarks on the page. This cannot be encountered directly by assistive technologies because it takes `aria-hidden="true"`. Since it forms a group label, direct encounter would be unnecessary and only at to verbosity.
* **`.gef-filter__list`:** As is conventional for navigation, options/links are grouped into lists. Lists are identified in screen readers and their items enumerated, proffering valuable non-visual context.
* **`.gef-filter__more`:** The "More" button is hidden by default (taking `hidden`), and acts as a toggle button where available. Its initial state is `false`, meaning the button would be identified as _"More, toggle button, collapsed"_ or similar in screen readers.
* **`.gef-filter__popup`:** An empty element is included, `hidden` by default. This is populated by the additional items accessible from the "More" button where JavaScript is available and `IntersectionObserver` supported. See the [**Recommended behaviour**](#recommended-behaviour) section for more.

## Recommended layout

The horizontal configuration of the filter subcomponents is facilitated by the widely supported Flexbox module[^2]. 

In the absence of JavaScript, the principle list of filter links is allowed to grow and shrink, and takes `overflow-x: auto`. That is, where there is not enough room to display all of the filter links, horizontal scrolling is instated. To give the scrollable region more perceived affordance[^3] in systems, like MacOS, that tend to hide scrollbars, explicit scrollbar styling is included:

```css
.gef-filter__list::-webkit-scrollbar {
  height: 0.125rem;
}

.gef-filter__list::-webkit-scrollbar-track {
  background-color: $gel-color--dusty-gray; 
}

.gef-filter__list::-webkit-scrollbar-thumb {
  background-color: $gel-color--tundora; 
}
```

Where JavaScript runs, and `IntersectionObserver`[^4] is supported, `overflow: hidden` is instated instead. Items that do not fit within the available space are hidden visually, from screen reader output, and prevented from being focused with `visibility: hidden`. Clones are made of these hidden items, and they are placed in the auxiliary "More" menu (`.gef-filter__popup`). See [**Recommended behaviour**](#recommended-behaviour), below, for more.

## Recommended behaviour

The benefit of using native link elements and (RESTful) URLs is that the functionality works in the absence of JavaScript. As mentioned in [**Recommended layout**](#recommended-layout), horizontal scrolling allows the user to access links obscured by a narrow viewport. Where JavaScript runs, these obscured links are appended to the auxiliary `.gef-filter__popup` element, the appearance of which—hidden or unhidden—being toggled by the `.gef-filter__more` button. Two methods are provided in the [**Reference implementation**](#reference-implementation): `showPopup()` and `hidePopup`.

```js
self.constructor.prototype.showPopup = function () {
  this.moreButton.setAttribute('aria-expanded', 'true');
  this.popup.hidden = false;
}

self.constructor.prototype.hidePopup = function () {
  this.moreButton.setAttribute('aria-expanded', 'false');
  this.popup.hidden = true;
}
```

The first link of the `.gef-filter__popup` is the next interactive element in focus order after the "More" button, making focus management[^5] (and/or reliance on the poorly supported `aria-controls` attribute[^6]) unnecessary.

### Results

The results attained by choosing a filter link should be organized and behave as outlined in the [**Load more**](../load-more) pattern. In the [**Reference implementation**](#reference-implementation) here, a live implementation of the [**Load more**](../load-more) pattern is supplanted by a simple, descriptive placeholder for brevity.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/filter.html">

<cta label="Open in new window" href="../demos/filter/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: ARIA landmark example — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/navigation.html>
[^2]: CSS Flexible Box Layout Module — caniuse.com, <https://caniuse.com/#feat=flexbox>
[^3]: Perceived Affordances — Johnny Holland, <http://johnnyholland.org/2010/04/perceived-affordances-and-designing-for-task-flow/>
[^4]: `IntersectionObserver` API — MDN, <https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>
[^5]: Managing Focus For Accessibility — Rob Dodson, <https://dev.to/robdodson/managing-focus-64l>
[^6]: ARIA-controls is Poop — heydonworks.com, <https://www.heydonworks.com/article/aria-controls-is-poop>