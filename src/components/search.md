---
title: Search
summary: Share tools offer unobtrusive options to share BBC content on social media
version: 0.1.0
published: false
linkback: https://www.bbc.co.uk/gel/guidelines/local-search
---

## Introduction

## Recommended markup

Whether local or global, the search must be marked up as a `role="search"` landmark, making it available to screen reader shortcuts. The `role="search"` attribution must not be placed on the form, but instead on a wrapping element[^1]. ARIA roles suppress implicit roles, and remove their associated behaviors. Screen readers should still be able to identify the form as a form.

```html
<div class="gef-search" role="search">
  <form class="gef-search-controls">
    <!-- search functionality here -->
  </form>
</div>
```

The search region is composed of two main parts: the search controls (`class="gef-search-controls"`), and the search suggestions (`class="gef-search-suggestions"`).

### Search controls

The following example is for a global search region. It would be revealed by pressing a button in the page's [**Masthead**](../masthead), and includes a close button to dismiss it again. SVG data is elided. There are notes to follow.

```html
<form class="gef-search-controls" method="get" action="https://search.bbc.co.uk/search">
  <label for="search" hidden>Search the BBC</label>
  <input type="text" id="search" name="search" autocomplete="off" />
  <button type="submit">
    <span class="gef-sr">Search</span>
    <svg class="gel-icon gel-icon--text" focusable="false">
      ...
    </svg>
  </button>
  <button type="button" class="gef-search-close">
    <span class="gef-sr">Close</span>
    <svg class="gel-icon gel-icon--text" focusable="false">
      ...
    </svg>
  </button>
</form>
```

* **"Search the BBC":** Because this is a global search region, the label for the search input simply reads _"Search the BBC"_. This text is `hidden` but associated with the input, and available to screen readers, by making the `<label>`'s `for` attribute and the input's `id` share a value.
* **Buttons:** Each button uses the native button element. The close button takes `type="button"` to differentiate it from a submit button and prevent it from erroneously submitting the form[^3].
* **SVG:** Each SVG must take `focusable="false"` and `aria-hidden="true"` to ensure it is unavailable to assistive technologies and not focusable by keyboard

A local search region differs in three ways:

* A logo is included for branding purposes
* The input label reads _"Search BBC [site name]"_ (a non-visual equivalent of the logo)
* The close button is omitted, since local search is a permanent fixture, placed under the masthead

See the [local search reference implementation](../demos/local-search).

### Search suggestions

Where available, typing into the search input populates a region below the search controls with suggested links. This region looks like the following in its initial state (with notes to follow):

```html
<aside class="gef-search-suggestions" aria-label="Search suggestions" aria-hidden="true" hidden>
  <h2 class="gef-search-suggestions-label" role="status" aria-live="polite"></h2>
  <div class="gef-search-suggestions-links"></div>
</aside>
```

* **`&lt;aside>`:** The suggestions region is provided as a complementary landmark. This makes it easy to locate using screen reader software (while it is available) and allows for the descriptive label: _"Search suggestions"_. When a screen reader user enters the region and focuses a suggestion link they will hear something similar to, _"search suggestions, complementary region, list of 5 items, first item, [item text], link"_ (where 5 suggestions are available and presented in a list — which is recommended).
* **`aria-hidden="true"` and `hidden`:** In the initial state, the region is not visible, on account of having zero height and `overflow: hidden` (see the [**Recommended layout**](#recommended-layout) section. To achieve parity for screen reader users, `aria-hidden="true"` 'hides' the region from their software. The `hidden` property hides the region unless JavaScript (upon which it depends) runs and can remove it.
* **`role="status"`:** When suggestions become available, screen reader users should be informed — and without stealing their focus. A live region is populated with text following the template _"We have \[n\] suggestions for you&lt;span class="gef-sr">, please find them below&lt;/span>:"_. The _"please find them below"_ portion is only helpful non-visually, so is visually hidden using the `.gef-sr` class. The `aria-live="polite"` attribution is equivalent to `role="status"`. Some browsers only support one of the two, so this maximizes compatibility.
* **`.gef-search-suggestions-links`:** A function provided by the developer would be used to populate lists of suggestions (see the [**Reference implementations**](#reference-implementation))

## Recommended layout

The search region itself uses Flexbox to bring its items inline. The input is allowed to grow and shrink, helping the component support a range of viewport widths.

```css
.gef-search-controls {
  display: flex;
  align-items: center;
}

.gef-search-controls > input {
  flex-grow: 1;
  min-width: 0;
}
```

### Focus styles

Strong—not just default—focus styles are recommended. In the [**Reference implementations**](#reference-implementation), a solid `outline` is employed, with a negative `outline-offset` to bring the outline inside the input and button boxes:

```css
.gef-search-controls > input:focus,
.gef-search-controls > button:focus {
  outline: 2px solid;
  outline-offset: -2px;
}
```

## Recommended behaviour

Here is the basic workflow for using search, with actions/behaviours specific to global search marked as such:

1. Click the search button in the [**Masthead**](../masthead) → the search region is revealed and the search input is focused. (_global search only_)
2. Type inside the search field → If suggestions are available, they populate the suggestions region, and it is revealed. For screen reader users, the presence of suggestions (and the number available) is announced.
3. Click on the submit button → The user is taken to the search page (https://search.bbc.co.uk/search)
4. Click on a suggestion → The user is taken to that suggestion's permalink
5. Click on the close ('X') button → the search region is hidden and the Masthead's search button is regains keyboard focus (_global search only_)

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
this.suggestionsLabel.innerHTML = 'We have <span class="search-suggestion-count">' + this.suggestionsLinks.querySelector('a').length + '</span> suggestions for you<span class="gef-sr">, please find them below</span>:'
// Finally, animate the region into view
this.showSuggestions();
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Where To Put Your Search Role — Adrian Roselli, <http://adrianroselli.com/2015/08/where-to-put-your-search-role.html>
[^2]: When To Use An ARIA Role — Paciello Group blog, <https://developer.paciellogroup.com/blog/2012/06/html5-accessibility-chops-when-to-use-an-aria-role/>
[^3]: Why it's important to give your HTML button a type — dev.to (Claire Parker), <https://dev.to/claireparkerjones/why-its-important-to-give-your-html-button-a-type-58k9>