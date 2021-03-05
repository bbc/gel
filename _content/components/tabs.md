---
title: Tabs
summary: Tabs make it easy to view and navigate stacked panels of related content 
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/tabs
---

## Introduction

Tabbed interfaces, like accordions, allow users to view long-form content one section at a time. Clearly labelled tabs representing the individual sections make it easy for users to identify and reveal the content pertinent to them.

Use tabs where the subject sections are not too numerous (no more than four or five tabs in total) and the tab labels are not lengthy. Tab content should be self-sufficient: do not force users to switch back and forth between tabs to complete tasks[^1]. Where more than five sections/labels are present, or the tab labels are lengthy, an [**Accordion**](../accordions) pattern is preferred.

::: alert Divergence from authoring practices
The GEL tabs implementation diverges from the ARIA Authoring Practices specification[^2] in behaviour. This is to address usability issues found in both internal and external research[^3] with ARIA tab interfaces. See [Related research](#related-research).
:::

## Recommended markup

### Initial markup

Where server-side rendering and progressive enhancement are possible, follow this pattern for authoring your tab interface. Where JavaScript runs, this table-of-contents (linking to the subsequent content sections) will be enhanced with ARIA attribution.

```html
<div class="gel-tabs">
  <ul>
    <li>
      <a href="#section1">Section 1</a>
    </li>
    <li>
      <a href="#section2">Section 2</a>
    </li>
    <li>
      <a href="#section3">Section 3</a>
    </li>
  </ul>
  <section id="section1" tabindex="-1">
    <h2>Section 1</h2>
    <p>Content for section 1.</p>
  </section>
  <section id="section2" tabindex="-1">
    <h2>Section 2</h2>
    <p>Content for section 2.</p>
  </section>
  <section id="section3" tabindex="-1">
    <h2>Section 3</h2>
    <p>Content for section 3.</p>
  </section>
</div>
```

#### Notes

* **`<ul>`:** The `<ul>` groups the same-page links together and enumerates them in screen reader output.
* **links:** Each link's `href` corresponds to a `<section>` `id`. This capitalizes on standard browser behaviour to allow the user to navigate to the `<section>`s without having to depend on JavaScript.
* **`<section>`**: Some screen readers allow users to navigate between `<section>` ('region') directly, by providing shortcuts. However, it is recommended each `<section>` is also introduced by a heading, since heading shortcuts are a more longstanding mode of navigation.
* **tabindex="-1":** Each `<section>` takes `tabindex="-1"`. This forces browsers to move focus to the target element / hash fragment when activating a same-page link [^4].

### Enhanced markup

```html
<div class="gel-tabs">
  <ul role="tablist">
    <li role="presentation">
      <a role="tab" id="tab-section1" href="#section1" aria-selected="true">Section 1</a>
    </li>
    <li role="presentation">
      <a role="tab" id="tab-section2" href="#section2" aria-selected="false">Section 2</a>
    </li>
    <li role="presentation">
      <a role="tab" id="tab-section3" href="#section3" aria-selected="false">Section 3</a>
    </li>
  </ul>
  <section role="tabpanel" id="section1" aria-labelledby="tab-section1" tabindex="-1">
    <h2>Section 1</h2>
    <p>Content for section 1.</p>
  </section>
  <section role="tabpanel" id="section2" aria-labelledby="tab-section2" tabindex="-1" hidden>
    <h2>Section 2</h2>
    <p>Content for section 2.</p>
  </section>
  <section role="tabpanel" id="section3" aria-labelledby="tab-section3" tabindex="-1" hidden>
    <h2>Section 3</h2>
    <p>Content for section 3.</p>
  </section>
</div>
```

#### Notes

* **`role="tablist"`, `role="tab"`, and `role="tabpanel"`:** When JavaScript runs, the tab interface acquires the requisite semantics to be communicated as a tab interface in assistive technology software.
* **`role="presentation"`:** With `role="tablist"` and `role="tab"` in place, tabs are announced correctly as _"tabs"_ and enumerated. The list semantics is therefore redundant, and `role="presentation"` is used to suppress it[^5].
* **`aria-labelledby`:** The tab panels (`<section>`s with `role="tabpanel"`) are labelled by their tabs, so that when a user focuses or enters them, they are assured of their identity and relationship to the interface as a whole. Most screen readers will announce something similar to _"tab panel, section 1"_ when the panel is focused or entered.
* **`aria-selected="true"` and `hidden`:** The state attribute identifies the tab corresponding to the open/selected panel. All other panels are removed from display (and screen reader output) using the `hidden` property.

## Recommended layout

The [main GEL page](https://www.bbc.co.uk/gel/guidelines/tabs) covers visual design considerations in detail. 

Where JavaScript does not run, the tabs appear as links within what resembles a table of contents. Each `<section>` is visible at all times, and activating a link (a would-be tab) moves focus to the corresponding section, revealing its focus style. A clear, solid outline style is recommended.

```css
.gel-tabs > ul a:focus,
.gel-tabs > section:focus {
  outline: 2px solid;
  outline-offset: -2px;
}
```

Where JavaScript runs, the links appear as tabs, and are placed side-by-side. Shortened labels are preferred to wrapped text, so `white-space: nowrap` and `text-overflow: ellipsis` are applied by default. Note that this only works where `min-width: 0` is applied to the flex child (the `<li>`).

```css
.gel-tabs > ul li {
  min-width: 0;
}

.gel-tabs > ul a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

However, this can easily result in illegible labels for very narrow viewports. It is recommended you create a breakpoint based on the content at which to reconfigure the tabs into a single column. This might be implemented something like the following:

```css
@media (max-width: 400px) {
  .gel-tabs > ul {
    flex-wrap: wrap;
  }

  .gel-tabs > ul li {
    flex-basis: 100%;
    margin: 0;
    margin-bottom: 0.25rem;
  }
}
```

### High contrast mode

Where Windows High Contrast Mode is active, the backgrounds that mark out the tabs and panels are eliminated. Accordingly, supplementary borders are added. These are set to `transparent` and will be invisible unless Windows HCM is running. 

```css
.gel-tabs > section {
  border: 2px solid transparent; /* for high contrast mode */
}
```

In addition, an `@media` query detecting high contrast mode[^7] is used to create an alternative `aria-current` style for the selected tab. It is positioned `2px` down from its natural position. This obscures the line between the tab and panel, making them appear as one.

```css
@media (-ms-high-contrast: active) {
  .gel-tabs [aria-current] {
    position: relative;
    top: 2px;
  }
}
```

![Borders define the tabs and panels](../../static/images/hcm_tabs.png)


## Recommended behaviour

### Without JavaScript

The links and `<section>`s are communicated as such in screen reader output and the interface behaves like an interactive table of contents. As described in [Recommended layout](#recommended-layout), `<section>`s (would-be tab panels) are each visible at all times and receive focus (revealing their focus styles) when their corresponding link is activated.

### With JavaScript

#### Selecting a tab

By mouse or touch, clicking or pressing a tab will reveal its corresponding tab panel. For keyboard users, unselected tabs are focusable and can be activated with the <kbd>Enter</kbd> and <kbd>Space</kbd> keys. Note, if your tab panel heading is visually hidden, it's important to keep the tabs in view after selecting a tab and revealing it's corresponding tab panel, as the selected tab acts as visual heading for the tab panel below. This was a finding from the BBC News research that took place during the development of this tabs implementation. This can be achieved via Javascript, by not scrolling the page on tab activation.

To preserve the behaviour of the same-page links upon which the tabs are created and to address trouble screen reader users have been observed experiencing moving from the tab to the tab panel, clicking a tab programmatically moves focus to the visible tab panel. The tab panel is identified in screen readers as a tab panel, and the tab panel's label (borrowed from the corresponding tab using `aria-labelledby`) is also announced. 

The tab panel is now the sequential focus starting point, making the first interactive element inside (or past) the tab panel next in focus order. However, the tab panel itself is not user focusable (it employs `tabindex="-1"`, not `tabindex="0"`), meaning <kbd>Shift</kbd> + <kbd>Tab</kbd> will take the user directly back to the tab list. Screen readers' 'virtual cursor'[^6] behaviour is not augmented or overridden in any way. Note, non-interactive user-focusable elements (elements with `tabindex="0"`) are usually considered a violation of **WCAG2.1 2.4.3 Focus Order**[^8].

#### Back button support

Since the interface is driven by the `hashchange` events elicited by clicking the tab link elements, the back button is supported. Pressing the back button will take you to the previously opened tab if there was one.

```js
window.addEventListener('hashchange', function (e) {
  var selected = tablist.querySelector('[aria-current]');
  var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
  switchTab(oldIndex, tabInfo());
}, false);
```

Whenever the hash changes to something _not_ corresponding to a tab, the first tab panel is shown but not focused (since it is not the document fragment requested by the user at this point in time).

### Page load

The tabs are permitted to continue updating the document's `hash` as tabs are selected, preserving the behaviour of same-page links. When the document first loads, if the URL hash corresponds to a tab panel, that tab panel is shown by default. If there is no hash component to the URL, or the hash does not match a tab panel's `id`, the first tab panel is shown and the first tab selected.

The following code is a snippet from the reference implementation.

```js
window.addEventListener('DOMContentLoaded', function () {
  switchTab(undefined, tabInfo());
});
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/tabs.html">

<cta label="Open in new window" href="../demos/tabs/">

## Related research

During the development of the tabs implementation, BBC News undertook research and hosted two days of usability testing with a number of keyboard-only participants, including blind and partially sighted participants.

These participants were presented with three variations of the tab interface. Version 1 implemented all of the recommended semantics and behaviours of the [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) guide, including tabs only being focusable/selectable by the left or right arrow key when focus is on a tab element. Version 2 constituted a compromise position: tab semantics were implemented but the interface behaved as a table of contents (moving focus to panels on tab activation). Version 3 appeared as a tab interface but retained the semantics and behaviour of an interactive table of contents (see [Initial markup](#initial-markup)).

The majority of participants were uncomfortable with the same-page link (interactive table of contents) pattern (version 3) as this did not correctly describe the content. Arrow key (left or right) navigation was either not discovered by participants, or interfered with the expected behaviour of browsing by arrow key (up or down) using their screen reader's virtual cursor (due to this behaviour been overridden). The concept of 'tabs' as a semantic grouping mechanism was more popular than same page links.

Accordingly, the implementation described here follows that of version 2, and degrades to an interactive table of contents where JavaScript does not run.

### Further reading, elsewhere on the Web

[^1]: Tabs, Used Right — Nielsen Norman Group, <https://www.nngroup.com/articles/tabs-used-right/>
[^2]: Tabs: ARIA Authoring Practices, <https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel>
[^3]: Danger! ARIA Tabs — Simply Accessible, <https://simplyaccessible.com/article/danger-aria-tabs/>
[^4]: In-Page Links and Input Focus — Accessible Culture, <http://accessibleculture.org/articles/2010/05/in-page-links/>
[^5]: Removing Semantics Using The Presentation Role — Accessibility Developer Guide, <https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/presentation/>
[^6]: Reading Commands and Cursors — Freedom Scientific, <https://doccenter.freedomscientific.com/doccenter/doccenter/rs11f929e9c511/2012-04-24_teachersandtrainers-l7/02_jawsandmagicreadingcommandsandcursors.htm>
[^7]: `-ms-high-contrast` @media query — MDN, <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-ms-high-contrast>
[^8]: WCAG2.1 2.4.3 Focus Order — W3C, <https://www.w3.org/TR/WCAG21/#focus-order>