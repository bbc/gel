---
title: Site menu
summary: The Site menu is the navigation region for the local site, and can contain two tiers of navigation options
version: 0.1.0
published: true
accessibility: false
linkback: http://www.bbc.co.uk/gel
---

## Introduction

The [**Masthead**](../masthead) and **Site menu** are both navigation regions, and are typically seen together on BBC web pages. The **Masthead** lets you navigate _between_ BBC sites, and the **Site menu** allows you to navigate around the current, local site (Sport, Weather, News, etc).

## Recommended markup

The semantic structure of the **Site menu** is that of a table of contents: a master list, containing nested lists where subtopics of available content are available. Each list is identified in popular screen reader software, communicating the nested structure non-visually. For BBC Gel, the site outline includes nested subtopics for the Guidelines topic:

* Home
* Guidelines
    * Foundations
    * Patterns
    * How-tos
* Articles
* About UX&D

In practice, this structure is presented within a navigation (`<nav>`) landmark[^1] labelled _"This site"_. This makes the **Site menu** easily discoverable and identifiable in screen reader software.

```html
<nav class="gel-sitemenu" aria-labelledby="gel-sitemenu__label">
  <span id="gel-sitemenu-label" hidden>This site</span>
  <button type="button" aria-expanded="false">
    <svg class="gel-icon gel-icon--text" focusable="false">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-list"></use>
    </svg>
    Menu
  </button>
  <ul class="gel-sitemenu__list">
    <li><a href="#" aria-current="page">Home</a></li>
    <li>
      <button class="gel-sitemenu__more-button" type="button" aria-expanded="false">
        Guidelines
        <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
          <use xlink:href="path/to/gel-icons-all.svg#gel-icon-down"></use>
        </svg>
      </button>
      <div class="gel-sitemenu__more" hidden>
        <div class="gel-sitemenu__more-inner">
          <ul>
            <li><a href="#">Foundations</a></li>
            <li><a href="#">Design patterns</a></li>
            <li><a href="#">How-tos</a></li>
          </ul>
        </div>
      </div>
    </li>
    <li><a href="#">Articles</a></li>
    <li><a href="#">About UX&D</a></li>
  </ul>
</nav>
```

### Notes

* **`id="gel-sitemenu-label"`:** A proxy `<span>` element is used to label the landmark. This method is preferred to using an `aria-label` which is ignored by Google and Microsoft translation services at the time of writing. Note that the element is `hidden`. This stops it from being encountered directly while browsing, without silencing it as a proximity label[^2].
* **`class="gel-sitemenu__menu-button"`:** For narrower viewports, the menu is hidden behind this toggle button and disclosed when it is pressed. This saves vertical space. The element must be a button, and not a link, because it does not take the user to a new location.
* **`class="gel-sitemenu__more-button"`** Nested subtopic menus are hidden behind `<button>`s also. Their accessible `aria-expanded` state is set to either `false` (collapsed) or `true` (expanded).
* **`class="gel-icon"`** Each SVG icon is hidden from assistive technologies with `aria-hidden` and is removed from the tab order (in some versions of Internet Explorer and Edge) with `focusable="false"`[^3].
* **`aria-current="page"`:** This indicates which menu item corresponds to the current page, and is announced as _"current"_ in screen reader software[^4].

## Recommended layout

The **Site menu's** submenus must appear under the top-level menu items _without_ breaking the semantic structure. This is achieved with a combination of `display: inline` (menu items) and `float: left` (submenu):

```css
.gel-sitemenu li {
  display: inline;
}

.gel-sitemenu__more {
  float: left;
}
```

Now the submenu appears below each of the top-level menu items, but the table of contents-like nesting structure remains and focus order is not disrupted. After opening a submenu by clicking its attendant button, the next focusable element is the first of the submenu's options.

The submenu container must take up the whole of the viewport. This is achieved using `calc()`:

```css
.gel-sitemenu__more {
  width: calc(100vw + 1px);
  position: relative;
  left: calc((100vw - 100%) / 2 * -1 - 1px);
}
```

