---
title: Masthead
summary: The Masthead comprises the global navigation and a banner for the local site
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/masthead
---
<div class="geltags-breakout-box geltags-breakout-box extra-padding">
<h4 class="aside-info-link-elements-for-same-page-navigation"><svg class="geltags-breakout-box__icon geltags-icon geltags-icon--text">
    <use xlink:href="/gel/static/images/gel-icons-core-set.svg#gel-icon-info" style="fill:#404040;"></use>
</svg>Deprecated</h4>

<p>Please note this component has been deprecated and replaced by the <a href="https://bbc.github.io/gel/components/global-navigation/">Global Navigation Component</a></p>

</div>

## Introduction

The **Masthead** is an essential component for each of the pages of any BBC site. In order to be considered robust, it needs to work under a number of different circumstances:

1. **No JavaScript:** The functionality must be available to users whose browsers are not running JavaScript
2. **JavaScript but no `IntersectionObserver`:** The `IntersectionObserver` API is the most efficient way to allot a suitable number of promoted navigation links within the available space. These links must still be available where the browser does not support `IntersectionObserver`.

A number of responsive design and progressive enhancement techniques are employed to make the **Masthead** as inclusive as possible.

## Recommended markup

The **Masthead** is is divided into two main sections: the global navigation and the banner. The global navigation itself comprises of a number of components:

1. The logo
2. The account and notifications controls
3. The promoted links list
4. The 'More' menu
4. The search functionality

All of these components, including the banner, belong to a common `<nav>` element since they can all be considered navigation tools.

1. The logo — _BBC home navigation link_
2. The account and notifications controls — _navigation options for the current user_
3. The promoted links list — _a set of common BBC sites one can navigate between_
4. The 'More' menu - _a more complete set of BBC site navigation items_
5. The search functionality - _locate and navigate to content within the site_
6. The banner - _local site home link_

The `<nav>` itself represents a landmark, and includes a nested landmark in the use of `role="search"` to wrap the search functionality. Each of these is available in aggregated landmark navigation provided by popular screen reader software[^4].

A proxy label is provided using `aria-labelledby` and a hidden proxy element to differentiate this navigation region from the [**Site menu**](../site-menu) region, which is labeled _"This site"_.

```html
<nav class="gel-masthead" aria-labelledby="gel-masthead__label">
  <span id="gel-masthead__label" hidden>BBC sites</span>
  <!-- All masthead functionality -->
</nav>
```

### The subcomponents in order

#### The logo

```html
<div class="gel-masthead__logo">
  <a href="https://bbc.co.uk">
    <span class="gel-sr">BBC homepage</span>
    <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
      <use xlink:href="../../static/images/bbc-logo.svg#bbc-logo"></use>
    </svg>
  </a>
</div>
```

The logo is provided as an inline SVG. This is preferable to a background image, which will be eliminated by some high contrast modes[^1] in some browsers. Its `fill` is set to `currentColor` so that it honors Windows High Contrast Mode text colours. The visually hidden `<span>` reads _"BBC homepage"_ and becomes the parent link's accessible label. The local home page link of the banner (see below) should be differentiated by mentioning the local site's name, for example _"BBC Gel homepage"_.

#### The account link

```html
<div class="gel-masthead__account-option">
  <a href="https://account.bbc.com/account">
    <span class="gel-sr">Your account,</span>
    <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-sign-in"></use>
    </svg>
    <span class="gel-masthead__account-text">Heydon</span>
  </a>
</div>
```

This links to the user's account page. Note there is a parity between visual and non-visual experience across different viewports: At wider viewports, the label includes the user's name. This combines with the visually hidden text _"Your account,"_ to form _"Your account, Heydon"_ as the accessible label (available to screen readers). In smaller viewports, the user's name is removed with `display: none`, truncating the label to _"Your account"_ to screen reader users.

All SVG icons must take `aria-hidden="true"` to hide them from assistive technologies and `focusable="false"` to ensure Microsoft browsers do not erroneously put them in focus order[^2].

#### The notifications/alerts link

```html
<div class="gel-masthead__alerts-option">
  <a role="button" aria-expanded="false" aria-haspopup="true" href="#gel-masthead__alerts">
    <span class="gel-sr">Notifications</span>
    <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-alerts"></use>
    </svg>
  </a>
</div>
```

The alerts link, like the more link below, is an enhanced same-page link that both opens and sends focus to a target element containing more information/options. In the absence of JavaScript, the More menu is open by default and the link simply works as a same-page link. Where JavaScript runs, ARIA attribution is added to reflect that the link behaves as a toggle button, and keeps track of the expanded/collapsed state (`aria-expanded`).

#### Promoted/priority links

```html
<div class="gel-masthead__links">
  <span id="sites-label" hidden>BBC sites</span>
  <ul aria-labelledby="sites-label">
    <li><a href="https://www.bbc.co.uk/news">News</a></li>
    <li><a href="https://www.bbc.co.uk/sport">Sport</a></li>
    <li><a href="https://www.bbc.co.uk/weather">Weather</a></li>
    <li><a href="https://www.bbc.co.uk/iplayer">iPlayer</a></li>
    <li><a href="https://www.bbc.co.uk/sounds">Sounds</a></li>
    <li><a href="https://www.bbc.co.uk/cbbc">CBBC</a></li>
  </ul>
</div>
```

