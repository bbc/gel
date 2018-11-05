---
title: Tabs
summary: Tabs make it easy to view and navigate stacked panels of related content. 
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/tabs
---

## Introduction

Tabbed interfaces, like accordions, allow users to view long-form content one section at a time. Clearly labeled tabs representing the individual sections make it easy for users to identify and reveal the content pertinent to them.

Use tabs where the subject sections are not too numerous (more than four tabs in total) and the tab labels are not lengthy. Tab content should be self-sufficient: do not force users to switch back and forth between tabs to complete tasks[^1].

::: alert Divergence from authoring practices
The GEL tabs implementation diverges from the ARIA Authoring Practices specification[^2] in both semantics and behavior. This is to address usability issues found in both internal and external research[^3] with ARIA tab interfaces. Instead, GEL tabs are an enhanced version of a table of contents pattern, using same-page links and document fragments.
:::

## Expected markup

```html
<div class="gel-tabs">
  <ul>
    <li>
      <a id="tab-section1" href="#section1" aria-current="true">Section 1</a>
    </li>
    <li>
      <a id="tab-section2" href="#section2">Section 2</a>
    </li>
    <li>
      <a id="tab-section3" href="#section3">Section 3</a>
    </li>
  </ul>
  <section id="section1" aria-labelledby="tab-section1">
    <h2>Section 1</h2>
    <p>Content for section 1.</p>
  </section>
  <section id="section2" aria-labelledby="tab-section2" hidden>
    <h2>Section 2</h2>
    <p>Content for section 1.</p>
  </section>
  <section id="section3" aria-labelledby="tab-section3" hidden>
    <h2>Section 3</h2>
    <p>Content for section 1.</p>
  </section>
</div>
```

::: info Progressive enhancement
The [**Reference implementation**](#reference-implementation) to follow is based progressive enhancement, and the tab ARIA semantics and relationships are created using JavaScript. In the absence of JavaScript, the interface acts as a basic table of contents for a set of document fragments.
:::

### Notes

* **`<ul>`:** The `<ul>` groups the same-page links ('tabs') together and enumerates them in screen reader output
* **`aria-current="true"`:** This indicates the 'tab' that corresponds to the active/visible panel. Screen readers append or prepend _"current item"_ to the link's label.
* **`aria-labelledby`:** The 'tab panels' (`<section>`s) are labeled by their tabs, so that when a user focus or enters them, they are assured of their identity and relationship to the interface as a whole. Most screen readers will announce something similar to _"region, section 1"_ when the panel is focused or entered
* **`id`s:** Note that all `id`s in the interface must unique for the larger document. In the [**Reference implementation**](#reference-implementation), the tab `id`s are created dynamically by prefixing the (already unique) tab panel `id`s with _"tab-"_.

## Expected layout

The [main GEL page](https://www.bbc.co.uk/gel/guidelines/tabs) covers visual design considerations in detail. 

Shortened labels are preferred to wrapped text, so `white-space: nowrap` and `text-overflow: ellipsis` are applied by default. Note that this only works where `min-width: 0` is applied to the flex child (the `<li>`).

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
    flex-shrink: 0;
    flex-basis: 100%;
    margin: 0;
    margin-bottom: 0.25rem;
  }
}
```

### Focus styles

The tab elements themselves are rectangular and take a `background-color` making some user agents' default focus styling unclear. It is recommended a solid `outline` style is applied.

```css
.gel-tabs > ul a:focus,
.gel-tabs > section:focus {
  outline: 2px solid;
  outline-offset: -2px;
}
```

## Expected behavior

### Selecting a tab

By mouse or touch, clicking or pressing a tab will reveal its corresponding tab panel. For keyboard users, unselected tabs are focusable and can be activated with the <kbd>Enter</kbd> key. 

To preserve the behavior of the same-page links upon which the tabs are created and to address trouble screen readers have been observed experiencing moving from the tab to the tab panel, clicking a tab programmatically moves focus to the visible tab panel. The tab panel is identified in screen readers as a tab panel, and the tab panel's label (borrowed from the corresponding tab using `aria-labelledby`) is also announced. 

The tab panel is now the sequential focus starting point, making the first interactive element inside (or past) the tab panel next in focus order. However, the tab panel itself is not user focusable (it employs `tabindex="-1"`, not `tabindex="0"`), meaning <kbd>Shift</kbd> + <kbd>Tab</kbd> will take the user directly back to the tab list. Screen readers' reading position (or 'virtual cursor'[^4] position) will also be transported to the start of the tab panel, allowing users to read downwards from there. 

#### Page load

The tabs are permitted to continue updating the document's `hash` as tabs are selected, preserving the behavior of same-page links. When the document first loads, if the URL hash corresponds to a tab panel, that tab panel is shown by default. If there is no hash component to the URL, or the hash does not match a tab panel's `id`, the first tab panel is shown and the first tab selected.

The following code is a snippet from the reference implementation.

```js
window.addEventListener('DOMContentLoaded', function () {
  switchTab(undefined, tabInfo());
});
```

## Reference implementation



## Test specifications

[TODO]

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "Tabs, Used Right" — Nielsen Norman Group, <https://www.nngroup.com/articles/tabs-used-right/>
[^2]: Tabs: ARIA Authoring Practices, <https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel>
[^3]: "Danger! ARIA Tabs", <https://simplyaccessible.com/article/danger-aria-tabs/>
[^4]: "Reading Commands and Cursors" — Freedom Scientific, <https://doccenter.freedomscientific.com/doccenter/doccenter/rs11f929e9c511/2012-04-24_teachersandtrainers-l7/02_jawsandmagicreadingcommandsandcursors.htm>