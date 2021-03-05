---
title: Routing
summary: Route changes in single-page applications need to emulate the conventions of page loads
version: 0.1.0
published: true
---

## Introduction

Within a single-page application (SPA), the conceptual equivalent of pages are _screens_. Navigation between these screens is facilitated by a router. When the URL changes, the router dynamically fetches data and renders the content for the screen _in situ_. That is, unlike in a multi-page website, individual pages are not loaded; the single page is augmented.

While the unified structure of a single-page application is convenient for data persistence and state management, the routing behaviour can present issues for some users. When a new resource/page is loaded, two not insignificant events take place:

1. Keyboard focus is moved to the body of the page, above all of the page's interactive content in terms of source order
2. The page's title (`<title>`; `document.title`) is announced in screen reader software, introducing the page

Most SPA routers do not emulate these expected behaviours, out-of-the-box. By default, focus is destroyed along with the previous screen's markup. Typically, focus then _resets_ to the `<body>` element, but without announcing the (changed) title. Sometimes the behaviour is more unpredictable — especially where the new screen takes some time to render. A 'ghost' focus may be maintained in the position where the underlying element was removed, meaning a a <kbd>Tab</kbd> keypress may focus a proximate element in the newly rendered screen.

The purpose of this document is to provide guidance on creating a more consistent and ergonomic behaviour.

## Recommended markup

### The route content

The screens of web applications, like the pages of websites, should share a consistent structure. Only the unique content for individual screens should change as the user is rerouted. The navigation should always be found in the same place, and offer the same navigation options.

The unique screen content should be housed in a `<main>` element, making it accessible to screen readers via their landmark shortcut options. For example, in JAWS, the `<main>` landmark is accessible by pressing the <kbd>Q</kbd> key[^1].

```html
<main id="main" tabindex="-1">
  <!-- dynamically rendered screen content -->
</main>
```

Note the provision of `tabindex="-1"`. The `<main>` element should also be accessible by keyboard using a skip link. The skip link should be the first interactive element on the page, and allows keyboard users to bypass[^2] the header and navigation where desirable.

```html
<a href="#main">skip to content</a>
```

## Recommended behaviour

### Changing the title

Ensure the `<title>` element is actually changed to reflect the newly appointed screen. Router packages typically support custom events for route changes. Employ a route change event to rewrite the `document.title`. If such an event is not emitted, you may need to create your own, or listen to `history` changes.

Guidance on writing descriptive `<title>`s is covered in [**Headings**](../headings). In short, they should be made up of a label for the page and a label for the site or application. This succinctly gives users all the context they need as they load (and switch between) tabs.

```css
<title>Brexitcast | BBC Sounds</title>
```

### The active link

It's important for wayfinding[^3] that the current location is indicated. Customarily, this is done by highlighting the navigation link that corresponds to the current page. To make this indication accessible, use `aria-current="page"` in place of a superficial `class`. Links bearing `aria-current="page"` are identified as _"[link label], current page"_ is screen reader output.

In React Router 4, you provide the `ariaCurrent` prop to each `<NavLink/>` component. The `aria-current` attribute appears where `isActive` evaluates to true.

```html
<NavLink to="/home" ariaCurrent="page">Home</NavLink>
```

### Focus management

It's important focus is handled with deliberation, but what is done with focus depends on the circumstance. A common approach to handling focus between routes in a SPA is to focus the newly acquired screen's `<h1>` element[^4]. In plain JavaScript this would look something like the following. 

```js
const mainHeading = document.querySelector('h1');
mainHeading.tabindex = -1;
mainHeading.focus();
```

In React, you would defer to the `refs` API[^5]:

```js
// Initialize <h1 ref={this.mainHeading} tabindex="-1">Brexitcast</h1>
this.mainHeading = React.createRef();

// Focus the ref's DOM node (accessible as `current`)
this.mainHeading.current.focus();
```

::: info Sequential focus navigation
The `tabindex="-1"` attribution forces browsers that would not otherwise update their sequential focus starting point[^6] to move keyboard focus to the destination heading.
:::

