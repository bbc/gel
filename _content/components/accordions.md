---
title: Accordions
summary: The accordion consists of a number of collapsed sections, each with a button to expand that section's content
version: 0.1.0
published: true
linkback: https://www.bbc.co.uk/gel/guidelines/accordion
---

## Introduction

**Accordions** serves a similar purpose to **Tabs**: they collapse content into an interactive overview of itself.

Arguably, the interaction paradigm of the accordion is simpler than a standard tab interface[^1] since it does not rely on either programmatic focus management or arrow key navigation. Instead, each button precedes each closed 'drawer' in the source. Keyboard and screen reader browsing is a case of simply pressing the button (or 'handle') and moving directly into the revealed content (the open 'drawer').

Accordions are also a better solution in terms of responsive design: their visual structure is not dependent on elements ('tabs') appearing in a horizontal line. Some tab interfaces are designed to collapse into an accordion-like visual structure, with one tab per line. This is problematic since it makes the tab interface appear, but not behave, like an accordion.

## Recommended markup

The [Reference implementation](#reference-implementation) is designed to accept different types of content and enhance it into an accordion. Depending on the context and quantity of your content, the semantics of the markup should differ.

For example, content that represents the major sections of a page's content might be marked up with `<section>`s and headings:

```html
<h1>Main heading of page</h1>
<section>
	<h2>Section 1</h2>
	<p>Some text...</p>
	<img src="http://www.example.com/path/to/image" alt="description">
	<p>Some more text...</p>
</section>
<section>
	<h2>Section 2</h2>
	<p>Some text here...</p>
	<p>Additional text...</p>
</section>
<section>
	<h2>Section 3</h2>
	<img src="http://www.example.com/path/to/image" alt="another description">
	<blockquote>A quotation from somewhere</blockquote>
</section>
```

Wrapping this set of `<section>`s in a `class="gel-accordion"` element produces the following enhanced markup when the JavaScript runs:

```html
<h1>Main heading of page</h1>
<div class="gel-accordion">
	<section>
		<h2 class="gel-accordion__handle">
			<button aria-expanded="false" type="button">
				<span>Section 1</span>
				<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
				<path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>
			</button>
		</h2>
		<div class="gel-accordion__drawer" hidden>
			<p>Some text...</p><img src="http://www.example.com/path/to/image" alt="description">
			<p>Some more text...</p>
		</div>
	</section>
	<section>
		<h2 class="gel-accordion__handle">
			<button aria-expanded="false" type="button">
				<span>Section 2</span>
				<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
				<path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>
			</button>
		</h2>
		<div class="gel-accordion__drawer" hidden>
			<p>Some text here...</p>
			<p>Additional text...</p>
		</div>
	</section>
	<section>
		<h2 class="gel-accordion__handle">
			<button aria-expanded="false" type="button">
				<span>Section 3</span>
				<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
				<path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>
			</button>
		</h2>
		<div class="gel-accordion__drawer" hidden>
			<img src="http://www.example.com/path/to/image" alt="another description">
			<blockquote>A quotation from somewhere</blockquote>
		</div>
	</section>
</div>
```

* `class="gel-accordion__drawer"` and `hidden`: All the content except the 'handle' is grouped inside this element so its visibility can be toggled easily. The drawer is hidden by default.
* `<button>` and `aria-expanded`: The visibility of the drawer (see above) is affected by the toggle button. The `aria-expanded` state is set to either `false` (drawer closed; default on page load) or `true` (drawer open)
* `SVG`: An SVG based on the [GEL Iconography `gel-icon-down`](http://bbc.github.io/gel-iconography/). This has `focusable="false"` to remove it from focus order, and `aria-hidden="true"` to hide it from browsers/assistive technologies that erroneously expose it.

::: info Avoid overriding ARIA roles
The `<button>` is inserted inside the 'handle' rather than _becoming_ the handle. Some implementations turn the handle element into a button using `role="button"`. However, this would override the heading's implicit heading role (only elements with the heading role are exposed as headings to screen readers). See the Second Rule Of ARIA Use: _Do not change native semantics, unless you really have to_[^2].

By nesting the button inside the heading the user benefits from the semantics and behaviours of both elements.
:::

### Short form content

More concise content, such as questions with one or two sentence answers, would be better marked up as a list. The `<ul>` would take the `gel-accordion` class. 

```html
<ul class="gel-accordion">
	<li>
		<p><strong>Question 1<strong></p>
		<p>Answer 1</p>
	</li>
	<li>
		<p><strong>Question 2<strong></p>
		<p>Answer 2</p>
	</li>
	<li>
		<p><strong>Question 3<strong></p>
		<p>Answer 3</p>
	</li>
</ul>
```

Whether section and heading or list semantics are suitable, there are certain structural rules for the progressive enhancement to take place successfully using the [Reference implementation](#reference-implementation) script:

* **Accordion** items must be wrapped in a common `gel-accordion` element
* Each item must have at least two elements
* The first element must not be a `<button>` (since its own contents will become wrapped in a `<button>`)

```js
if (section.handle.nodeName === 'BUTTON') {
	console.error('The first child of each accordion element must not be a <button>');
	return;
}
```

## Recommended layout

The visual design of a generic accordion is specified in the [GEL Accordion documentation](https://www.bbc.co.uk/gel/guidelines/accordion).

The `gel-icon-down` arrow must point downwards in the closed (`aria-expanded="false"`) state, and upwards in the open (`aria-expanded="true"`) state. For the sake of code brevity, this is achieved in the [Reference implementation](#reference-implementation) using a simple CSS transform.

```css
.gel-accordion__handle [aria-expanded="true"] svg {
  transform: rotate(180deg);
}
```

The text appears on the left of the button and the SVG on the right (thanks to `justify-content: space-between`). Some margin is added to the left of the SVG to separate it from the button's text. The `flex-shrink: 0` declaration prevents the SVG from erroneously becoming proportionately narrower when the total space is diminished.

```css
.gel-accordion__handle button {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.gel-accordion__handle svg {
  margin-left: 0.5rem;
  flex-shrink: 0;
}
```

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active:

![Borders help demarcate the accordion where high contrast mode is running](../../static/images/hcm_accordions.png)

## Recommended behaviour

An accordion designed with progressive enhancement offers pre-rendered structured content, expanded and available by default where JavaScript is not available. The [Reference implementation](#reference-implementation) wraps and hides each accordion item's content, and provides a button to each item for toggling the expanded/collapsed state.

The virtue of accordion interaction is in its simplicity. As someone browses the page, instead of encountering lots of content through which they have to scroll, they encounter buttons to reveal content. If a button's label piques their interest, they can press the handle/button to reveal the content (secreted in a 'drawer' below that button).

Each button simply toggles the display (and availability to assistive technologies) of its associated content (the 'drawer'). The toggle button's state is communicated to screen readers with `aria-expanded`[^4]. This is how it is implemented in the [Reference implementation](#reference-implementation):

```js
// The open method
self.constructor.prototype.open = function (section) {
	section.button.setAttribute('aria-expanded', 'true');
	section.drawer.hidden = false;
}

// The close method
self.constructor.prototype.close = function (section) {
	section.button.setAttribute('aria-expanded', 'false');
	section.drawer.hidden = true;
}
```

Each accordion item's handle immediately precedes its drawer. In the open/expanded state this makes it trivial and intuitive for the user to 'reach' the drawer's content. Some implementations include `aria-controls` to reference the controlled (drawer) element. Thanks to the proximate source order this is not necessary. Be aware that `aria-controls` is only supported in JAWS at the time of writing[^5].

The reference implementation includes two further methods: `openAll` and `closeAll`. These allow you to implement buttons for opening or closing every accordion item simultaneously.

```js
// Support for opening all the drawers at once
var openAllButton = document.getElementById('openAll');
openAllButton.addEventListener('click', function () {
	accordion.openAll();
});

// Support for closing all the drawers at once
var closeAllButton = document.getElementById('closeAll');
closeAllButton.addEventListener('click', function () {
	accordion.closeAll();
});
```

The `closeAll` functionality can be particularly useful for people who have opened a number of items one after the other, and are subsequently finding it easy to get lost among the expanded content.

::: alert Automatic collapsing of items
It is not recommended that expanding one accordion item results in collapsing another. If a user has opened an item, it is assumed they want it to remain open. It is possible they wish to refer between two or more open items. Always place the user in control and do not make assumptions about their needs[^6].
:::

### Page fragments

Sometimes it's beneficial to identify page sections with `id`s, so that links to those specific page fragments can be shared. The following implementation ensures that JavaScript enhancement does not break this basic browser behaviour. 

On both the `DOMContentLoaded` and `hashchange` events, if an accordion item—or any element inside an accordion item—has the `id` that matches the page's hash, that item is entered into its open state and it (or the matching element it contains) is focused.

```js
this.hashHandle = function () {
	var id = window.location.hash.substring(1);
	var target = document.getElementById(id);
	this.sections.forEach(function (section) {
		if (section.elem.contains(target)) {
			this.open(section);
			target.tabIndex = -1;
			target.focus();
		}
	}.bind(this));
}
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/accordions.html">

<cta label="Open in new window" href="../demos/accordions/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Tabs — ARIA Authoring Practices, <https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel>
[^2]: The Second Rule Of ARIA Use — W3C, <https://www.w3.org/TR/using-aria/#second>
[^3]: `@supports` — MDN, <https://developer.mozilla.org/en-US/docs/Web/CSS/@supports>
[^4]: `aria-expanded` (state) — W3C, <https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-expanded>
[^5]: `aria-controls` Is Poop — heydonworks.com, <http://www.heydonworks.com/article/aria-controls-is-poop>
[^6]: Give Control — Inclusive Design Principles,  <https://inclusivedesignprinciples.org/#give-control>