The element's width is first set to `100vw`, then it is repositioned to be flush with the left edge of the screen. The `1px` addition and subtraction compensates for the horizontal borders. Multiplying by `-1` negates the value to pull the position to the left.

To ensure the submenu's content (`.gel-submenu-inner`) aligns with the top-level menu, each element is given a `max-width` of `1008px` and `auto` margins.

```css
.gel-sitemenu__more-inner,
.gel-sitemenu__list {
  margin-left: auto;
  margin-right: auto;
  max-width: 1008px;
}
```

Note that the `1008px` figure depends on the width of the page's main content and will differ between sites. 1008 is taken from the [GEL site's](https://www.bbc.co.uk/gel/) implementation.

### Focus styles

The focus style is paired with the hover style. 

```css
.gel-sitemenu__list a:hover,
.gel-sitemenu__list button:hover,
.gel-sitemenu__list a:focus,
.gel-sitemenu__list button:focus,
.gel-sitemenu__list [aria-current] {
  outline: none;
  box-shadow: inset 0 -4px 0 0 currentColor;
}
```

The main style—a `4px` line at the base of the item—is supplemented by a fallback for Windows High Contrast Mode (because Windows HCM themes tend to remove box shadows[^5]). This takes the form of a `text-decoration` style.

```css
@media (-ms-high-contrast: active) {
  .gel-sitemenu__list a:hover,
  .gel-sitemenu__list button:hover,
  .gel-sitemenu__list a:focus,
  .gel-sitemenu__list button:focus,
  .gel-sitemenu__list [aria-current] {
    text-decoration: underline;
  }
}
```

![The current link has a line under the text](../../static/images/hcm_sitemenu.png)

As stated in [Recommended layout](#recommended-layout), `aria-current="page"` can be used to denote the current page where it matches a menu option.

## Recommended behaviour

Aside from the master toggle button and submenu toggle buttons, the menu simply adopts native linking behaviour. The menu, and each of its submenus, are visible by default and only `hidden` where JavaScript runs. All the menu options are available to users whose browsers have not run the script.

```js
var submenu = btn.nextElementSibling;
submenu.hidden = true;
```

When a submenu toggle button is pressed, its state switches between collapsed (`aria-expanded="false"`) and expanded (`aria-expanded="true"`). Closed submenus are hidden using the `hidden` property, which makes them (temporarily) unavailable to screen reader users, and their links not focusable by keyboard.

As set out in [Recommended layout](#recommended-layout), the layout is achieved such that focus order is not disrupted. Upon encountering a submenu button, activating it will reveal the submenu. The submenu's first item is next in focus order. The user can either close the submenu and move to the next top-level menu item, or <kbd>Tab</kbd> through each of the submenu items and move onto the next top-level menu item.

### `aria-current`

The `aria-current="page"` attribution must be placed on the menu item that corresponds with the current page. If this menu item belongs to a submenu, the script will expand that submenu on page load.

```js
if (submenu.querySelector('[aria-current]')) {
  this.submenuToggle(btn);
}
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

The **Site menu** uses up the full page width, meaning the implementation can only be demonstrated on a separate page:

<cta label="Open in new window" href="../demos/site-menu/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Using Navigation Landmarks — GOV.UK, <https://accessibility.blog.gov.uk/2016/05/27/using-navigation-landmarks/>
[^2]: Hiding Content Has No Effect on Accessible Name or Description Calculation — W3C, <https://w3c.github.io/using-aria/#hiding-content-has-no-effect-on-accessible-name-or-description-calculation>
[^3]: Don't make every `<svg>` focusable by default (issue) — Microsoft, <https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8090208/>
[^4]: Using the `aria-current` attribute — Léonie Watson, <https://tink.uk/using-the-aria-current-attribute/>
[^5]: High Contrast-friendly dropshadow — Devon Persing, <https://codepen.io/dpersing/details/vJERyv>
