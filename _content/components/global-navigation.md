---
title: Global Navigation
summary: The global navigation is a component of the masthead, which additionally contains the cookie banner and advertisements.
version: 1.0.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/global-navigation
---

## Introduction

The global navigation provides navigation between BBC products. It also allows users to access their account, notifications and search the BBC or the service the user is on.

This document contains the intended designed experience for included users groups such as older users, users of assistive technology and user with customised fonts, colours, and backgrounds.

The global navigation is intended for use by all groups apart from young children under 5.

### Technical scope

The global navigation is an essential component for each of the pages of any BBC site. To be considered robust, the following levels of reliance on JavaScript must be considered:

1. **No JavaScript**: The functionality must be available to users whose browsers are not running JavaScript or when JavaScript fails to run for any reason.
2. **Progressive Enhancement**: A core experience for all functionality must be provided and enhanced depending on the browsers capability and implementation.

A number of responsive design and progressive enhancement techniques are employed to make the Masthead as inclusive as possible

## Recommended markup

The global navigation is contained within the masthead; the masthead is a container with an implicit or explicit role of `banner`:

``` html
<header>
  …
</header>
```

The global navigation component within the header comprises of the following sub-components:

1. The logo:  _BBC home navigation link_
2. The account module: _displays who is signed in and links to the account overview page_
3. The notification module: _includes notification functionality_
4. The priority links list: _a set of common BBC pages one can navigate between_
5. The 'More' menu:  _a more complete set of BBC site navigation items_
6. The search functionality: _locate and navigate to content within the site_

The global navigation content is contained within an element with an implicit or explicit role of `navigation` and an accessible name of “BBC-wide”:

``` html
<nav aria-label="BBC-wide">
  …
</nav>
```

### Logo

The logo's purpose is to provide branding and a link to the homepage.

``` html
<a href="…">
  <svg role="img" aria-label="BBC Homepage" focusable="false">…</svg>
</a>
```

The logo is provided as an inline SVG. Its `fill` is set to `currentColor`, honouring Windows High Contrast Mode text colours.

### Account module

The account module has two modes, depending on the signed-in status of the user:

* *Signed-out users*: a link to the sign-in page with the text “Sign-in”.
* *Signed-in users*: a link to the user's account page with text of either the user's display name or, for users that do not have a display name, “Your account”.

In both cases the link contains a decorative avatar icon. At small screen sizes, the text label is hidden with only the avatar icon visible. At all screen sizes, the text of the link is the link's accessible name.

Signed out:

``` html
<a href="…">
  <svg aria-hidden="true" focusable="false">…</svg>
  <span>Sign-in</span>
</a>
```

Signed in:

``` html
<a href="…">
  <svg aria-hidden="true" focusable="false">…</svg>
  <span>Your account</span>
</a>
```

### Notifications module

The notifications module provides a link to notifications for all users (core experience) and may be progressively enhanced to provide a drawer with notification elements.

### Priority links list

The priority links module shows users a list of prioritised BBC service links to allow them to navigate between services. It is a list of links with optional decorative service identifier icons. Although the list of links has a priority order based on BBC requirements, this does not necessarily match the priority order of the site visitor and is therefore an unordered list semantically.

The screen size determines the number of links displayed within the priority links list. Links not included within the priority links list are included within the “More” menu. Hidden links must be removed from the accessibility tree and inaccessible to all inputs, including keyboards and switches. If zero links are displayed in the priority links list, the list must be removed from the accessibility tree.

```html
<ul>
  <li><a href="/news">News</a></li>
  <li><a href="/sport">Sport</a></li>
  <li><a href="/weather">Weather</a></li>
  <li><a href="/iplayer">iPlayer</a></li>
  <li><a href="/sounds">Sounds</a></li>
  <li><a href="/cbbc">CBBC</a></li>
</ul>
```

### More menu

The more menu reveals additional BBC services so that users can navigate the larger range of BBC service offerings.

Services that appear within the priority links subcomponent do not appear within the more menu drawer and vice versa. Hidden links must be both removed from the accessibility tree and inaccessible to all methods of input, including keyboards and switches.

The more menu control is a link with an accessible name of “More Menu”.

The more menu drawer should immediately follows the more menu control in the source order, it may be present later in the source order but this is not ideal. The more menu drawer must be contained within an element with an implicit or explicit role of `navigation` and an accessible name of “More Menu”:

```html
<a href="#gel-masthead__more">More menu</a>
<nav id="gel-masthead__more" aria-label="More menu">
  …
</nav>
```

The more menu control links, with a URL fragment, to the container of the more menu drawer. The display state of the more menu drawer is then based on the presence of the URL fragment within the URL of the current page using the `:target` CSS pseudo-class:

```css
#gel-masthead__more {
  display: none;
}

#gel-masthead__more:target {
  display: block;
}
```

