---
layout:  _site/templates/layout-index.njk
title: GEL Technical Documentation
summary: Guidance for developers building accessible websites based on BBC GEL
version: 0.1.0
linkback: http://www.bbc.co.uk/gel
---

## Foundations

[Focus](foundations/focus/)
: Indicating and managing focus is integral to keyboard accessibility

[Grids](foundations/grids/)
: Visual layout should be efficient and consistent, without impeding document structure and accessibility

[Headings](foundations/headings/)
: Headings provide a semantic and visual hierarchical structure to a document

[Iconography](foundations/iconography/)
: Iconography aids communication, but should not take precedence over text

[Routing](foundations/routing/)
: Route changes in single-page applications need to emulate the conventions of page loads

[Typography](foundations/typography/)
: Inclusive content must be readable, and for it to be readable it must first be legible

## Components

[Accordions](components/accordions/)
: The accordion consists of a number of collapsed sections, each with a button to expand that section's content

[Action dialogs](components/action-dialogs/)
: Action dialogs are presented where the user must choose a course of action

[Breakout boxes](components/breakout-boxes/)
: Breakout Boxes interject supplementary content within the flow of a document

[Buttons and CTAs](components/buttons-and-ctas/)
: The design of clickable controls must be consistent with their behaviour

[Cards](components/cards/)
: Cards let you preview and share content quickly, without having to leave the page you're on

[Carousels](components/carousels/)
: A Carousel is a way to browse lots of content in a limited amount of vertical space, by scrolling a window onto that content

[Comments](components/comments/)
: The ability to engage with content must be inclusive. Everyone should be able to have their say

[Data tables](components/data-tables/)
: Tabular data must be presented with a sound semantic and visual structure

[External links](components/external-links/)
: External links direct people outside of the BBC domain; a behaviour that must be indicated to all users

[Filter and sort](components/filter-and-sort/)
: Filters help the user find what they’re looking for. Allowing the user to refine content by selecting criteria that’s relevant to their needs

[Form fields and validation](components/form-fields/)
: Form fields must be accessible and usable, helping the user to provide valid input

[Infographics](components/infographics/)
: Infographics should be informative, engaging, and accessible

[Information Panel](components/info-panels/)
: The information panel is a specialized popup panel for supplementary content and functionality

[Global Navigation](components/global-navigation/)
: The global navigation is a component of the masthead, which additionally contains the cookie banner and advertisements.

[Metadata strips](components/metadata-strips/)
: The metadata strip defines key metadata for an item of content, in a compact form

[Pagination](components/load-more/)
: Loading content must be a smooth experience and under the user's direct control

[Pockets](components/pockets/)
: The Pocket pattern allows the user to reveal longform content at their discretion

[Promos](components/promos/)
: A promo is a snippet of content which links to a full piece of content elsewhere on the BBC site or app

[Search](components/search/)
: The global and local search components each include

[Share Tools](components/share-tools/)
: Share tools offer unobtrusive options to share BBC content on social media

[Site Menu](components/site-menu/)
: The Site menu is the navigation region for the local site, and can contain two tiers of navigation options

[Tabs](components/tabs/)
: Tabs make it easy to view and navigate stacked panels of related content

[Video controls](components/video-controls/)
: Custom HTML5 video functionality must be accessible and intuitive

## About this site

The BBC Global Experience Language (GEL) Technical Guides are a series of framework-agnostic, code-centric recommendations and examples for building [GEL design patterns](http://www.bbc.co.uk/gel/) in websites. They illustrate how to create websites that comply with all BBC guidelines and industry best practice, giving special emphasis to the [BBC Accessibility Guidelines](https://www.bbc.co.uk/accessibility/forproducts/) for websites.

Our guides are for BBC developers following the BBC GEL design patterns, including all BBC employees, contractors and suppliers. However they are publicly available for anyone who may be interested in how the BBC recommends building websites.

You can use these guides under an Open Government Licence for Public Sector Information. Details can be found on [the National Archives website](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

The examples in each guide are for reference only and are not intended to be used as a library.

## Coding conventions

Our guides make recommendations about the markup (HTML), layout (CSS), and behaviour (JS) of your GEL implementations. It is otherwise technology agnostic.

However, the reference implementations inside our guides adhere to certain principles and conventions. If you are intending to contribute working code to this project, please be mindful of these.

### ES5

All reference implementations are written in ES5. The intention is for the code to be as widely understood, and as easily adopted for creating test cases as possible. In a few cases, small polyfills are included. These are added to the implementation's demo page inside the `init` function.

### Progressive enhancement

Our guides eschew larger polyfills and compatibility libraries, opting to use feature detection. In JavaScript this might mean wrapping functionality in an `if` block.

```js
if ('IntersectionObserver' in window) {
  // Do something with the IntersectionObserver API
}
```

In CSS, a basic layout is put in place then enhanced with modern layout modules like CSS Grid inside `@supports` blocks:

```css
.grid > * + * {
  margin-top: 1rem;
}

@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(266px, 1fr));
    grid-gap: 1rem;
  }

  .grid > * + * {
    margin: 0; /* undo, since `grid-gap` supercedes it */
  }
}
```

### Namespacing

Components are identified in their markup using classes and the `gel-component` structure. For example, the **Site menu** pattern uses `class="gel-sitemenu"` on the parent element, and `gel-sitemenu-more` to identify each (hidden by default) submenu.

Component scripts are attached to the `gel` namespace, like `gel.ComponentName`.

### Constructor pattern

Each reference implementation that depends on JavaScript uses a basic constructor pattern to instantiate the working component. For example, the simple toggle switch constructor looks like this:

```js
  self.constructor = function (button) {
    this.button = button;
    // The 'on/off' text is provided in an aria-hidden <span>
    this.onOffSpan = this.button.querySelector('[aria-hidden]');

    // Set aria-pressed to false if the attribute is absent
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', currentState);
    // Set the span's text to match the state
    this.onOffSpan.textContent = currentState ? 'on' : 'off';

    // Bind to the toggle method
    this.button.addEventListener('click', this.toggle.bind(this));
  }

  // The toggle method
  self.constructor.prototype.toggle = function () {
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', !currentState);
    this.onOffSpan.textContent = currentState ? 'off' : 'on';
  }
```

Note that the `toggle` function is exposed as a public method, in case the switch needs to be toggled programmatically.

Initialization inside the component's demo page looks like this:

```js
var switchElem = document.querySelector('.gel-button-switch');
var switchButton = new gel.Switch.constructor(switchElem);
```

## Related

Did you know we created a related project for Testers? We have translated most of our technical documentation in [ACT-formatted test scripts](https://github.com/bbc/gel-test-docs/tree/master/act).

## Questions?

This project is currently being overseen by the BBC Accessibility Team. If you have access to our corporate Slack channel pop in and say hi. We welcome questions and suggestions posted to [this project's GitHub issue tracker](https://github.com/bbc/gel).

