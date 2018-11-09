---
title: Cards
summary: Cards let you preview and share content quickly, without having to leave the page you're on.
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/cards
---

## Introduction

The **Card** component is superficially similar to the [**Promo**](#link-todo). However, while the promo acts as a teaser and links to a page with full information, the **Card** is self-sufficient and offers functionality _in situ_. 

This functionality can include video playback, and options to share the card content via social media. Read the [original GEL Card documentation](https://www.bbc.co.uk/gel/guidelines/promos) for more.

## Expected markup

::: info Note
The following designates the basic card structure, consisting of the headline, description, content, and toolbar. See **Card content** for guidance on the structure of common types of card content.
:::

```html
<h2>Heading introducing the set of cards</h2>
<ul>
  <li class="gel-card">
    <div class="gel-card-headline">
      <h3>Card 1 Headline</h3>
    </div>
    <div class="gel-card-content">
      <!-- an image, video, quotation, etc -->
    </div>
    <div class="gel-card-desc">
      <!-- can include an attribution, timestamp, etc. -->
    </div>
    <div class="gel-card-toolbar">
      <button type="button" aria-haspopup="true">More info</button>
      <div class="gel-card-info" role="group" aria-labelledby="more-info-title-1">
        <h4 class="gel-card-info-heading" id="more-info-title-1" tabindex="-1">More info</h4>
        <!-- More info here -->
      </div>
      <button type="button" aria-pressed="false">Love</button>
      <button type="button">Add</button>
      <button type="button">Share</button>
    </div>
  </li>
  <li class="gel-card">
    <!-- another card's contents -->
  </li>
</ul>
```

### Notes

* **`<ul>` and `<li>`:** Cards are typically presented as a set, and together must be marked up as an unordered list, with each card marked as a list item (`<li>`). This enables structural and navigational cues in screen reader software[^1].
* **Headings:** Each card's primary (headline) link must be contained within a heading, each of the card's headline headings must be of the same level, and the set of cards must be introduced as a section within the document by a heading one level higher.
* **`gel-card-headline`:** This must appear first in the source order, although the card content will _appear_ first visually. This is because the card's heading introduces the document section that constitutes the rest of the card. Avoid putting interactive content inside `gel-card-headline` because this will create a reversed focus order.
* **`gel-card-desc`:** This will contain prosaic content, such as a description, attribution, and/or timestamp. Some of these elements may be linked to other resources.
* **`aria-popup="true"`:** You may need to provide additional, clarifying information for the card. A `gel-card-info` element is hidden by default, but can be toggled into view using the `aria-haspopup` button. Note that the `gel-card-info` element appears directly after the `aria-haspopup` button so that it is logically placed within focus order. The further action buttons will be the next '<kbd>Tab</kbd> stops'. The `aria-haspopup` ARIA property identifies the button as a 'popup button' in screen readers[^3]
* **`role="group"` and `aria-labelledby`:** In order to reliably associate a label with the `gel-card-info` element, a generic ARIA role is provided. The label itself is provided as a heading of the correct nesting level (`<h4>` following `<h3>` in the example) and connected to `gel-card-info` using `aria-labelledby`.
* **Love, add, and share:** The remaining actions facilitated by `gel-card-toolbar`. The `aria-pressed` state attribute should be provided on the "Love" action, since this is a an "on/off" toggle.

### Card contents

As set out in [bbc.co.uk/gel/guidelines/cards](https://www.bbc.co.uk/gel/guidelines/cards), there is a variety of content that may be included in cards. Here are some common examples:

#### An image

When an image is the focus of the card, it should be considered salient content and _must_ include sufficient alternative text. For example, if the card's headline is _"Winning nature photograph"_, the alternative text should not be:

1. Omitted
2. A mere repetition of the headline

Instead, describe what is in the photograph and what makes it appealing. 

To ensure the image has the best chance of fitting within the given space without distorting, it is recommended you use the `object-fit` property as a progressive enhancement. In the following example, the height of the content area has been set to `10rem` and the width is assumed to be indeterminate/responsive.

```css
.gel-promo-image {
  order: -1;
  height: 10rem;
  overflow: hidden;
}

.gel-promo-image img {
  height: 100%;
  width: auto;
}

@supports (object-fit: cover) {
  .gel-promo-image img {
    width: 100%;
    object-fit: cover;
  }
}
```

::: info Note
At the time of writing, the `object-fit` property is supported everywhere but Internet Explorer. The code uses `@supports` and falls back to showing the image at its natural width, cropping the right edge or leaving a right margin.
:::

#### A video

If a video is provided, ensure the following:

1. The video does not auto-play[^4]
2. The video player's controls are accessible by screen reader and keyboard
3. Dialogue in the video is accompanied by closed captions

If (as illustrated in the [original GEL Card documentation](https://www.bbc.co.uk/gel/guidelines/promos)) an auxiliary play/pause button is provided,  ensure that the button is accessible:

1. Use a `<button>` element with the `type="button"` attribute
2. Provide the (visually hidden[^2]) accessible label "play" or "pause", depending on the play state

```js
/* Assuming `btn` represents the button
and `vid` represents the video */
btn.addEventListener('click', function() {
  if (vid.paused) {
    vid.play();
    vid.textContent = 'Pause';
  } else {
    vid.pause();
    vid.textContent = 'Play';
  }
});
```

::: alert Important
Where the label of a toggle button changes, its (ARIA-defined) state must not also do so. By changing the label, you change the purpose of the button, and a simultaneous shift in state (`aria-pressed="false"` to `aria-pressed="true"`) will result in confusion.
:::

#### A quotation

Quotations must be set out using the `<figure>` and `<figcaption>` elements. The `<figcaption>` element must come after the quotation itself.

```html
<figure>
  <p>Are you the sort of person who gloats when you see a woman fall, or the kind that celebrates a magnificent recovery? #TeamMadonna</p>
  <figcaption>J.K. Rowling</figcaption>
</figure>
```

## Expected layout

The minimum width for a card is `266px`. A set of cards can appear within a grid formation or as the content of a carousel component. 

### Grid formation

The most efficient way to arrange cards into a grid is to use the CSS Grid module. You must ensure that a fallback layout is in place where CSS Grid is not supported. In the following example, the fallback emulates `grid-gap` by using a combination of positive and negative margins. This is undone where CSS Grid is supported.

```css
/* Fallback CSS */
.cards {
  overflow: hidden;
}

.cards_list {
  margin: -#{double($gel-spacing-unit)};
}

.cards_list li {
  min-width: 266px;
  float: left;
  margin: $gel-spacing-unit;
}

@supports (display: grid) {
  /* Undo fallback CSS */
  .cards_list, 
  .cards_list li {
    margin: 0;
  }

  .cards_list li {
    float: none;
  }

  /* CSS Grid layout */
  .cards_list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(266px, 1fr));
    grid-gap: double($gel-spacing-unit);
  }
}
```

::: info Note
These examples use [GEL Sass Tools](https://github.com/bbc/gel-sass-tools) for the margins.
:::

### Carousel formation

To achieve a carousel formation, the containing carousel element needs to have `overflow-x: auto` and the cards list must not be allowed to wrap. This is best achieved using Flexbox.

```css
.cards {
  overflow-x: auto;
}

.cards_list {
  display: flex;
}

.cards_list li {
  flex: 0 0 266px;
}

.cards_list li + li { /* margin only between cards */
  margin-left: double($gel-spacing-unit);
}
```

### Individual card layout

Each card in a set should share the same height, despite content across cards varying in quantity/length. In a Grid or Flexbox context, cards already stretch to fill the container's height. All that remains is to push the card's final child element (usually the toolbar) to the bottom of the card. 

This must _not_ be achieved using absolute positioning, because this is likely to interfere with zoom functionality. Instead, make the card a Flexbox context and give the final element a top margin of `auto`:

```css
.cards_list > li {
  display: flex;
  flex-direction: column;
}

.cards_list li > :last-child {
  margin-top: auto;
}
```

The `gel-card-headline`, containing the heading element, must come first in focus order hence it is first in source order. To move the `gel-card-content` above it _visually_ you can use `order: -1`.

```css
.gel-card-headline {
  order: -1;
}
```


#### The 'More info' element

This element must be absolutely positioned over the card, which means the card itself must take `position: relative`. The `bottom` positioning of the element must match the height of the `gel-card-toolbar` element so that element is not obscured while the element is visible.

```css
.gel-card {
  position: relative;
}

.gel-card-info {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 2.5rem; /* height of the toolbar */
  left: 0;
  padding: 1rem;
  background-color: #F1F1F1;
  overflow-y: auto;
}
```

Also note `overflow-y: auto`. This is provided in case the content inside the 'More info' element is taller than its height. Since the element is not allowed to grow, it must be scrollable instead.

## Expected behaviour

Aside from the toolbar behaviour, the card's behaviour will depend on the content it houses. See [**Card contents**](#card-contents) for pointers.

### The 'More info' button

The 'More info' button toggles the visibility of an element containing the additional information for the card. This element must be `hidden` by default. When 'More info' is clicked for the first time, `hidden` becomes `false` and focus is moved to the 'More info' heading. The `aria-haspopup` attribute on the button warns the user that a redirection of focus will take place.

In plain JavaScript, a simple function will suffice:

```js
// Assuming `moreBtn` is the button node,
// `moreElem` is the info node
// and `moreHeading` is the info node's heading node
moreBtn.addEventListener('click', function() {
  moreElem.hidden = !more.hidden;
  if (!more.hidden) {
    moreHeading.focus();
    moreBtn.textContent = 'Close';
  } else {
    moreBtn.textContent = 'More info';
  }
});
```

::: info Note
GEL SVG icons have been removed from the above example for brevity. 
:::

For the `focus()` method to succeed, the `class="gel-card-info-heading"` element needs `tabindex="-1"`.

```html
<div class="gel-card-info" role="group" aria-labelledby="more-info-title-1">
  <h4 class="gel-card-info-heading" id="info-title-1" tabindex="-1">More info</h4>
  <!-- More info here -->
</div>
```

In addition, it should be possible to close the `class="gel-card-info"` element using the <kbd>ESC</kbd> key. In this scenario, focus needs to be returned programmatically to the button.

```js
moreBtn.addEventListener('keydown', function(e) {
  if (e.which === 27) {
    e.preventDefault();
    moreElem.hidden = true;
    moreBtn.textContent = 'More info';
    moreBtn.focus();
  }
});
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/cards.html">

<p><a class="gel-button gel-button--dark gel-long-primer-bold" href="../demos/cards/" target="_new">Open in new window <svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link" style="fill:currentColor"></use></svg></a></p>

## Test specifications

A list of gherkin-style feature specifications (including requirements for the [BBC Mobile Accessibility Guidelines](https://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile)) for this component has been developed and published in a format suitable for use with an automated testing framework. You can review and download these feature files from [the project Wiki page, hosted on GitHub](#linktocome).

## Related research

[TODO]

### Further reading, elsewhere on the Web

[^1]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
[^2]: Gist of the `vh` (visually hidden) class <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: Accessible Rich Internet Applications (WAI-ARIA) 1.1: `aria-haspopup`, <https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup>
[^4]: "Why Autoplay Is An Accessibility Issue" — abilitynet.org.uk, <https://www.abilitynet.org.uk/news-blogs/why-autoplay-accessibility-issue>


