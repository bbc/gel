---
title: Cards
summary: Cards let you preview and share content quickly, without having to leave the page you're on
version: 0.1.0
published: true
accessibility: false
linkback: http://www.bbc.co.uk/gel/guidelines/cards
---

## Introduction

The **Card** component is superficially similar to the [**Promo**](../promos). However, while the promo acts as a teaser and links to a page with full information, the **Card** is self-sufficient and offers functionality _in situ_. 

This functionality can include video playback, and options to share the card content via social media. Read the [original GEL Card documentation](https://www.bbc.co.uk/gel/guidelines/cards) for more.

## Recommended markup

::: info Elided code
The following designates the basic card structure, consisting of the headline, description, content, and toolbar. See [Card contents](#card-contents) for guidance on the structure of common types of card content.
:::

```html
<h2>Heading introducing the set of cards</h2>
<ul>
  <li class="gel-card">
    <div class="gel-card__headline">
      <h3>Card 1 Headline</h3>
    </div>
    <div class="gel-card__content">
      <!-- an image, video, quotation, etc -->
    </div>
    <div class="gel-card__desc">
      <!-- can include an attribution, timestamp, etc. -->
    </div>
    <div class="gel-card__toolbar">
      <button type="button" aria-expanded="false">
        <span class="gel-card__more-label">
          <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
            <use xlink:href="path/to/gel-icons-all.svg#gel-icon-up"></use>
          </svg>
          More info
        </span>
        <span class="gel-card__close-label">
          <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
            <use xlink:href="path/to/gel-icons-all.svg#gel-icon-no"></use>
          </svg>
          Close
        </span>
      </button>
      <div class="gel-card__info" role="group" aria-labelledby="more-info-title-1">
        <h4 class="gel-card__info-heading" id="more-info-title-1">More info</h4>
        <!-- More info here -->
      </div>
      <button type="button" aria-pressed="false">
        <span class="gel-sr">Love</span>
        <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
          <use xlink:href="path/to/gel-icons-all.svg#gel-icon-love-loved-state"></use>
        </svg>
      </button>
      <button type="button">
        <span class="gel-sr">Add</span>
        <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
          <use xlink:href="path/to/gel-icons-all.svg#gel-icon-add"></use>
        </svg>
      </button>
      <button type="button">
        <span class="gel-sr">Share</span>
        <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
          <use xlink:href="path/to/gel-icons-all.svg#gel-icon-share"></use>
        </svg>
      </button>
    </div>
  </li>
  <li class="gel-card">
    <!-- another card's contents -->
  </li>
</ul>
```

### Notes

* **`<ul>` and `<li>`:** **Cards** are typically presented as a set, and together must be marked up as an unordered list, with each card marked as a list item (`<li>`). This enables structural and navigational cues in [^1 screen reader software].
* **Headings:** Each card's primary (headline) link must be contained within a heading, each of the card's headline headings must be of the same level, and the set of cards must be introduced as a section within the document by a heading one level higher.
* **`gel-card__headline`:** This must appear first in the source order, although the card content will _appear_ first visually. This is because the card's heading introduces the document section that constitutes the rest of the card. Avoid putting interactive content inside `gel-card__headline` because this will create a reversed focus order.
* **`gel-card__desc`:** This will contain prosaic content, such as a description, attribution, and/or timestamp. Some of these elements may be linked to other resources.
* **`aria-expanded`:** You may need to provide additional, clarifying information for the card. A `gel-card__info` element is hidden by default, but can be toggled into view using the `aria-expanded` button. Note that the `gel-card__info` element appears directly after the `aria-expanded` button so that it is logically placed within browsing and focus order. The further action buttons will be the next <kbd>Tab</kbd> stops. The `aria-expanded` [^2 ARIA state attribute] identifies the button as a 'toggle button' in screen readers.
* **`role="group"` and `aria-labelledby`:** In order to reliably associate a label with the `gel-card__info` element, a generic ARIA role is provided. The label itself is provided as a heading of the correct nesting level (`<h4>` following `<h3>` in the example) and connected to `gel-card__info` using `aria-labelledby`.
* **Love, add, and share:** The remaining actions facilitated by `gel-card__toolbar`. The `aria-pressed` state attribute should be provided on the "Love" action, since this is a an "on/off" toggle. In the above example, the text label is visually hidden with the `gel-sr` class. However, where there are fewer than three of these buttons present (and therefore more room), you should display the text labels visually as well as making them available to assistive technologies.

### Card contents

There is a variety of content that may be included in cards. Here are some common examples:

#### An image

When an image is the focus of the card, it should be considered salient content and _must_ include sufficient alternative text. For example, if the card's headline is _"Winning nature photograph"_, the alternative text should not be:

1. Omitted
2. A mere repetition of the headline

Instead, describe what is in the photograph and what makes it relevant. 

#### A video

If a video is provided, ensure the following:

1. The video [^3 does not auto-play]
2. The video player's controls are accessible by screen reader and keyboard
3. Dialogue in the video is accompanied by closed captions

If an auxiliary play/pause button is provided,  ensure that the button is accessible. See [Video controls](../video-controls) for more information.

#### A quotation

Quotations must be set out using the `<figure>` and `<figcaption>` elements. The `<figcaption>` element must come after the quotation itself.

```html
<figure>
  <p>Are you the sort of person who gloats when you see a woman fall, or the kind that celebrates a magnificent recovery? #TeamMadonna</p>
  <figcaption>J.K. Rowling</figcaption>
</figure>
```

## Recommended layout

The minimum width for a card is `266px`. A set of cards can appear within a grid formation or as the content of a carousel component. 

### Grid formation

The most efficient way to arrange cards into a grid is to use the CSS Grid module. You must ensure that a fallback layout is in place where CSS Grid is not supported. In the following code, Flexbox provides that fallback.

```css
.gel-cards {
  display: flex;
  flex-wrap: wrap;
}

.gel-cards > * {
  flex: 0 0 266px;
  margin: 0 1rem 1rem 0;
}

@supports (display: grid) {
  .gel-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(266px, 1fr));
    grid-gap: 1rem;
  }

  .gel-cards > * {
    margin: 0;
  }
}
```

::: info IE11 and Flexbox
Internet Explorer 11 supports Flexbox (albeit with a few bugs) but not `@supports` in CSS. Hence, Flexbox code is not feature detected.
:::

### Carousel formation

To achieve a carousel formation, the containing carousel element needs to have `overflow-x: auto` and the cards list must not be allowed to wrap. This is best achieved using Flexbox. See [**Carousels**](../carousels).

### Individual card layout

Each card in a set should share the same height, despite content across cards varying in quantity/length. In a Grid or Flexbox context, cards already stretch to fill the container's height. All that remains is to push the card's final child element (usually the toolbar) to the bottom of the card. 

This must _not_ be achieved using absolute positioning, because this is likely to interfere with zoom functionality. Instead, make the card a Flexbox context and give the toolbar element a top margin of `auto`:

```css
.gel-card {
  display: flex;
  flex-direction: column;
}

.gel-card__toolbar {
  margin-top: auto;
}
```

The `gel-card__headline`, containing the heading element, must come first in focus order hence it is first in source order. To move the `gel-card__content` above it _visually_ you can use `order: -1`.

```css
.gel-card__headline {
  order: -1;
}
```

#### Media layout

To ensure the image or video has the best chance of fitting within the given space without distorting, it is recommended you use the `object-fit` property as a progressive enhancement. In the following example, the height of the content area has been set to `10rem` and the width is assumed to be indeterminate/responsive.

```css
.gel-card__content img,
.gel-card__content video {
  height: 100%;
  width: auto;
}

@supports (object-fit: cover) {
  .gel-card__content img, 
  .gel-card__content video {
    width: 100%;
    object-fit: cover;
  }
}
```

::: info Support for object-fit
At the time of writing, the `object-fit` property is supported everywhere but Internet Explorer. The code uses `@supports` and falls back to a 'letterboxed' style using `text-align: center` and a `background-color`:

```css
.gel-card__content {
  text-align: center;
  background-color: $gel-color--tundora; 
}
```
:::

#### The 'More info' element

This element must be absolutely positioned over the card, which means the card itself must take `position: relative`. The `bottom` positioning of the element must match the height of the `gel-card__toolbar` element so that element is not obscured while the element is visible.

```css
.gel-card {
  position: relative;
}

.gel-card__info {
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

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. Transparent outlines and borders that become visible in Windows HCM are used to demarcate the **Card** from some of its subcomponents. An outline style supplements the `background-color` focus style that is eliminated.

![An outer outline demarcates the shape of the card.](../../static/images/hcm_cards.png)

## Recommended behaviour

Aside from the toolbar behaviour, the card's behaviour will depend on the content it houses. See [Card contents](#card-contents) for pointers.

### The 'More info' button

The 'More info' button toggles the visibility of an element containing the additional information for the card. This element must be `hidden` by default. When 'More info' is clicked for the first time, `hidden` becomes `false` and `aria-expanded` becomes `true`. 

In plain JavaScript, a simple function will suffice:

```js
moreBtn.addEventListener('click', function () {
  moreElem.hidden = !moreElem.hidden;
  moreBtn.setAttribute('aria-expanded', !moreElem.hidden);
});
```

In addition, it should be possible to close the `class="gel-card__info"` element using the <kbd>Esc</kbd> key. In this scenario, focus needs to be returned programmatically to the button.

```js
moreElem.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    moreElem.hidden = true;
    moreBtn.setAttribute('aria-expanded', 'false');
    moreBtn.focus();
  }
});
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/cards.html">

<cta label="Open in new window" href="../demos/cards/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: "Basic screen reader commands for accessibility testing" by Léonie Watson, <https://developer.paciellogroup.com/blog/2015/01/basic-screen-reader-commands-for-accessibility-testing/>
[^2]: `aria-expanded` (state) — W3C, <https://www.w3.org/WAI/PF/aria-1.1/states_and_properties#aria-expanded>
[^3]: "Why Autoplay Is An Accessibility Issue" — abilitynet.org.uk, <https://www.abilitynet.org.uk/news-blogs/why-autoplay-accessibility-issue>