The drawback of this approach is that only one component using this approach can be manipulated at a time.

The more menu can be progressively enhanced to act as a disclosure component by giving the more menu control an explicit role of `button` and an `aria-expanded` attribute with a value of `false` when the more menu is closed and `true` when the more menu is open. The default event of the more menu control must be disabled, and instead, the display state of the more menu content must be toggled by activating the more menu control.

```html
<a href="#gel-masthead__more" role="button" aria-expanded="false">More menu</a>
<nav id="gel-masthead__more" aria-label="More menu">
  …
</nav>
```

Links within the more menu drawer are structured as an unordered list with the same semantics and structure as the priority links list.

```css
#gel-masthead__more {
  display: none;
}

[aria-expanded="true"] + #gel-masthead__more {
  display: block;
}
```

When the more menu drawer is opened and closed using a keyboard, animation should not be used.

When the more menu drawer is opened by activating the more menu control with a keyboard `ENTER` or `SPACE` keypress, focus should be set to the first link within the more menu drawer. When the more menu drawer is opened by activating the more menu control with a click or an interaction that simulates a click event, focus should be set to the more menu drawer container.

The more menu drawer can be closed by either activating the more menu control while the more menu is open, pressing the `ESC` key when focus is within the more menu drawer, or by moving focus away from the more menu drawer container. In all cases, focus should be set to the more menu control when the drawer is closed.

### Search module

The purpose of the search sub-component is to either navigate the user to search page (core) or provide an in-page search experience via a drawer within the global navigation (enhanced).

The core implementation of the search module is as a link to the search page. The link has an accessible name of “Search BBC” by default, but this can be changed for specific products. As well as a text label, the link contains a search icon. The text label is hidden at small screen sizes with only the search icon visible. At all screen sizes, the link's text is the link's accessible name.

The link is contained within an element with an explicit role of `search`:

```html
<div role="search">
  <a href="/search">
    <svg aria-hidden="true" focusable="false">…</svg>
    <span>Search BBC</span>
  </a>
</div>
```

When progressively enhanced, the search module is implemented in the same way as the more menu, with the drawer containing a search form:

```html
<div role="search">
  <a href="/search">
    <svg aria-hidden="true" focusable="false">…</svg>
    <span>Search BBC</span>
  </a>
  <nav aria-label="Search BBC">
    <!-- Search form -->
  </nav>
</div>
```

## Recommended Layout

The components of the global navigation should be structured in the order presented here. See [detailed information about the more menu drawer](#more-menu) above

```html
<header>
  <nav aria-label="BBC-wide">
    <a href="…">
      <svg role="img" aria-label="BBC Homepage" focusable="false">…</svg>
    </a>

    <a href="…">
      <svg aria-hidden="true" focusable="false">…</svg>
      <span>Sign-in</span>
    </a>

    <!-- Notifications module -->

    <ul>
      <li><a href="/news">News</a></li>
      <li><a href="/sport">Sport</a></li>
      <li><a href="/weather">Weather</a></li>
      <li><a href="/iplayer">iPlayer</a></li>
      <li><a href="/sounds">Sounds</a></li>
      <li><a href="/cbbc">CBBC</a></li>
    </ul>

    <a href="#gel-masthead__more" role="button" aria-expanded="false">More menu</a>
    <nav id="gel-masthead__more" aria-label="More menu">
      …
    </nav>

    <div role="search">
      <a href="/search">
        <svg aria-hidden="true" focusable="false">…</svg>
        <span>Search BBC</span>
      </a>
    </div>
  </nav>
</header>
```

## Recommended Behaviour

A number of responsive design and progressive enhancement techniques are employed to make the global navigation as inclusive as possible. Specifically, the following features must be included:

1. Animation within the global navigation must support the `prefers-reduced-motion` CSS media feature with an assumption that motion should not be used if there is value set. For example, the logo blocks must only animate if `prefers-reduced-motion` is set to `false` and only for one cycle.
2. Clear and purposefully designed focus state, supported in all browsers.
3. For switch users, browser default behaviours for links.
4. A minimum touch target size of 44x44px at default zoom level.
5. Support for content resized with browser zoom at every zoom level between 100% and 400%.
6. Support for content resized with browser text at every text resize level between 100% and 200%.
7. Support for high contrast mode that works across all user agents. Content must therefore not be implemented as background images.
8. Support for user defined font size, font colour and background colours.
9. A minimum contrast ratio between foreground and background colours for all text content (including the BBC logo) of 4.5:1, between foreground and background colours for all non-text content of 3:1, and between adjacent colours for all content (for example, the borders of form fields against the background) of 3:1.
10. Elements with an accessible role of `link` must be activatable with `ENTER` key presses.
11. Elements with an accessible role of `button` must be activatable with `ENTER` and `SPACE` key presses.