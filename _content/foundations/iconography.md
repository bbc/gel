---
title: Iconography
summary: Iconography aids communication, but should not take precedence over text
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/iconography
---

## Introduction

Text is the primary form of communication on the web, and is highly interoperable. Only use icons where additional clarity is sought. Icons may help those with cognitive impairments, and others who find themselves on a page that isn't in their first language.

A [comprehensive and standardized set](http://bbc.github.io/gel-iconography/) of BBC icons is available. It is not recommended you create your own iconography. Cognition depends heavily on convention, and only by using established iconography can you foster familiarity.

### Avoid icon fonts

The [BBC icons](http://bbc.github.io/gel-iconography/) are intended for implementation using inline SVG. Like icon fonts, SVG icons are infinitely scalable without degradation.

Unlike SVG, icon fonts icons are mapped to unicode points and interpreted as text. This can have accessibility issues. Most icon font sets map their icons to the unicode [Private Use Areas](https://en.wikipedia.org/wiki/Private_Use_Areas) in order to avoid overriding established, meaningful characters and symbols. A problem occurs when users set their own fonts, using an extension or user stylesheet: the icons are replaced with 'missing character' symbols[^1]. Dyslexic users sometimes set their own fonts for improved legibility.

Icon font icons mapped to established characters are equally problematic. A close icon mapped to an 'A' would reveal itself as an 'A' when the font is overridden. Also, screen readers would interpret and announce the icon as 'A'.

## Recommended markup

In all cases, icons should accompany either visible or visually hidden text label. The icon itself must take the `focusable="false"` attribution to remove it from focus order (a default setting in some versions of Internet Explorer and Edge[^2]). It should also take `aria-hidden="true"`. Since the text label (_"Delete"_ in the following example) is sufficient, identifying the SVG graphic is unnecessary. Do not provide alternative text / labels for icons where text is already available.

```html
<button>  
  <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
    <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-download"></use>
  </svg>
  <span>Delete</span>
</button>
```

Only where icons are extremely well-established—such as the play and stop buttons of a media player—is it reliable to use them without supplementary visual text. In these cases, a visually hidden `<span>` is recommended, since `aria-label` encounters translation issues[^3].

In these instances, hide the label's `<span>` using the `gel-sr` class or similar. This class obscures the text visually without silencing its announcement in screen readers.

```css
.gel-sr {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

### Tooltips

If the icon has a [tooltip](https://en.wikipedia.org/wiki/Tooltip), the tooltip can act as the primary label.

In the following example, the `class="tooltip"` element provides the label.

```html
<a href="link/to/download" download>
  <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
    <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-download"></use>
  </svg>
  <span class="tooltip">Download</span>
</a>
```

By default, the tooltip would be hidden using `display: none`. It would then be revealed on the `:hover` and `:focus` events.

```css
[download] .tooltip {
  display: none;
}

[download]:hover .tooltip,
[download]:focus .tooltip {
  display: block;
}
```

::: alert The title attribute
**Important:** [Do not rely on the `title` attribute](https://developer.paciellogroup.com/blog/2012/01/html5-accessibility-chops-title-attribute-use-and-abuse/) for your tooltips. These do not appear on focus, and are therefore not keyboard accessible. They are also not typically announced in screen readers without adjusting the software's verbosity settings.
:::

If the tooltip element appears outside the control, associate it to the control element using `aria-labelledby`. In the following example, `aria-labelledby` and the tooltip's `id` share the value `download-tooltip`.

```html
<div class="download-container">
  <a href="link/to/download" download aria-labelledby="download-tooltip">
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="assets/svg/gel-icons-core-set.svg#gel-icon-download"></use>
    </svg>
  </a>
  <span class="tooltip" id="download-tooltip">Download</span>
</div>
```

## Recommended layout

### Sizing and alignment

Sizing and alignment for inline text is taken care of by the `gel-icon--text` class included in the code examples on the page.

```css
.gel-icon--text {
  height: 1em;
  width: 1em;
  vertical-align: text-top;
}
```

Note that the `em` unit allows the icon to scale proportionate to the parent element's `font-size`. Using `rem` or `px` would break this relationship, and the text would scale without the icon.

### Colour

The usual WCAG rules[^4] for colour contrast apply to icons, although the impact of icons with inadequate contrast is likely to be less critical than text. As with text, the larger the icon the more minimal the impact of low contrast. There is no good reason, however, to consider low contrast combinations under any circumstances.

### High Contrast Mode

In Windows High Contrast Mode, the text colour is augmented to become very dark or very light. In order for SVG to adopt the same high contrast colour of the text, use `currentColor`. This is applied in the examples in this site using the `gel-icon` class.

```css
.gel-icon {
  fill: currentColor;
}
```

Note that SVG uses `fill`, not `color` or `background-color`.

### Colour independence

Controls often exist in changing states: active, disabled etc. It's important these states are not communicated in colour alone, as outlined in **WCAG2.1 1.4.1: Use of Color**[^5]. Otherwise they will not be perceivable to some colour blind users, and others using non-colour displays.

The movement icons get around this by using a diagonal line-through style for the "off" state (pictured).

![Movement on and movement off icons, with a line through the off version from top right to bottom left](../../static/images/gel-icon-movement.png)

### Text decoration

The CTA (Call To Action) links documented under [**Buttons & CTAs**](../../components/buttons-and-ctas) use a `text-decoration` style on `:hover` and `:focus`. To stop the `text-decoration` line intersecting with the icon, `text-decoration-skip` is employed:

```css
.gel-cta:hover,
.gel-cta:focus {
  border-color: $gel-color--tundora;
  text-decoration: underline;
  text-decoration-skip: objects;
}
```

## Recommended behaviour

SVG icons are typically incorporated into interactive elements, which have their own behaviours. For toggle buttons specifically, the icon should help to communicate the state (on or off; open or closed; etc). This can be achieved by either replacing the icon, or augmenting it in some way.

The play/pause button documented under [**Video controls**](../../components/video-controls) replaces the familiar 'play' triangle with the two vertical lines of 'pause'. Importantly, the textual label (though visually hidden) changes with the corresponding icon to update the state accessibly. At any one time, either the `gel-video-button-off` or the `gel-video-button-on` `<span>` is visible.

```html
<button class="gel-video-play-button" type="button">
  <span class="gel-video-button-off">
    <span class="gel-sr">Play</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-play"></use>
    </svg>
  </span>
  <span class="gel-video-button-on">
    <span class="gel-sr">Pause</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="../../static/images/gel-icons-all.svg#gel-icon-pause"></use>
    </svg>
  </span>
</button>
```

The arrow icon used in the [**Accordion**](../../components/accordions) component faces downwards in the closed/collapsed state, and rotates to point upwards in the open/expanded state. That is, it points in the direction the **Accordion** item's 'drawer' will go. In the code snippet to follow, the `aria-expanded="true"` attribution is the hook to apply the rotation transform.

```css
.gel-accordion-handle [aria-expanded="true"] svg {
  transform: rotate(180deg);
}
```

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: How Users Kill Your Icon Fonts — Tim Teeling, <https://timteeling.com/how-users-break-your-icon-fonts/>
[^2]: Support tabindex in SVG, don't make every `<svg>` focusable by default (issue), <https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8090208/>
[^3]: `aria-label` Is A Xenophobe — heydonworks.com, <http://www.heydonworks.com/article/aria-label-is-a-xenophobe>
[^4]: WCAG2.1 1.4.3 Contrast (Minimum), <https://www.w3.org/TR/WCAG21/#contrast-minimum>
[^5]: WCAG2.1 1.4.1 Use Of Color, <https://www.w3.org/TR/WCAG21/#use-of-color>
