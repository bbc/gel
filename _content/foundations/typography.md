---
title: Typography
summary: Inclusive content must be readable, and for it to be readable it must first be legible
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/typography
---

## Introduction

Performant typography starts with a superior typeface. The Reith typeface manifests the BBC's typographic identity, and is designed to _"improve the experience of reading for everyone, regardless of ability, context or canvas"_[^1]. The typeface conundrum has been solved, leaving just typesetting best practices to be observed.

## Font size

The most fundamental provision for accessible type is font size. The body `font-size` must be

1.  Reasonably large by default
2.  Adjustable by different means

GEL [type sizes](https://www.bbc.co.uk/gel/guidelines/typography#type-sizes) for body text range between 15 and and 18 pixels, depending on the screen dimensions. Although these are prescribed in terms of pixels, they should always be _set_ in relative units such as `em`s and `rem`s.

The reason for this is that a not insignificant number of users (about the same number as there are Microsoft Edge users[^2]) adjust the default font size at a browser or operating system level. Text set in `px` _does not_ honor that setting.

Accordingly, the root `font-size` should be set as a percentage of the user's chosen size, and all other sizes should be relative to this one.

```css
:root {
  font-size: 100%; /* the default value; this line is not needed */
}

h2 {
  @include gel-typography("trafalgar"); /* translates to 2rem */
}

small {
  @include gel-typography("brevier") /* translates to 0.8125rem */;
}
```

Use font sizes in the scale smaller than 'Body Copy' sparingly, and only for supplementary, tangential information. A [live demonstration of the type scale](https://bbc.github.io/gel-typography-v2/v2) is available for comparison.

### Pinch zoom

In addition, be sure not to suppress zooming by touch on handheld devices. This prohibits users from being able to increase font size, and creates a number of unwanted restrictions[^3]. Your viewport meta tag should omit `user-scalable=no` to look like the following:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Alignment

There are a number of typographic techniques that have an impact on readers' ability to scan text content. Many of these, including the mandate not to justify text, are covered under **WCAG2.1 1.4.8 Visual Presentation**[^4]. Despite this success criterion belonging to the AAA level, you should adhere closely to the advice. Visually dyslexic readers in particular will benefit.

Justified text (text aligned along both margins) is achieved by varying the spacing between words, disrupting the regularity of the layout and increasing cognitive strain. Instead, align text along the left hand side. Since this is the default behavior in most browsers the following should not be necessary.

```css
p {
  text-align: left;
}
```

## Measure

A measure (line length) that is too long makes it difficult for readers to scan back and find the next line in order to continue. **WCAG2.1 1.4.8 Visual Presentation**[^4] recommends a measure of no more than 80 characters, but between 60 and 70 is better still.

The measure must be:

1.  Set using an appropriate unit
2.  Allowed to decrease in accordance with the width of its containing element

A measure set in pixels is not relative to `font-size`, permitting measure to lengthen as the `font-size` is decreased. Instead, measure should be set in `ch`. `1ch` is roughly equal to the width of one character. Set the value using `max-width` to allow text wrapping.

```css
p {
  max-width: 65ch;
}
```

## Leading and white space

**WCAG2.1 1.4.8 Visual Presentation**[^4] recommends a leading (line height) for body text of no less than 1.5. However, this should be treated as a baseline since—as recommended by The Elements Of Typographic Style For The Web[^5]—the leading should be chosen to suit the metrics of the font. A comfortable leading for body copy set in Reith Serif is `1.375`.

It's most important that the `line-height` is not hard-coded using the `px` unit, since this restricts it from adjusting automatically in accordance with `font-size`. The following uses the unitless multiplier `1.375` meaning _"1.375 times the font size"_.

```css
p {
  line-height: 1.375;
}
```


The most efficient way to manage white space between successive blocks of text while maintaining a good vertical rhythm[^6] is to make each space a multiple of the line height. Typically, paragraphs are spaced using one whole line. In the following example, successive paragraphs receive a margin of `1.375rem` to separate them.

```css
p + p {
  margin-top: 1.375rem;
}
```

Cognition depends heavily on a sense of belonging, so ensure that related elements are separated with more white space than those that are unrelated. For example, the white space between a preceding section and a heading should be greater than the white space between the heading and the first paragraph of its own section.

```css
h2 {
  margin-top: 2.75rem; /* two lines (2 * 1.375); maintains vertical rhythm */
  margin-bottom: 1.375rem;
}
```

Larger text, such as `<h1>` and `<h2>` headings, benefits from a reduced `line-height`/leading. `1.125` is a recommended value.

## All caps

Text set in all caps (`text-transform: uppercase`) is harder to read because the characters become similarly 'square' in their occupation of space, and harder to differentiate. Many screen readers also have a habit of interpreting any all-caps text as acronyms, reading words out letter-by-letter. It should, therefore, be avoided in almost all cases.

Acronyms and initialisms must appear in all-caps. Improve their legibility by increasing their `letter-spacing` by something in the order of 10%, as suggested in The Elements Of Typographic Style For The Web[^5]:

```css
abbr {
  letter-spacing: 0.1em;
}
```

Do _not_ increase the `letter-spacing` of sentence-case text. The Reith typeface is designed for optimal legibility without adjusting the tracking.

## Links

It is important that links are clearly differentiated from surrounding text. As mandated by **WCAG2.1 1.4.1 Use of color**[^7] this means not differentiating links by colour alone. Not all people can (accurately) perceive colour differences, and not all devices and screens accurately convey colour.

The BBC has traditionally used heavier font-weighting to visually differentiate linked text from surrounding body text, adding an underline that appears on hover or focus. You can follow this established convention by incorporating the underline indicator in your links depending on the hover / focus state, using either `text-decoration: underline` or a border. Where `text-decoration` is employed, you can increase legibility by preventing the line from intersecting the font's [descenders](https://en.wikipedia.org/wiki/Descender). Note that some browsers now support `text-decoration-skip-ink` by default.

```css
p a:hover, p a:focus {
  text-decoration: underline;
  text-decoration-skip-ink: auto;
}
```

Avoid using underlined text on general text to prevent it being mistaken for a link. Highlight `<mark>` text using a background colour instead.

As set out under [**Buttons and CTAs**](/gel/components/buttons-and-ctas/), call-to-action links and buttons should be differentiated visually to reflect their differing behaviour.

## Contrast

It's imperative there is sufficient contrast between foreground text and backgrounds, in line with **WCAG2.1 1.4.3 Contrast**[^8].

There are a number of tools for calculating the contrast ratio, including the [Color Contrast Analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/) software developed and maintained by The Paciello Group.

Avoid placing text over complex images such as photographs. Even where the contrast is sufficient, the intersection of characters with complex background shapes and lines impedes legibility.

## Unicode and emoji

The support for unicode differs wildly between platforms, with handheld devices tending to support smaller subsets of unicode points. Where a point is not supported, a square fallback symbol (with a confusing resemblance to a checkbox in some contexts) appears instead.

In general, avoid unicode symbols in favor of SVG-based icons. These are documented under [**Iconography**](../iconography). Icon fonts in particular should be avoided since they tend to map their icons to esoteric / undesignated unicode points. Where users, such as those with dyslexia, override the author's font settings with a user stylesheet, the icons give way to fallback 'missing glyph' symbols.

Note that screen readers will ignore some unicode points, and interpret others in unexpected ways. For example, the × symbol frequently used for close buttons can be announced as _"times"_. If you _are_ to use this relatively well supported unicode point, silence the unicode point in screen reader output with `aria-hidden="true"`. In the following example, the _"close"_ text label is visually hidden, but still included in screen reader output, using the `gel-sr` class.

```html
<button>
  <span aria-hidden="true">&times;</span>
  <span class="gel-sr">Close</span>
</button>
```

Emoji are rendered via unicode as well, but are more likely to be perceived as images. Some CMSs and social media platforms even replace the code point with their own image. Where the character is used, it's important to present it _as_ an image, with an accompanying text alternative[^9].

```html
<span role="img" aria-label="Snowman">&#9731;</span>
```

This exposes the character as an image in the accessibility tree[^10], enabling screen readers to identify it as such.

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Introducing Reith: The new face of the BBC — BBC GEL, <http://www.bbc.co.uk/gel/articles/introducing-bbc-reith>
[^2]: Pixels Verus Ems: Users Do Change Font Size — Evan Minto,  <https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773>
[^3]: Don't Disable Zoom — Adrian Roselli, <http://adrianroselli.com/2015/10/dont-disable-zoom.html>
[^4]: WCAG2.1 1.4.8 Visual Presentation, <https://www.w3.org/TR/WCAG21/#visual-presentation>
[^5]: The Elements Of Typographic Style For The Web, <http://webtypography.net/2.2.1>
[^6]: Compose To A Vertical Rhythm — A List Apart, <https://24ways.org/2006/compose-to-a-vertical-rhythm>
[^7]: WCAG2.1 1.4.1 Use Of Color, <https://www.w3.org/TR/WCAG21/#use-of-color>
[^8]: WCAG2.1 1.4.3 Contrast (Minimum), <https://www.w3.org/TR/WCAG21/#contrast-minimum>
[^9]: Accessible Emoji — Léonie Watson, <https://tink.uk/accessible-emoji/>
[^10]: The Accessibility Tree — Google Developers, <https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree>
