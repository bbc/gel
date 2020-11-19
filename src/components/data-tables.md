---
title: Data tables
summary: Tabular data must be presented with a sound semantic and visual structure
version: 0.1.0
published: true
accessibility: false
---

## Introduction

BBC tables follow longstanding conventions for the structuring of tabular data. However, some enhancements are included in the following implementation. 

Since _wrapping_ table cells, for the purposes of responsive design, would make a nonsense of the data structure, data tables must retain their rigid, two-dimensional arrangement. Accommodating tables with many columns therefore becomes a question of allowing horizontal scrolling. Since horizontal scrolling is typically avoided, and may be unexpected, it must only be applied where necessary, with both additional visual affordance (see [**Recommended layout**](#recommended-layout)) and keyboard interaction supported.

The following implementation also includes 'sticky' column header support, to help users peruse tables with a considerable number of rows, and the option to apply column sorting functionality.

## Recommended markup

No matter the templating or rendering technology, data tables should be marked up with the `<table>` and associated elements. Data tables composed from `<div>` elements require considerable ARIA attribution to elicit the expected screen reader behaviors, and non-trivial amounts of CSS to emulate the grid-like layout behavior. 

### Column headers

Any `<table>` that does not have column or row headers (`<th>` elements) cannot be considered a true data table. In fact, some screen readers that encounter a table without headers will treat it as a 'layout table' and communicate it quite differently[^1].

#### <mark is="bad"> Bad example

```html
<table>
  <tr>
    <td>Fake column header 1</td>
    <td>Fake column header 2</td>
    <td>Fake column header 3</td>
  </tr>
  <tr>
    <td>Row 1, cell 1</td>
    <td>Row 1, cell 2</td>
    <td>Row 1, cell 3</td>
  </tr>
  <tr>
    <td>Row 2, cell 1</td>
    <td>Row 3, cell 2</td>
    <td>Row 4, cell 3</td>
  </tr>
</table>
```

#### <mark is="good"> Good example

```html
<table>
  <tr>
    <th>Column header 1</th>
    <th>Column header 2</th>
    <th>Column header 3</th>
  </tr>
  <tr>
    <td>Row 1, cell 1</td>
    <td>Row 1, cell 2</td>
    <td>Row 1, cell 3</td>
  </tr>
  <tr>
    <td>Row 2, cell 1</td>
    <td>Row 3, cell 2</td>
    <td>Row 4, cell 3</td>
  </tr>
</table>
```

Table header elements are _labels_ for column data. With the column headers in place, when you navigate from a table cell in one column to a table cell in an adjacent column, the new column's `<th>` content is announced for context. This enables users to traverse and understand tables non-visually.

### Row headers

In most cases, column headers suffice. However, in some tables, the first cell of each row can be considered the 'key' cell and acts like a header for the row. It's recommended you differentiate between column and row headers explicitly using the `scope` attribute:

```html
<table>
  <thead>
    <tr>
      <th scope="col">Column header 1</th>
      <th scope="col">Column header 2</th>
      <th scope="col">Column header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Row 1 header</th>
      <td>Row 1, cell 2</td>
      <td>Row 1, cell 3</td>
    </tr>
    <tr>
      <th scope="row">Row 2 header</th>
      <td>Row 3, cell 2</td>
      <td>Row 4, cell 3</td>
    </tr>
  </tbody>
</table>
```

Note that the `<table>` is now divided into a head (`<thead>`) and body (`<tbody>`). This does not have any impact on the behavior of the table and its headers. But, as we enhance the table, these elements will come in useful for styling and scripting.

::: alert Empty table headers
In the last example, the first column header is effectively a header for the _row_ headers. Some deem this unnecessary and make the cell empty. This is not recommended, since it can produce unexpected behavior[^2]. It is also better to be explicit whenever there is the opportunity. In the [**Reference implementation**](#reference-implementation) the row headers are each Premier League football teams. This could probably be concluded through deduction (and the help of surrounding information), but an explicit _"Team"_ column header removes all doubt.
:::

### Captions

So far, we have labelled the rows and columns, but not the table itself. You may be inclined to introduce a table with a heading element, such as an `<h2>`. This would certainly aid users browsing the page visually. However, a heading would not be directly _associated_ with the table, meaning a screen reader user navigating directly to the table (using a shortcut like <kbd>T</kbd> in NVDA) would not hear a label announced upon arrival. 

Instead, provide a `<caption>`[^3]. Where there is already a requirement for a heading and you want to eliminate repetition and redundancy, it is permitted to place the heading _inside_ the `<caption>` element.

```html
<table>
  <caption>
    <h2>Example table</h2>
  </caption>
  <!-- table headers and data -->
</table>
```

This will mean screen reader users can reach the table via either table or heading shortcuts provided by their software. In either case, it will be identified by the caption/heading's text.

## Recommended layout

Importantly, the grid structure of data tables must remain intact no matter the available space. That is, elements must not wrap or otherwise change position since they will become labelled incorrectly. For tables with many columns this may result in horizontal scrolling. It is recommended a container element with `overflow-x: auto` is used to contain the horizontal scroll behavior.

```css
.gel-table {
  overflow-x: auto;
}
```

To make this element scrollable by keyboard, it must first be focusable. This requires the `tabindex="0"` attribution. For screen reader users, this newly interactive element will need a label. It's recommended the element takes the `group` role and is associated with the `<caption>` for the labelling.

```html
<div class="gel-table" role="group" aria-labelledby="caption" tabindex="0">
  <table>
    <caption id="caption">
      <h2>Example table</h2>
    </caption>
    <!-- table headers and data -->
  </table>
</div>
```

::: alert Conditional interactivity
It is not recommended the table container is made focusable by default, since tables that do not trigger a scrollbar would result in an interactive container that _doesn't do anything_. In the [**Reference implementation**](#reference-implementation) `tabindex="0"` is removed via `ResizeObserver` where the container does not overflow. 

`tabindex="0"` is added in the markup, and from the outset, in case JavaScript or `ResizeObserver` are not available.
:::

### Indicating scroll functionality visually

Currently, only the bisection of a column indicates an an overflow, and the ability to scroll more data into view. This does not provide a great deal of affordance. In addition, you can apply an indicative shadow/fade to whichever side the overflow is occurring at.

A set of `linear-gradient`s with differing `background-attachment` values are employed to achieve this effect:

```css
.gel-table {
  overflow-x: auto;
  background-color: #fff;
  background-image: 
    linear-gradient(90deg, #fff 0%, transparent 4rem),
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, transparent 2rem),
    linear-gradient(270deg, #fff 0%, transparent 4rem),
    linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, transparent 2rem);
  background-attachment: local, scroll;
}
```

Where the is no overflow, the white `local` gradient masks the grey `scroll` one and hides it[^4].

### Sticky headers

Where there are numerous rows, it's possible to scroll past the headers, making interpreting the data more difficult (since it would require either a good memory, or a lot of scrolling up and down). The conventional solution to this issue is to make the column header row 'sticky', so it follows the user down the page as a persistent reference.

This is now possible in CSS, with the `position: sticky` declaration. However, containers with an explicit `overflow` such as that applied in the last section, will forego the `position: sticky` behavior. The following is therefore provided as an enhancement for tables not producing an overflow. 

```css
.gel-table th {
  position: sticky;
  top: 0;
}
```

The `overflow-x: auto` style is removed dynamically, via `ResizeObserver` in the [**Reference implementation**](#reference-implementation), where no overflow is occurring. This reinstates the sticky header behavior.

## Recommended behaviour

The handling of overflow/scrolling behaviour already covered in the [**Recommended layout**](#recommended-layout) is handled progressively, by first feature detecting `ResizeObserver`. 

```js
if ('ResizeObserver' in window) {
  var ro = new ResizeObserver(entries => {
    for (var entry of entries) {
      var cr = entry.contentRect;
      var noScroll = cr.width >= this.table.offsetWidth;
      entry.target.tabIndex = noScroll ? -1 : 0;
      entry.target.style.overflowX = noScroll ? 'visible' : 'auto';
      this.thead.classList.toggle('sticky', noScroll);
    }
  });

  ro.observe(elem);
}
```

Where `ResizeObserver` (or JavaScript) is not available, the table container acts as if it is liable to scroll, with `overflow-x: auto` set, and `tabindex="0"` (for keyboard control over scrolling) intact. 

### Sorting

In addition, sorting functionality is provided where the [**Reference implementation**](#reference-implementation) constructor's second argument is set to `true`.

```js
var tableContainer = document.querySelector('.gel-table');
var table = new gel.Table.constructor(tableContainer, true);
```

The table is progressively enhanced to include sorting buttons for each of the column headers. These are each labelled _'sort'_ using a visually hidden `<span class="gel-sr" />`, and display the re-order icon from the [GEL iconography suite](http://bbc.github.io/gel-iconography/).

```html
<th scope="col" aria-sort="none">
  Teams
  <button>
    <span class="">Sort</span> 
    <svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <path d="M18.033 25.5v-19l5.6 5.7 2.4-2.4-10-9.8-10 9.8 2.4 2.4 5.6-5.7v19l-5.6-5.7-2.4 2.4 10 9.8 10-9.8-2.4-2.4"></path>
    </svg>
  </button>
</th>
```

When a user clicks a header's sort button, ascending order is prioritized and `aria-sort`'s value switches from `none` to `ascending`. Subsequent clicks to the same button will toggle the order between ascending and descending (`aria-sort="descending"`). All columns not being used to sort have headers with the `none` value.

Sorting is based on the _text_ content of cells, meaning any HTML can be used without breaking the sorting algorithm.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/data-table.html">

<cta label="Open in new window" href="../demos/data-table/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Layout Tables Versus Data Tables — WebAim, <https://webaim.org/techniques/tables/#uses>
[^2]: VoiceOver and Tables with an Empty First Header Cell, <http://accessibleculture.org/articles/2010/10/voiceover-and-tables-with-an-empty-first-header-cell/>
[^3]: The Table Caption element — MDN, <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption>
[^4]: Pure CSS scrolling shadows with `background-attachment: local`, <http://lea.verou.me/2012/04/background-attachment-local/>