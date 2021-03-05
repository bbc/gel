---
title: Filter & Sort
summary: Filters help the user find what they’re looking for. Allowing the user to refine content by selecting criteria that’s relevant to their needs.
version: 0.1.0
published: true
linkback: https://www.bbc.co.uk/gel/guidelines/filter
---

## Introduction

Users arrive at search results pages having submitted a search query to a global or local [**Search**](../search) component. To help them find what they are looking for among the results, filtering and sorting tools are provided.

Unlike in some implementations, utilizing XHR requests, BBC filtering tools constitute a set of links corresponding to query parameters. The base URL is [https://www.bbc.co.uk/search](https://www.bbc.co.uk/search). Since this mechanism does not require JavaScript, the interface itself should not either. JavaScript is only incorporated as a progressive enhancement, and only to improve the component's responsiveness.

## Recommended markup

Since it incorporates lists of links to separate pages, the filtering functionality is encapsulated in a navigation region[^1]. The following code sample illustrates the filter component in its initial state, where JavaScript has yet to run. It is perfectly funtional in this state.

```html
<nav class="gel-filter" aria-labelledby="filter-label">
  <div class="gel-filter__bar">
    <span class="gel-filter__label" id="filter-label" aria-hidden="true">Filter:</span>
    <ul class="gel-filter__list">
      <li><a href="?filter=filter+1" aria-current="page">Filter 1</a></li>
      <li><a href="?filter=filter+2">Filter 2</a></li>
      <li><a href="?filter=filter+3">Filter 3</a></li>
      <!-- more -->
    </ul>
    <button class="gel-filter__more" aria-expanded="false" hidden>
      More
      <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
        <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-down"></use>
      </svg>
    </button>
  </div>
  <div class="gel-filter__popup" hidden></div>
  <div class="gel-filter__sort">
    <span class="gel-filter__sort-label">Sort by:</span>
    <ul>
      <li><a href=".?filter=filter+1&sort=relevance" aria-current="page">Relevance</a></li>
      <li><a href=".?filter=filter+1&sort=date">Date</a></li>
    </ul>
  </div>
</nav>
```

### Notes

* **`aria-labelledby="filter-label"`:** The visible label 'filter' is associated with the `<nav>` element explicitly. This relationship means that screen reader users will find the region marked as "Filter" in aggregated landmark menus. This differentiates it from other navigation regions/landmarks on the page. This cannot be encountered directly by assistive technologies because it takes `aria-hidden="true"`. Since it forms a group label, direct encounter would be unnecessary and only at to verbosity.
* **`.gel-filter__list`:** As is conventional for navigation, options/links are grouped into lists. Lists are identified in screen readers and their items enumerated, proffering valuable non-visual context.
* **`.gel-filter__more`:** The "More" button is hidden by default (taking `hidden`), and acts as a toggle button where available. Its initial state is `false`, meaning the button would be identified as _"More, toggle button, collapsed"_ or similar in screen readers.
* **`.gel-filter__popup`:** An empty element is included, `hidden` by default. This is populated by the additional items accessible from the "More" button where JavaScript is available and `IntersectionObserver` supported. See the [**Recommended behaviour**](#recommended-behaviour) section for more.
* **`.gel-filter__sort`:** A supplementary list of links are provided for sorting the current filter option.
* **`aria-current="page"`:** The `aria-current` attribute[^2] is used to indicate the link corresponding to the current page. In this example, the first filter and "Relevance" sorting option both correspond to the current page, so each take the attribute (the page's query string would be `?filter=filter+1&sort=relevance` — as on the sorting link's `href`).

## Recommended layout

The horizontal configuration of the filter subcomponents is facilitated by the widely supported Flexbox module[^3]. 

In the absence of JavaScript, the principle list of filter links is allowed to grow and shrink, and takes `overflow-x: auto`. That is, where there is not enough room to display all of the filter links, horizontal scrolling is instated. To give the scrollable region more perceived affordance[^4] in systems, like MacOS, that tend to hide scrollbars, explicit scrollbar styling is included:

```css
.gel-filter__list::-webkit-scrollbar {
  height: 0.125rem;
}

.gel-filter__list::-webkit-scrollbar-track {
  background-color: $gel-color--dusty-gray; 
}

.gel-filter__list::-webkit-scrollbar-thumb {
  background-color: $gel-color--tundora; 
}
```

Where JavaScript runs, and `IntersectionObserver`[^5] is supported, `overflow: hidden` is instated instead. Items that do not fit within the available space are hidden visually, from screen reader output, and prevented from being focused with `visibility: hidden`. Clones are made of these hidden items, and they are placed in the auxiliary "More" menu (`.gel-filter__popup`). See [**Recommended behaviour**](#recommended-behaviour), below, for more.

## Recommended behaviour

The benefit of using native link elements and (RESTful) URLs is that the functionality works in the absence of JavaScript. As mentioned in [**Recommended layout**](#recommended-layout), horizontal scrolling allows the user to access links obscured by a narrow viewport. Where JavaScript runs, these obscured links are appended to the auxiliary `.gel-filter__popup` element, the appearance of which—hidden or unhidden—being toggled by the `.gel-filter__more` button. Two methods are provided in the [**Reference implementation**](#reference-implementation): `showPopup()` and `hidePopup`.

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

The first link of the `.gel-filter__popup` is the next interactive element in focus order after the "More" button, making focus management[^6] (and/or reliance on the poorly supported `aria-controls` attribute[^7]) unnecessary.

### Results

The results attained by choosing a filter link should be organized and behave as outlined in the [**Load more**](../load-more) pattern. In the [**Reference implementation**](#reference-implementation) here, a live implementation of the [**Load more**](../load-more) pattern is supplanted by a simple, descriptive placeholder for brevity.

## Sorting options

Some implementations of sorting options take the form of dropdown menus. Since sorting options are few in number, there's no need to obscure options inside a menu. Radio buttons are preferable, since they show all the available options simultaneously. However, loading a page 'on input', would go against expected and standard behaviour, and would violate **WCAG2.1 3.2.2 On Input**[^8].

Instead, the sorting options are provided as links (like the filtering options), and the chosen sorting option takes `aria-current="page"`. An attribute selector is used to style the element.

```css
.gel-filter__sort [aria-current] {
  text-decoration: none;
  background-color: $gel-color--star-command-blue;
  color: #fff;
}
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<cta label="Open in new window" href="../demos/filter/?filter=filter+1&sort=relevance">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: ARIA landmark example — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/navigation.html>
[^2]: Using the `aria-current` attribute — Léonie Watson, <https://tink.uk/using-the-aria-current-attribute/>
[^3]: CSS Flexible Box Layout Module — caniuse.com, <https://caniuse.com/#feat=flexbox>
[^4]: Perceived Affordances — Johnny Holland, <http://johnnyholland.org/2010/04/perceived-affordances-and-designing-for-task-flow/>
[^5]: `IntersectionObserver` API — MDN, <https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>
[^6]: Managing Focus For Accessibility — Rob Dodson, <https://dev.to/robdodson/managing-focus-64l>
[^7]: ARIA-controls is Poop — heydonworks.com, <https://www.heydonworks.com/article/aria-controls-is-poop>
[^8]: WCAG2.1 3.2.2 On Input — W3C, <https://www.w3.org/TR/WCAG21/#on-input>