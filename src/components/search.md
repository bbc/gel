---
title: Search
summary: The global and local search components each include 
version: 0.1.0
published: true
linkback: https://www.bbc.co.uk/gel/guidelines/local-search
---

## Introduction

GEL documents [global](https://www.bbc.co.uk/gel/guidelines/global-search) and [local](https://www.bbc.co.uk/gel/guidelines/local-search) search separately. However, for the sake of consistency, each _mode_ of search is implemented as a similar visual, semantic, and interactive pattern.

This Page does not document search results or filtering. Choosing a suggestion based on a search term takes the user directly to the suggested permalink, whereas pressing the submit button will take the user to the [www.bbc.co.uk/search](https://www.bbc.co.uk/search) page to browse and filter results.

## Recommended markup

Whether local or global, the search component must be marked up as a `role="search"` landmark, making it available to screen reader shortcuts. The `role="search"` attribution must not be placed on the form, but instead on a wrapping element[^1]. ARIA roles suppress implicit roles, and remove their associated behaviors. Screen readers should still be able to identify the form as a form.

```html
<div class="gel-search" role="search">
  <form class="gel-search-controls">
    <!-- search functionality here -->
  </form>
</div>
```

The search component is composed of two main parts: the search controls (`class="gel-search-controls"`), and the associated search suggestions (`class="gel-search-suggestions"`).

### Search controls

The following example is for a global search region. It would be revealed by pressing the search button in the page's [**Masthead**](../masthead), and includes a close button to dismiss it again. SVG data is elided. There are notes to follow.

```html
<form class="gel-search-controls" method="get" action="https://search.bbc.co.uk/search">
  <label for="search" hidden>Search the BBC</label>
  <input type="text" id="search" name="search" />
  <button type="submit">
    <span class="gel-sr">Search</span>
    <svg class="gel-icon gel-icon--text" focusable="false">
      ...
    </svg>
  </button>
  <button type="button" class="gel-search-close">
    <span class="gel-sr">Close</span>
    <svg class="gel-icon gel-icon--text" focusable="false">
      ...
    </svg>
  </button>
</form>
```

* **"Search the BBC":** Because this is a global search region, the label for the search input simply reads _"Search the BBC"_. This text is `hidden` but associated with the input, and available to screen readers, by making the `<label>`'s `for` attribute and the input's `id` share a value.
* **Buttons:** Each button uses the native button element. The close button takes `type="button"` to differentiate it from a submit button and prevent it from erroneously submitting the form[^3].
* **SVG:** Each SVG must take `focusable="false"` and `aria-hidden="true"` to ensure it is unavailable to assistive technologies and not focusable by keyboard.

A local search region differs in three ways:

* A logo is included for branding purposes.
* The input label reads _"Search BBC [site name]"_ (a non-visual equivalent of the logo).
* The close button is omitted, since local search is a permanent fixture placed under the masthead.
* A `placeholder` may be included, but not as a replacement for the `<label>` which must remain intact. As [GEL's local search documentation](https://www.bbc.co.uk/gel/guidelines/local-search) recommends, the placeholder should contain search suggestions, for example _"enter a town, city, or postcode"_

See the [local search reference implementation](../demos/local-search).

### Search suggestions

Where available, typing into the search input populates a region below the search controls with suggested links. This region looks like the following in its initial state (with notes to follow):

```html
<aside class="gel-search-suggestions" aria-label="Search suggestions" aria-hidden="true" hidden>
  <h2 class="gel-search-suggestions-label" role="status" aria-live="polite"></h2>
  <div class="gel-search-suggestions-links"></div>
</aside>
```

* **`<aside>`:** The suggestions region is provided as a complementary landmark. This makes it easy to locate using screen reader software (while it is available) and allows for the descriptive label: _"Search suggestions"_. When a screen reader user enters the region and focuses a suggestion link they will hear something similar to, _"search suggestions, complementary region, list of 5 items, first item, [item text], link"_ (where 5 suggestions are available and presented in a list — which is recommended).
* **`aria-hidden="true"` and `hidden`:** In the initial state, the region is not visible, on account of having zero height and `overflow: hidden` (see the [**Recommended layout**](#recommended-layout) section. To achieve parity for screen reader users, `aria-hidden="true"` 'hides' the region from their software. The `hidden` property hides the region unless JavaScript (upon which it depends) runs and can remove it.
* **`role="status"`:** When suggestions become available, screen reader users should be informed — and without stealing their focus. A live region is populated with text following the template _"We have \[n\] suggestions for you&lt;span class="gel-sr">, please find them below&lt;/span>:"_. The _"please find them below"_ portion is only helpful non-visually, so is visually hidden using the `.gel-sr` class. The `aria-live="polite"` attribution is equivalent to `role="status"`. Some browsers only support one of the two attributes, so this maximizes compatibility.
* **`.gel-search-suggestions-links`:** A function provided by the developer would be used to populate lists of suggestions (see the [**Reference implementations**](#reference-implementation))

::: alert Suggestions structure
The pattern described here is intended to best reflect [the GEL documentation for search](https://www.bbc.co.uk/gel/guidelines/local-search). Simpler auto-suggest patterns, such as those using the native `<datalist>` element[^4], or combobox ARIA[^5] are not flexible enough to accommodate the structured content permissable in the `.gel-search-suggestions-links` container.

Suggestions should be grouped into lists of links. Where there are different varieties of suggestions, each group should be introduced by a heading of the appropriate level. Given that the live region is based on an `<h2>` in the example, `<h3>` headings should label (generic) _"Suggestions"_ and _"Latest results"_:

```html
<aside class="gel-search-suggestions" aria-label="Search suggestions" aria-hidden="true" hidden>
  <h2 class="gel-search-suggestions-label" role="status" aria-live="polite"></h2>
  <h3>Suggestions</h3>
  <!-- unordered list of links -->
  <h3>Latest results</h3>
  <!-- unordered list of links -->
</aside>
```
:::

## Recommended layout

The search region itself uses Flexbox to bring its items inline. The input is allowed to grow and shrink, helping the component support a range of viewport widths.

```css
.gel-search-controls {
  display: flex;
  align-items: center;
}

.gel-search-controls > input {
  flex-grow: 1;
  min-width: 0;
}
```

### Focus styles

Strong—not just default—focus styles are recommended. In the [**Reference implementations**](#reference-implementation), a solid `outline` is employed, with a negative `outline-offset` to bring the outline inside the input and button boxes:

```css
.gel-search-controls > input:focus,
.gel-search-controls > button:focus {
  outline: 2px solid;
  outline-offset: -2px;
}
```

## Recommended behaviour

Here is the basic workflow for using search, with actions/behaviours specific to global search marked as such:

1. Click the search button in the [**Masthead**](../masthead) → the search region is revealed and the search input is focused. (_global search only_)
2. Type inside the search field → If suggestions are available, they populate the suggestions region, and it is revealed. For screen reader users, the presence of suggestions (and the number available) is announced via the live region.
3. Click on the submit button → The user is taken to the search page (https://search.bbc.co.uk/search)
4. Click on a suggestion → The user is taken to that suggestion's permalink
5. Click on the close ('X') button → the search region is hidden and the Masthead's search button regains keyboard focus (_global search only_)

### Opening global search

The [**Reference implementation**](#reference-implementation) includes a `toggle` method for assigning and enhancing an element intended for opening and focusing the search component. In the [global search demo](../demos/global-search/), this element is the 'Search' link in the [**Masthead**](../masthead). 

Where JavaScript does not run, this link is followed and the search page opened (in the same tab). Where JavaScript does run, the link is enhanced into a popup button (taking `role="button"` and `aria-haspopup="true"`). The `event.preventDefault()` method is applied, and the newly coined button launches the search component described in this page instead. 

When the user presses the close button to the right of the search input's submit button, focus is returned to the invoking popup button, as described in (5), above.

### Animating the suggestions region

The animation (sliding up and down) of the suggestions region uses JavaScript, not just CSS. This is because you cannot animate to an `auto` height, and the height of the region—including the dynamic suggestions content—cannot be known ahead of time. Instead, the `scrollHeight` of the region must be determined and that height made the 'target' for the animation end. Importantly, the function that populates the suggestions _must be executed before the animation function_. Otherwise the target height will be incorrect. 

Here is the entire process:

```js
// Use the supplied function to populate the suggestions
buildFunction(this);
// Set `aria-hidden` to `false` so:
// (a) the live region will announce
// (b) the suggestions will be available to screen readers
this.suggestions.setAttribute('aria-hidden', 'false');
// Now safely populate the live region
this.suggestionsLabel.innerHTML = 'We have <span class="search-suggestion-count">' + this.suggestionsLinks.querySelector('a').length + '</span> suggestions for you<span class="gel-sr">, please find them below</span>:'
// Finally, animate the region into view
this.showSuggestions();
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.

The search script's constructor takes a `buildFunction` parameter. In [the demonstration](../demos/local-search/), this function just takes some example data to create suggestions based on the first letter typed by the user. It is anticipated that a _real_ suggestions function would be more complex, and use live data. The reference implementation just demonstrates the recommended UI behaviour.
:::

### Local search

<include src="components/demos/local-search.html">

<cta label="Open in new window" href="../demos/local-search/">

### Global search

The global search implementation uses the [**Masthead**](../masthead) component, and must be opened in a new window.

<cta label="Open in new window" href="../demos/global-search/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Where To Put Your Search Role — Adrian Roselli, <http://adrianroselli.com/2015/08/where-to-put-your-search-role.html>
[^2]: When To Use An ARIA Role — Paciello Group blog, <https://developer.paciellogroup.com/blog/2012/06/html5-accessibility-chops-when-to-use-an-aria-role/>
[^3]: Why it's important to give your HTML button a type — dev.to (Claire Parker), <https://dev.to/claireparkerjones/why-its-important-to-give-your-html-button-a-type-58k9>
[^4]: `<datalist>` — MDN, <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist>
[^5]: Combobox - ARIA Authoring Practices, <https://www.w3.org/TR/wai-aria-practices/#combobox>