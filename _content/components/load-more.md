---
title: Load more
summary: Loading content must be a smooth experience and under the user's direct control
version: 0.1.0
published: true
accessibility: false
linkback: https://www.bbc.co.uk/gel/guidelines/numbered-pagination
---

## Introduction

[GEL defines numbered pagination](https://www.bbc.co.uk/gel/guidelines/numbered-pagination) for navigation between whole pages of content. The **Load more** pattern builds upon this behaviour to allow the incremental loading of content items on a single page. It would most commonly be used in conjunction with a content filtering mechanism for a search or content category.

**Load more** is preferred to pagination for the exploration of content because it does not ask screen reader and keyboard users to traverse the header/preamble of a new page load for each content request. In addition, the pattern eschews issues found in automatic infinite scrolling[^1] [^2] implementations. These issues include:

* Unsolicited scrolling resulting in misplacement
* The inability to move past the content area to the foot of the page
* Lack of clear feedback and focus management

## Recommended markup

The [Reference implementation](#reference-implementation)'s script acts upon the `class="gel-loader"` element. In the code sample to follow, this is shown in the expected context of a `<main>` element, and preceded by the page's principle heading. This sample just shows the basic structure, with descriptions of subcomponents of the pattern to follow.

```html
<main id="main" tabindex="-1">
  <h1>You searched for "camera"</h1>
  <div class="gel-loader">
    <ul class="gel-loader__items">
      <!-- loaded items -->
    </ul>
    <div class="gel-loader__foot">
      <div class="gel-loader__loading" role="status" hidden>
        <!-- the loading indicator (spinner) -->
      </div>
      <button class="gel-loader__button gel-button" hidden>Load more</button>
      <nav class="gel-pages" aria-labelledby="gel-pagination-label">
        <!-- the pagination functionality -->
      </nav>
    </div>
  </div>
</main>
```

::: info The main element
The main element[^3] has attributes `id="main"` and `tabindex="-1"`. This is because it is expected to be the focus target of a same-page 'skip link'. In circumstances where the JavaScript does not run and the user must rely on the pagination component, the skip link lets them bypass the page's header/masthead to reach each successive page's content.
:::

### `gel-loader__items`

The loaded content items are presented as a list. List items are enumerated in screen reader software, letting the user know how many items are present in total, and which one they are interacting with (_"4 of 37"_).

As elaborated in [Expected behaviour](#expected-behaviour), each time a new set of items is loaded, that set's arrival is confirmed with an introductory 'separator' element. Taking the `role="separator"` ARIA attribution[^4], the element is not counted in the list's total, meaning the number of results continues to be reported accurately to assistive technologies.

```html
<li role="separator">
  Results 6 to 12
</li>
```

### `gel-loader__loading`

This construct comprises the visual loading indicator—an SVG icon—and a live region (`role="status"`)[^5]. In the [Reference implementation](#reference-implementation), _"Loading, please wait"_ is inserted invisibly into the live region as items begin to be requested. This appending of text triggers immediate announcement in screen reader output.

```html
<div class="gel-loader__loading" role="status" hidden>
  <svg class="gel-icon gel-icon--text gel-icon-loading" focusable="false" aria-hidden="true">
    <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-loading"></use>
  </svg>
  <div class="gel-loader__loading-text gel-sr"></div>
</div>
```

### The 'load more' button

```html
<button class="gel-loader__button gel-button" type="button" hidden>Load more</button>
```

The button is hidden by default. Only where JavaScript runs is it revealed (and the fallback pagination component removed). It must be a standard `<button>` element, with `type="button"`. It is always at the foot of the list of loaded content and can easily be stepped/tabbed past by keyboard.

### Individual results

This pattern does not prescribe how individual results should be formed, except that they should be list items and, in most cases, should contain a link to the permalink for the result.

You may introduce each result with a heading, but each result's heading must be of the same level: one level higher than the page's principle heading. Since the principle heading should always be an `<h1>`, results should be `<h2>` in order to describe the correct nesting structure:

* You searched for "camera" (h1)
    * Nikon Z 6 (h2)
    * Nikon D850 (h2)
    * Fujifilm X100 F (h2)
    * etc

### The pagination component

The pagination component is [documented on GEL](https://www.bbc.co.uk/gel/guidelines/numbered-pagination). This implementation incorporates a labelled navigation landmark. Screen readers tend to provide aggregated lists of landmark elements for quick navigation.

Note the use of `role="separator"` to remove the ellipsis element from enumeration. Where the previous or next link is not applicable it is 'disabled' by having its `href` removed. This removes it from focus order. The current page is identified accessibly with `aria-current="page"`[^6].

```html
<nav class="gel-pages" aria-labelledby="gel-pages-label">
  <div id="gel-pages-label" hidden>Page</div>
  <a class="gel-pages-prev">
    <span class="gel-sr">Previous page</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-previous"></use>
    </svg>
  </a>
  <ol class="gel-pages-numbered">
    <li><a href="?page=1" aria-current="page">1</a></li>
    <li><a href="?page=2">2</a></li>
    <li><a href="?page=3">3</a></li>
    <li><a href="?page=4">4</a></li>
    <li><a href="?page=5">5</a></li>
    <li><a href="?page=6">6</a></li>
    <li><a href="?page=7">7</a></li>
    <li role="separator">&hellip;</li>
    <li><a href="?page=999">999</a></li>
  </ol>
  <div class="gel-pages-text">Page 1 of 999</div>
  <a class="gel-pages-next" href="?page=2">
    <span class="gel-sr">Next page</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="path/to/static/images/gel-icons-all.svg#gel-icon-next"></use>
    </svg>
  </a>
</nav>
```

This fallback mechanism is presented to users whose browsers do not support JavaScript's `Promise` interface, or for which JavaScript is not running. The [Reference implementation](#reference-implementation) reveals the pagination in these circumstances, but does not implement the endpoints represented by the `page=n` query parameters. These are merely placeholders and should be implemented as your API allows.

## Recommended layout

The aesthetic of your search results is not prescribed by this pattern, but there are a few general rules to follow:

* Each result/item should be distinct from its neighbouring results/items
* The separator elements that introduce batches of results (see [Recommended behaviour](#recommended-behaviour)) should be distinct from the results themselves
* The 'load more' button should adopt the standard button style (applied via `class="gel-button"`) here

## The loading indicator

The loading indicator should be the standard [Gel Iconography](http://bbc.github.io/gel-iconography/) SVG icon,  `gel-icon-loading`. It should appear above the button while the results are being fetched. It should not appear wider than the button itself. The standard animation, as defined in [Gel Iconography](http://bbc.github.io/gel-iconography/), is applied in the [Reference implementation](#reference-implementation) as follows:

```css
@keyframes gel-spin {
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
  }
}

.gel-icon-loading {
  animation-name: gel-spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
```

### The separator

The separator element introducing any batch of new results takes focus to place those results next in focus order. Therefore, it should have some form of focus style. In the [Reference implementation](#reference-implementation) a diminishing animated focus style is used to first draw attention then disappear. Since the element itself is not interactive, a persistent focus style may be misleading.

```css
@keyframes focus {
  0%{
    outline: 2px dotted $gel-color--tundora;
  }
  100% {
    outline: 2px dotted transparent;
  }
}

.gel-loader__items [role="separator"]:focus {
  outline-width: 0;
  outline-offset: 2px;
  animation: focus 1s linear 1;
}
```

## The pagination component

For maximum backwards compatibility with minimum code, `inline-block` places the items side-by-side. In the [Reference implementation](#reference-implementation), the expanded layout (with 9 numbered items, including the ellipsis and end item) switches down to the compact version (with the text element; specified in [GEL Numbered Pagination](https://www.bbc.co.uk/gel/guidelines/numbered-pagination)) at `650px`. This will differ for your setup due to the inevitable discrepancy between the pagination container's and the viewport's width. It will need adjusting.

```css
@media (min-width: 650px) {
  .gel-pages-text {
    display: none;
  }

  .gel-pages-numbered {
    display: inline-block;
  }
}
```

## Recommended behaviour

The behaviour differs depending on whether JavaScript has run and the `Promise` and `fetch` interfaces are supported:

### No JavaScript enhancement

1. The user is presented with an initial page of results / content items.
2. At the foot of the results, the pagination component lets them navigate between pages of results.
3. Pressing a page link loads that page (screen reader users will hear the page `<title>` announced; keyboard users will have their focus point initialized on the document's `<body>` element).
4. The current page is indicated with a style that matches `:focus`, and is communicated to assistive technologies via `aria-current="page"`.
5. The previous and next links become 'disabled' and unfocusable where they are not applicable by removing their `href`.

### JavaScript enhancement

1. The user is presented with an initial page of results / content items. These should be server rendered in order for the pagination fallback to work.
2. At the foot of the results, a 'load more' button lets the user load a batch more results.
3. When the button is pressed, the loading indicator ('spinner') appears above the button, and _"loading, please wait"_ is announced in screen readers via the supplemental live region.
4. When the results have been fetched, two things happen:
    1. The loading indicator is hidden, and the live region emptied of content. In some setups this will silence the region immediately; in others the _"loading, please wait"_ message will be read out in its entirety (if it has not been already).
    2. The results appear, introduced by a separator element. This element confirms how many items have been loaded (_"items 12 to 18:"_, for example) and is focused.
5. The focused separator element announces its confirmation text in screen reader software and places the keyboard user in an appropriate position to browse to the newly appended items.

Note that the specific behaviour and messaging in the [Reference implementation](#reference-implementation) (and the JavaScript used to achieve it) is partly dependent on the nature of the dummy data being used. In this case, items can be fetched using a base URL and enumeration.

```js
// Result 14 would be https://jsonplaceholder.typicode.com/posts/14
var baseURL = 'https://jsonplaceholder.typicode.com/posts/';

var loaderElem = document.querySelector('.gel-loader');
var loader = new gel.LoadMore.constructor(
  loaderElem,
  6, // The number of results fetched each time
  7, // The starting result (6 items server rendered + 1)
  baseURL
);
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/load-more.html">

<cta label="Open in new window" href="../demos/load-more/">

### Paginated

<include src="components/demos/load-more-paginated.html">

<cta label="Open in new window" href="../demos/load-more-paginated/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Automatic Infinite Scrolling And Accessibility — Simply Accessible, <https://simplyaccessible.com/article/infinite-scrolling/>
[^2]: So You Think You Built A Good Infinite Scroll — Adrian Roselli, <http://blog.adrianroselli.com/2014/05/so-you-think-you-built-good-infinite.html>
[^3]: The Main Element — HTML5 Doctor, <http://html5doctor.com/the-main-element/>
[^4]: Separator (role) — W3C, <https://www.w3.org/WAI/PF/aria/roles#separator>
[^5]: ARIA Live Regions — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions>
[^6]: Using The ARIA Current Attribute — tink.uk, <https://tink.uk/using-the-aria-current-attribute/>
