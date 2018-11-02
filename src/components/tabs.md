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

## Expected markup

```html
<div class="gel-tabs">
  <ul role="tablist">
    <li role="presentation">
      <a role="tab" id="tab-section1" href="#section1" aria-selected="true">Section 1</a>
    </li>
    <li role="presentation">
      <a role="tab" id="tab-section2" href="#section2">Section 2</a>
    </li>
    <li role="presentation">
      <a role="tab" id="tab-section3" href="#section3">Section 3</a>
    </li>
  </ul>
  <section role="tabpanel" id="section1" aria-labelledby="tab-section1">
    <h2>Section 1</h2>
    <p>Content for section 1.</p>
  </section>
  <section role="tabpanel" id="section2" aria-labelledby="tab-section2" hidden>
    <h2>Section 2</h2>
    <p>Content for section 1.</p>
  </section>
  <section role="tabpanel" id="section3" aria-labelledby="tab-section3" hidden>
    <h2>Section 3</h2>
    <p>Content for section 1.</p>
  </section>
</div>
```

::: info Note
The [**Reference implementation**](#reference-implementation) to follow is based progressive enhancement, and the tab ARIA semantics and relationships are created using JavaScript. In the absence of JavaScript, the interface acts as a table of contents for a set of document fragments.
:::

### Notes

* **`role="tablist"` and `role="tab"`:** These roles are use in conjunction to communicate the presence of a tabbed interface to assistive technologies. When a screen reader user focuses a tab, they are told how many tabs there are in total and which tab they are currently on.
* **`aria-selected="true"`:** Indicates the current tab (corresponding to the `role="tabpanel"` element that is not `hidden`). Beware that you must explicitly write `aria-selected="true"` for reliable support. ARIA does not support Boolean attributes in the form `aria-selected`.
* **`role="tabpanel"` and `aria-labelledby`:** The tab panels are labeled by their tabs, so that when a user focus or enters them, they are assured of their identity and relationship to the interface as a whole. Most screen readers will announce something similar to _"tab panel, section 1"_ before the tab panel's content.
* **`role="presentation"`:** This removes the list semantics, which are not needed after the markup has been enhanced into a tablist and would only create unnecessary additional output/noise.
* **`id`s:** Note that all `id`s in the interface must unique for the larger document. In the [**Reference implementation**](#reference-implementation), the tab `id`s are created dynamically by prefixing the (already unique) tab panel `id`s with _"tab-"_.

## Expected layout

The [main GEL page](https://www.bbc.co.uk/gel/guidelines/tabs) covers visual design considerations in detail. 

Shortened labels are preferred to wrapped text, so `white-space: nowrap` and `text-overflow: ellipsis` are applied by default. Note that this only works where `min-width: 0` is applied to the flex child (the `<li>`).

```css
.gel-tabs [role="presentation"] {
  min-width: 0;
}

.gel-tabs [role="tab"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

However, this can easily result in illegible labels for very narrow viewports. It is recommended you create a breakpoint based on the content at which to reconfigure the tabs into a single column. This might be implemented something like the following:

```css
@media (max-width: 400px) {
  .gel-tabs [role="tablist"] {
    flex-wrap: wrap;
  }

  .gel-tabs [role="presentation"] {
    flex-shrink: 0;
    flex-basis: 100%;
    margin: 0;
    margin-bottom: 0.25rem;
  }
}
```

### Focus styles

The tab elements themselves are rectangular and take a `background-color` making some user agents' default focus styling unclear. It is recommended a solid `outline` style is applied, with a negative offset to respect the tab's shape. Using `:focus-visible` progressively, we can ensure this style is not visible to sighted users in supporting browsers.

```css
.gel-tabs [role="tab"]:focus-visible {
  outline: 2px solid;
  outline-offset: -2px;
}

:focus:not(:focus-visible) { 
  outline: none;
}
```

## Expected behavior



## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "Tabs, Used Right" — Nielsen Norman Group, <https://www.nngroup.com/articles/tabs-used-right/>