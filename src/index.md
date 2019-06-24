---
layout: layout-index.njk
title: Home
summary: Guidance for developers building accessible websites based on BBC GEL.
version: 0.1.0
linkback: http://www.bbc.co.uk/gel
---


## What's here?

We are working our way through a list based closely on what's already published in [the BBC GEL Guidelines](http://www.bbc.co.uk/gel/). You should generally start there when seeking to understand any documented pattern but at the point where you're wondering about which HTML tags and CSS layout techniques to use we're here for you!

### Foundations

| Foundation Title | Status |
|-----------|--------|
| [Grids]({{site.basedir}}foundations/grids/) | Draft|
| [Headings]({{site.basedir}}foundations/headings/) | Draft|
| [Icons]({{site.basedir}}foundations/iconography/) | Draft|
| [Routing]({{site.basedir}}foundations/routing/) | Draft|
| [Typography]({{site.basedir}}foundations/typography/) | Draft|

### Components

| Component Title | Status |
|-----------|--------|
| [Accordions]({{site.basedir}}components/accordions/) | Draft|
| [Action dialogs]({{site.basedir}}components/action-dialogs/) | Draft|
| [Breakout boxes]({{site.basedir}}components/breakout-boxes/) | Draft|
| [Buttons and CTAs]({{site.basedir}}components/buttons-and-ctas/) | Draft|
| [Cards]({{site.basedir}}components/cards/) | Draft|
| [Carousels]({{site.basedir}}components/carousels/) | Draft|
| [Data tables]({{site.basedir}}components/data-tables/) | Draft|
| [External links]({{site.basedir}}components/external-links/) | Draft|
| [Form fields and validation]({{site.basedir}}components/form-fields/) | Draft|
| [Infographics]({{site.basedir}}components/infographics/) | Draft|
| [Information Panel]({{site.basedir}}components/info-panels/) | Draft|
| [Metadata strips]({{site.basedir}}components/metadata-strips/) | Draft|
| [Promos]({{site.basedir}}components/promos/) | Draft|
| [Pagination]({{site.basedir}}components/load-more/) | Draft|
| [Pocket]({{site.basedir}}components/pockets/) | Draft|
| [Share Tools]({{site.basedir}}components/share-tools/) | Draft|
| [Site Menu]({{site.basedir}}components/site-menu/) | Draft|
| [Search]({{site.basedir}}components/search/) | Draft|
| [Tabs]({{site.basedir}}components/tabs/) | Draft|
| [Video controls]({{site.basedir}}components/video-controls/) | Draft|


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

### Name spacing

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

## Questions?

This project is currently being overseen by the BBC Accessibility Team, managed by Gareth Ford Williams. If you have access to our corporate Slack channel pop in and say hi. We welcome questions and suggestions posted to this project's GitHub issue tracker.

