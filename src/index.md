---
layout: layout-index.njk
title: Home
summary: Guidance for developers building accessible websites based on BBC GEL.
version: 0.1.0
linkback: http://www.bbc.co.uk/gel
---

## What GEF is

GEF (the BBC's Global Experience Framework) supports developers who write code to build components documented in GEL (the BBC's Global Experience Language). GEF seeks to explain and demonstrate how to develop working web components that follow all relevant BBC standards, guidelines and best-practice.

Specifically GEF has been written with the following three concerns embedded throughout:

* **Accessibility:** The BBC and its content is for everyone. Everything in GEF is written with inclusion in mind, drawing from the accessibility community's wealth of knowledge and experience. Accessibility is not a feature of GEF, but a trait.
* **Standards:** GEF is deferential to web standards, and the groundwork laid by the W3C's specifications and guidelines — as well as the BBC's own _Mobile Accessibility Guidelines_ and all applicable _BBC Standards and Guidelines_. GEF embraces convention, and does not fix anything unbroken.
* **Research:** Some aspects of standards, conventions, and other kinds of prior art may be called into question in light of research and testing data. Where research points to the need for innovation, GEF will break that new ground.
 
We understand that standards, guidelines and best-practices evolve according to changes in web technologies and accumulated user research and so we invites everyone to join the conversation: we are stronger when we build and grow together.
 
## What GEF isn't

GEF is not a pattern library; it is not intended to be plugged into your interface directly. For that to be possible, it would have to dictate your environment, stack and workflow. 

GEF appreciates that different teams across the BBC work in different ways, with different coding styles and frameworks. Accordingly, GEF offers recommendations for what needs to be achieved, but not _how_ to achieve it or with which tools.

For example, one GEF guide might explain the need for a state change using `aria-pressed` to make it accessible. The documentation will show why that state change is needed, how it is communicated in assistive technologies and even offer a 'reference implementation' demonstrating it in action. But it will not assume you will implement that state change using Vue.js, React, a native web component, or any other 'flavour' of frontend technology. That is left up to you and your team.

## Coding conventions

GEF makes recommendations about the markup (HTML), layout (CSS), and behaviour (JS) of your GEL implementations. It is otherwise technology agnostic (see [What GEF isn't](#what-gef-isnt)).

However, the reference implementations inside GEF adhere to certain principles and conventions. If you are intending to contribute working code to GEF, please be mindful of these.

### ES5

All reference implementations are written in ES5. The intention is for the code to be as widely understood, and as easily adopted for creating test cases as possible. In a few cases, small polyfills are included. These are added to the implementation's demo page inside the `init` function.

### Progressive enhancement

GEF eschews larger polyfills and compatibility libraries, opting to use feature detection. In JavaScript this might mean wrapping functionality in an `if` block.

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

Components are identified in their markup using classes and the `gef-component` structure. For example, the **Site menu** pattern uses `class="gef-sitemenu"` on the parent element, and `gef-sitemenu-more` to identify each (hidden by default) submenu.

Component scripts are attached to the `gef` namespace, like `gef.ComponentName`.

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

Initialization inside the component's GEF demo page looks like this:

```js
var switchElem = document.querySelector('.gef-button-switch');
var switchButton = new gef.Switch.constructor(switchElem);
```

## What's here?

We are working our way through a list based closely on what's already published in [the BBC GEL Guidelines](http://www.bbc.co.uk/gel/). You should generally start there when seeking to understand any documented pattern but at the point where you're wondering about which HTML tags and CSS layout techniques to use we're here for you!

### Foundations

| Foundation | Status |
|-----------|--------|
| [Grids]({{site.basedir}}foundations/grids/) | Draft / Pending|
| [Headings]({{site.basedir}}foundations/headings/) | Draft / Pending|
| [Icons]({{site.basedir}}foundations/iconography/) | Draft / Pending|
| [Routing]({{site.basedir}}foundations/routing/) | Draft / Pending|
| [Typography]({{site.basedir}}foundations/typography/) | Draft / Pending|

### Components

| Component | Status |
|-----------|--------|
| [Accordions]({{site.basedir}}components/accordions/) | Draft / Pending|
| [Action dialogs]({{site.basedir}}components/action-dialogs/) | Draft / Pending|
| [Breakout boxes]({{site.basedir}}components/breakout-boxes/) | Draft / Pending|
| [Buttons and CTAs]({{site.basedir}}components/buttons-and-ctas/) | Draft / Pending|
| [Cards]({{site.basedir}}components/cards/) | Draft / Pending|
| [Carousels]({{site.basedir}}components/carousels/) | Draft / Pending|
| [External links]({{site.basedir}}components/external-links/) | Draft / Pending|
| [Metadata strips]({{site.basedir}}components/metadata-strips/) | Draft / Pending|
| [Headings]({{site.basedir}}components/headings/) | Draft / Pending|
| [Promos]({{site.basedir}}components/promos/) | Draft / Pending|
| [Tabs]({{site.basedir}}components/tabs/) | Draft / Pending|
| [Form fields and validation]({{site.basedir}}components/form-fields/) | Draft / Pending|
| [Video controls]({{site.basedir}}components/video-controls/) | Draft / Pending|
| [Pocket]({{site.basedir}}components/pockets/) | Draft / Pending|
| [Pagination]({{site.basedir}}components/load-more/) | Draft / Pending|
| [Information Panel]({{site.basedir}}components/info-panels/) | Draft / Pending|
| [Share Tools]({{site.basedir}}components/share-tools/) | Draft / Pending|
| [Site Menu]({{site.basedir}}components/site-menu/) | Draft / Pending|

## Questions?

This project is currently being overseen by the BBC Accessibility Team, managed by Gareth Ford Williams. If you have access to our corporate Slack channel pop in and say hi. We welcome questions and suggestions posted to the GEF Docs GitHub issue tracker.

