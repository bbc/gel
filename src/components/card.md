---
title: Card
version: 0.1.0
published: true
accessibility: true
---

## When to use a card

The card component represents a summary/preview of longer-form content. It should only be incorporated within you interface where:

1. It belongs to a set of cards, each summarizing similar and equivalent content
2. There is a permalink to which the card can be linked

Examples of sets of cards include programme listings, news stories, and sports events.

## Expected markup

Any set of cards must be marked up as an unordered list, with each card as a list item (`<li>`). This communicates to assistive technologies that the the items are related and part of a set. It also enables the list navigation mechanism in screen reader software.

```html
<div class="cards">
  <ul class="cards_list">
    <li>
      <!-- first card content -->
    </li>
    <li>
      <!-- second card content -->
    </li>
  </ul>
</div>
```

### Headings

It is recommended that each card's primary (headline) link is contained within a heading, that each of the cards' headings are of the same level, and that the set of cards is introduced by a heading one level higher. For example:

```html
<h2>Latest news stories</h2>
<div class="cards">
  <ul class="cards_list">
    <li>
      <h3>
        <a href="[url]">Headline 1</a>
      </h3>
      <!-- ensuing card content -->
    </li>
    <li>
      <h3>
        <a href="[url]">Headline 2</a>
      </h3>
      <!-- ensuing card content -->
    </li>
    <li>
      <h3>
        <a href="[url]">Headline 3</a>
      </h3>
      <!-- ensuing card content -->
    </li>
  </ul>
</div>
```

This marks out and labels the set as a subsection within the page, and provides a sound hierarchy for those traversing the page non-visually.

For search engine optimization and cognitive accessibility, the card's primary link text should match, or at least closely resemble, the `<h1>` text of the target URL.

### Images

Cards may contain images. These may be considered decorative or non-decorative. Where decorative, a 'null' alternative text value must be provided (`alt=""`):

```html
<li>
  <img src="/to/image.png" alt="" />
  <h3>
    <a href="[url]">Headline 2</a>
  </h3>
  <!-- ensuing card content -->
</li>
```

Only provide a positive `alt` value if it is not redundant. That is, if it adds pertinent information non-visually and does not simply repeat information provided by the primary link text or description.

#### ✓ Good example

```html
<li>
  <img src="/to/image.png" alt="Mugshot of a short-haired, thickset man" />
  <h3>
    <a href="[url]">Skripal attack: Second Russian Salisbury suspect named</a>
  </h3>
  <!-- ensuing card content -->
</li>
```

#### ✖️ Poor example

```html
<li>
  <img src="/to/image.png" alt="Virgin Galactic logo" />
  <h3>
    <a href="[url]">Virgin Galactic to reach space in weeks</a>
  </h3>
  <!-- ensuing card content -->
</li>
```

If the `alt` is omitted, screen reader software tends to announce the image's `src` value instead. In React, the `alt` prop should therefore be required, either using `propTypes` or an alternative type checking method.

```js
Card.propTypes = {
  alt: PropTypes.string.isRequired
};
```

### Toolbar

A typical card contains a toolbar after the description and at the bottom of the card. This can contain a "More info" button and one or more actions (Love, Add, and/or Share).

The toolbar must appear after the headline and description, last in source order within the card. The controls themselves must be marked up as buttons, with the `type="button"` attribution since they trigger JavaScript behavior.

```html
<div class="card_toolbar">
  <button type="button" aria-haspopup="true">More info</button>
  <button type="button">Love</button>
  <button type="button">Add</button>
  <button type="button">Share</button>
</div>
```

(**Note:** The 'More info' button takes `aria-haspopup` because it will reveal, and move focus to, the additional info element. See **Expected behavior**, to follow.)

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

(**Note:** These examples use [GEL Sass Tools](https://github.com/bbc/gel-sass-tools) for the margins.)

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
.cards_list li {
  display: flex;
  flex-direction: column;
}

.cards_list li > :last-child {
  margin-top: auto;
}
```

## Expected behavior

### The link

Mouse and touch users should be able to activate the primary (headline) link by pressing either the headline text _or_ the image. However, the image should not represent an additional, redundant tab stop to keyboard users or be perceivable as a link to screen reader users. 

In which case, you need to add a JavaScript `click` listener to the image and use it to trigger the link's `click` event by proxy. In plain JavaScript this would look something like the following:

```js
// Assuming that `link` represents the headline link node
// and `img` represents the image node...
img.addEventListener('click', () => link.click());
```

This is the only JavaScript enhancement. In an environment where the card is not client rendered, the card will be functional where JavaScript is not available. Accordingly, only add the `cursor` style if JavaScript has run:

```js
img.style.cursor = 'pointer';
```

In React with JSX, you might use a `ref` (the node for which being accessible via the `current` property). The following example is elided for brevity:

```js
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.link = React.createRef();
  }
  render() {
    const { src, alt, url, headline } = this.props;
    return (
      <li>
        <img src={src} alt={alt} onClick={this.link.current.click()} />
        <h2>
          <a href={url} ref={this.link}>{headline}</a>
        </h2>
      </li>
    );
  }
}
```

### More info

The 'More info' button toggles the visibility of an element containing the additional information for the card. This element must be `hidden` by default. When 'More info' is clicked for the first time, `hidden` becomes `false` and focus is moved to the element. The `aria-haspopup` attribute on the button warns the user that a redirection of focus will take place.

In plain JavaScript, a simple function will suffice:

```js
// Assuming that `moreBtn` is the button node
// and `moreElem` is the info node
moreBtn.addEventListener('click', () => {
  moreElem.hidden = !moreElem.hidden;
  if (!moreElem.hidden) {
    moreElem.focus();
    moreBtn.textContent = 'Close';
  } else {
    moreBtn.textContent = 'More info';
  }
});
```

(**Note:** The button's state is not toggled via `aria-expanded`. This is because the button label changes, and a simultaneous change in state would result in contradictory information.)

For the `focus()` method to succeed, the `class="card_more-info"` element needs `tabindex="-1"`. Also provide a role and label for screen reader identification. It is recommended the element is positioned between the 'More info' and subsequent buttons in the source, and is positioned absolutely over the card, leaving just the toolbar visible.

```html
<div class="card_toolbar">
  <button type="button" aria-haspopup="true">More info</button>
  <div class="card_more-info" role="group" aria-label="more info" tabindex="-1">
    <!-- more info here -->
  </div>
  <button type="button">Love</button>
  <button type="button">Add</button>
  <button type="button">Share</button>