These are the main navigation options, grouped within a list so that screen reader software identifies them as related (and mutually exclusive) and numerates them[^3]. They each pertain to a BBC site, and this is identified by an auxiliary group label provided to the list element via a hidden `<span>`. In the absence of JavaScript, the More menu offers a complete list of links. It's important, therefore, that each of these links is also available in the More menu.

#### The more link

```html
<div class="gel-masthead__more-option">
  <a role="button" aria-expanded="false" aria-haspopup="true" href="#gel-masthead__more">
    <span class="gel-sr">More</span>
    <span class="gel-masthead__more-option-text" aria-hidden="true">
      More ▾
    </span>
    <svg class="gel-masthead__more-option-icon gel-icon gel-icon--text" aria-hidden="true" focusable="false">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-list"></use>
    </svg>
  </a>
</div>
```

The same-page link is enhanced into an ARIA toggle button where JavaScript is available (similar to the **alerts link**, above). Note the two instances of 'More'. The first, hidden visually, persistently offers the accessible label to the link. The second is removed from screen reader output with `aria-hidden="true"` and provides a visible label only where the viewport can offer the space. The 'hamburger' icon replaces the visual text label at narrow viewports.

#### The search link

```html
<div class="gel-masthead__search-option" role="search">
  <a href="https://www.bbc.co.uk/search?q=">
    <span>Search</span>
    <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
      <use xlink:href="path/to/gel-icons-all.svg#gel-icon-search"></use>
    </svg>
  </a>
</div>
```

The search link takes you to the main BBC search page. Note that, despite only containing this link, it is still within a `role="search"` landmark. This way, it is easy for a screen reader user to locate the link via landmark navigation.

#### The more menu

```html
<div id="gel-masthead__more" class="gel-masthead__more-menu gel-masthead__popup">
  <div class="gel-masthead__more-menu-inner">
    <h2 id="more-label" aria-hidden="true" class="gel-masthead__more-menu-label">More</h2>
    <ul aria-labelledby="more-label">
      <li><a href="https://www.bbc.co.uk/news">News</a></li>
      <li><a href="https://www.bbc.co.uk/sport">Sport</a></li>
      <li><a href="https://www.bbc.co.uk/weather">Weather</a></li>
      <li><a href="https://www.bbc.co.uk/iplayer">iPlayer</a></li>
      <li><a href="https://www.bbc.co.uk/sounds">Sounds</a></li>
      <li><a href="https://www.bbc.co.uk/cbbc">CBBC</a></li>
      <li class="gel-masthead-more-account-link">
        <a href="https://account.bbc.com/account">
          <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false">
            <use xlink:href="path/to/gel-icons-all.svg#gel-icon-sign-in"></use>
          </svg>
          Your account
        </a>
      </li>
    </ul>
  </div>
</div>
```

This contains the priority/promoted links and more. The account link is revealed under circumstances where JavaScript has not run, which would mean the links in the bar above are hidden and not available.

Note the `<h2>` heading. This is hidden from assistive technologies but used as a visual label. It becomes the group label for the list via `aria-labelledby`.

#### The notifications element

```html
<div class="gel-masthead__alerts gel-masthead__popup">
  <h2 tabindex="-1" id="gel-masthead__alerts">Notifications</h2>
  <p>No notifications right now. We'll let you know when something from your favourite programmes, artists and
    playlists is available for you.</p>
  <p>If your notifications are turned off, you can always turn them back on. Just go to settings.</p>
</div>
```

The navigation bar's alerts link reveals this element and sends focus to the `<h2>` inside it. For the `<h2>` to be focusable by the component's script, it must take `tabindex="-1"`.

Both this element and the More menu are appended with close buttons so that the user can dismiss them from the interface.

```html
<button class="gel-masthead__close-button"><span class="gel-sr">Close</span>
  <svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false" viewBox="0 0 32 32"> 
    <use xlink:href="path/to/gel-icons-all.svg#gel-icon-no"></use>
  </svg>
</button>
```

#### The banner

```html
<div class="gel-masthead__banner">
  <a href="/" class="gel-masthead__banner-logo">
    <span class="gel-sr">
      Homepage
    </span>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1101.9 202.4">
      <use xlink:href="path/to/logo.svg#logo"></use>
    </svg>
  </a>
</div>
```

The banner contains the logo for the local site. This logo is also the home page link and contains the accessible label _"BBC [local site name] homepage"_.

## Recommended layout

The global navigation bar is responsive by own of three means:

1. The priority/promoted links container has `overflow: hidden` and `IntersectionObserver` hides any links that do not intersect sufficiently with `visibility: hidden`. 
2. Where `IntersectionObserver` is not supported, the priority/promoted links container is set to `overflow-x: auto`. This allows the user to scroll links into view.
3. Where there's no JavaScript, the More menu (containing the priority links and more) is revealed by default and the priority links become hidden. Links within the More menu wrap automatically.