Since focusing an element triggers its announcement in screen reader software, the user will hear the new screen's heading's text content upon switching to that screen. This behaviour is analogous to hearing the `<title>` element announced upon full page load, especially since the `<h1>` should be a subset of the `<title>`:

```html
<!-- screen label and application label -->
<title>Brexitcast | BBC Sounds</title>

<!-- screen label -->
<h1 tabindex="-1">Brexitcast</h1>
```

While this is a serviceable approach to handling route _changes_, it is not recommended when the application is first loaded. In this circumstance, the user has yet to choose a specific item of content (screen) from the navigation, and should be allowed to explore the page from top to bottom. With the skip link and `<main>` element mentioned in [Recommended markup](#recommended-markup) in place, they are still able to bypass the preamble where desired.

Therefore, only listen to route/history _changes_ in order to direct focus to page headings. Whichever route the user initially accesses will behave like a page load anyway, and the `<title>` text will be announced in screen readers.

::: info Multiple h1 headings
In normal circumstances, it is not recommended to have multiple `<h1>` headings in the same page. This would produce a 'flat' document structure, making navigation difficult for screen reader users (see [Headings](../headings)).

However, in a single-page application, screens are analogous to pages and each should have a main heading. Each screen that is `hidden` (or is not currently rendered) does not provide its `<h1>` to the current document outline, so does not pollute the document structure.
:::

### Awaiting content

Where possible, the user should not have to wait for the screen's content to load upon rerouting to said screen. It's recommended to `preload` critical resources for all routes, and pre-cache unvisited screens in the background. This is referred to as the PRPL Pattern[^7].

Where this is not possible, or pre-caching has not had time to take place, a loading indicator should be provided until all the content is ready to be revealed. The indicator (a 'spinner' or other progress animation) should include a textual label like _"Loading"_ or _"Please wait"_. The text may be visually hidden, but must be available to screen readers (note the `gel-sr` utility class):

```html
<h1>Brexitcast</h1>
<div class="loading-indicator">
  <svg class="gel-icon gel-icon--text gel-icon-loading" focusable="false" aria-hidden="true">
    <use xlink:href="path/to/#gel-icon-loading"></use>
  </svg>
  <span class="gel-sr">Loading...</span>
</div>
```

When the user arrives at the route, the _"Loading..."_ element must be focused, so that the text is announced and the screen reader user is made aware of the loading state. Then, when the loading is complete, a callback should focus the principle heading as it would be for any immediately rendered screen.

### Back button support

The configuration of your router should not break back (or forward) button support. That is, when the user presses the browser back button, the previous screen should be rendered. Likewise, the browser forward button should take the user to the route/screen rendered before pressing the back button.

SPA routers tend to build upon fragment identifiers[^8] and identify their routes by `#`. By default, browsers include fragments in browsing history, meaning there should be no extra work in this regard. The `hashchange` event is harnessed in the simple [Reference implementation](#reference-implementation) to affect the focus management provision covered above.

In some circumstances, you may wish to implement a custom back button as part of the interface. To make this work with React Router (version 4), you would need to access the `history.goBack()` method.

```js
<button onClick={this.props.history.goBack()}>← Go back</button>
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<cta label="Open in new window" href="../../components/demos/routing/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Landmarks examples, JAWS screen reader for Windows — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/at.html#jaws>
[^2]: WCAG2.1 2.4.1 Bypass Blocks, <https://www.w3.org/TR/WCAG21/#bypass-blocks>
[^3]: Information Wayfinding Part 1 — UX Matters, <https://www.uxmatters.com/mt/archives/2013/04/information-wayfinding-part-1-a-not-so-new-metaphor.php>
[^4]: Managing focus for accessibility (video) — Rob Dodson, <https://dev.to/robdodson/managing-focus-64l>
[^5]: Refs and The DOM — React documentation, <https://reactjs.org/docs/refs-and-the-dom.html>
[^6]: Focus should cycle from named anchor — bugs.chromium.org, <https://bugs.chromium.org/p/chromium/issues/detail?id=262171>
[^7]: PRPL Pattern — GatsbyJS, <https://www.gatsbyjs.org/docs/prpl-pattern/>
[^8]: Fragment identifier — Wikipedia, <https://en.wikipedia.org/wiki/Fragment_identifier>