</div>
```

In addition, it should be possible to close the `class="card_more-info"` element using the <kbd>ESC</kbd> key. 

```js
moreElem.addEventListener('keydown', e => {
  if (e.which === 27) {
    e.preventDefault();
    moreElem.hidden = true;
    moreBtn.textContent = 'More info';
    moreBtn.focus();
  }
});
```

In JSX, you can use the button to toggle a state declared on the info element like `hidden={infoHidden}`. But you will still need to move focus, which will require a `ref`. A small function to be triggered via the button's `onClick`:

```js
toggleInfo() {
  this.setState(
    (state) => ({
      state.infoHidden = !state.infoHidden;
    }),
    () => {
      if (!this.state.infoHidden)
        /* ↓ ref will need to be created with createRef() */
        this.infoElem.current.focus();
    }
  );
}
```

(**Note:** `setState` is asynchronous, so a callback function is used to trigger the `focus()` method.)

A separate function would be needed to handle closing on <kbd>ESC</kbd>:

```js
closeInfo(e) {
  if (e.which === 27) {
    e.preventDefault();
    this.setState(
      (state) => ({
        state.infoHidden = true;
      }),
      () => {
        /* ↓ ref will need to be created with createRef() */
        this.infoBtn.current.focus();
      }
    );    
  }
}
```

## Reference implementation

<live-demo id="card1">
  <template>
    <style>
      .card, .card * {
        box-sizing: border-box;
      }
      .card {
        position: relative;
        color: #404040;
        font-family: sans-serif;
        background: #F1F1F1;
        display: flex;
        flex-direction: column;
        width: 266px;
      }
      .card ul {
        margin: 0;
      }
      .card_img {
        overflow: hidden;
        position: relative;
      }
      .card_img img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .card_icon {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 1rem;
        background-color: rgba(255,255,255,0.5);
        line-height: 1;
      }
      .card_icon svg {
        height: 1.5rem;
        width: auto;
      }
      .card_text {
        padding: 1rem;
        flex-grow: 1;
      }
      .card_text > * + * {
        margin: 0;
        margin-top: 0.5rem;
      }
      .card_title a {
        color: inherit;
        text-decoration: none;
      }
      .card_title a:hover,
      .card_title a:focus {
        outline: none;
        text-decoration: underline;
      }
      .card > :last-child {
        margin-top: auto;
      }
      .card_toolbar {
        height: 2.5rem;
        list-style: none;
        display: flex;
        padding: 0.5rem;
        background-color: #e5e5e5;
      }
      .card_toolbar li + li {
        margin-left: 0.5rem;
      }
      .card_toolbar > :first-child {
        margin-right: auto;
      }
      .card_toolbar button {
        background: none;
        border: none;
        font-size: inherit;
        cursor: pointer;
      }
      .card_more-info {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 2.5rem;
        left: 0;
        padding: 1rem;
        background-color: #F1F1F1;
      }
    </style>
    <div class="card">
      <div class="card_img">
        <img src="/static/images/placeholder.png" alt="">
        <span class="card_icon" aria-hidden="true">
          <svg fill="currentColor" viewBox="0 0 20 20" width="20" height="20" focusable="false">
            <polyline points="2 2, 18 10, 2 18"></polyline>
          </svg>
        </span>
      </div>
      <div class="card_text">
        <h2 class="card_title"><a href="#to-permalink">Title Of Card</a></h2>
        <p>Description of the card</p>
        <small>Attribution</small>
      </div>
      <div class="card_toolbar">
        <button type="button" aria-haspopup="true">More info</button>
        <div class="card_more-info" role="group" aria-label="more info" tabindex="-1" hidden>
          <p>More info here</p>
        </div>
        <button type="button">L</button>
        <button type="button">A</button>
        <button type="button">S</button>
      </div>
    </div>
    <script>
      const img = demo.querySelector('img');
      const link = demo.querySelector('a');
      const moreBtn = demo.querySelector('[aria-haspopup]');
      const moreElem = demo.querySelector('.card_more-info');
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => link.click());
      moreBtn.addEventListener('click', () => {
        moreElem.hidden = !moreElem.hidden;
        if (!moreElem.hidden) {
          moreElem.focus();
          moreBtn.textContent = 'Close';
        } else {
          moreBtn.textContent = 'More info';
        }
      });
      moreElem.addEventListener('keydown', e => {
        if (e.which === 27) {
          moreElem.hidden = true;
          moreBtn.textContent = 'More info';
          moreBtn.focus();
        }
      });
    </script>
  </template>
</live-demo>

## Existing implementations

There are currently no existing implementations of this reference component.