### Icons

The icons are taken from the standard [GEL Iconography library](http://bbc.github.io/gel-iconography/). To ensure they adopt the appropriate colour via `currentColor`, the parent sometimes needs to explicitly inherit the context's `color`

```css
.gel-masthead a,
.gel-masthead button {
  font-size: inherit;
  color: inherit;
}
```

### Scrollable priority links

In the event of `IntersectionObserver` not being supported and the priority links becoming a scrollable region, some embellishments are included to increase affordance.

Firstly, in webkit browsers, the scrollbar is styled. This is an opportunity to make it more in keeping with the brand, but styling it also makes it visible by default on systems where it would otherwise be invisible.

```css
.gel-masthead__links::-webkit-scrollbar {
  height: 0.125rem;
}

.gel-masthead__links::-webkit-scrollbar-track {
  background-color: $gel-color--alto;
}

.gel-masthead__links::-webkit-scrollbar-thumb {
  background-color: $gel-color--cod-gray;
}
```

In addition, a 'shadow' is cast from the more link over the priority links element, better communicating that the links disappear behind it. This style is included only where the priority links have not taken the `gel-masthead__links-observed` class, hence the use of the negation pseudo-class and adjacent combinator.

```css
.gel-masthead__links:not(.gel-masthead__links-observed) + .gel-masthead__more-option::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -6px;
  width: 6px;
  background-color: rgba(0,0,0,0.05);
}
```

Where a user has not ascertained they can scroll the element to reveal more links, the more menu remains available and should contain all of the same options and more.

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. 

![The borders become white and the background colour black](../../static/images/hcm_masthead.png)

Not shown in the image: supplementary outline styles for focus (since the `box-shadow` style is eliminated by Windows HCM):

```css
.gel-masthead__bar a:hover,
.gel-masthead__bar a:focus {
  outline: 2px solid transparent; /* for high contrast mode */
  outline-offset: -4px;
  box-shadow: inset 0 -4px 0 0 currentColor;
}
```

## Recommended behaviour

There are some special considerations for keyboard and screen reader usage that are not covered elsewhere in this document:

### The priority links

The `IntersectionObserver` script gives priority links that are not intersecting the `gel-masthead__link-hidden` class.

```js
if (item.intersectionRatio > 0.98) {
  item.target.classList.remove('gel-masthead__link-hidden');
} else {
  item.target.classList.add('gel-masthead__link-hidden');
}
```

This styles the links with `visibility: hidden`, meaning they are invisible, not acknowledged by screen reader software, and not focusable by keyboard. Only the visible priority links take focus, followed by the more link after them.

Where `IntersectionObserver` is not supported and the priority links container is made scrollable, currently invisible links are brought into view as they are focused. This means no invisible content receives focus, which would have been a WCAG 2.4.3 Focus Order failure[^5]. Touch users can access the invisible links by swiping left and right.

### Same-page links

The account and more links reveal and send focus to target elements. 

```js
menu.link.addEventListener('click', function (e) {
  e.preventDefault();
  menus.forEach(function (otherMenu) {
    if (otherMenu !== menu) {
      otherMenu.target.style.display = 'none';
    }
  });

  var open = menu.target.style.display === 'block' || false;
  menu.target.style.display = open ? 'none' : 'block';
  if (!open) {
    menu.first.focus();
  }
});
```

It's imperative focus is managed like this because interactive elements exist between the links and their targets in the DOM. Simply revealing the elements visually would make the experience tedious for keyboard users and confusing for screen reader users. 

The close buttons appended to each of the target elements not only allow sighted mouse users to dismiss and re-hide the content, but also allow keyboard users to move back directly to the invoking link, bypassing the intermediary interactive elements' tab stops. This is similar to the behaviour expected when closing a dialog element[^6].

```js
closeButton.addEventListener('click', function () {
  menu.target.style.display = 'none';
  menu.link.focus();
});
```

::: info Link elements for same-page navigation
The link element is chosen for the purpose of focus relocation because screen reader users are accustomed to link elements changing their location. Each link's URL points to a `hash` fragment which corresponds to the target element's `id`. Although JavaScript—and not standard sequential navigation—moves focus in this case, URLs beginning with `#` identify the links as 'same-page' links in screen reader software, assuring the user they will not be relocated to a different page.
:::

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<cta label="Open in new window" href="../demos/masthead/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: CSS Background Images & High Contrast Mode — Adrian Roselli, <http://adrianroselli.com/2012/08/css-background-images-high-contrast-mode.html>
[^2]: Managing Focus in SVG — Ally.js, <https://allyjs.io/tutorials/focusing-in-svg.html>
[^3]: Keyboard Shortcuts For JAWS — WebAIM, <https://webaim.org/resources/shortcuts/jaws#headings>
[^4]: ARIA Form Role — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Form_Role>
[^5]: WCAG 2.1 2.4.2 Focus Order, <https://www.w3.org/TR/WCAG21/#focus-order>
[^6]: ARIA Authoring Practices: Dialog Keyboard Interaction — W3, <https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-6>

