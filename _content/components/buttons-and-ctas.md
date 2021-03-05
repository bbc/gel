---
title: Buttons and CTAs
summary: The design of clickable controls must be consistent with their behaviour
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/sign-in-or-register-cta
---

## Introduction

BBC buttons and calls-to-action differ widely in form and purpose. But they should conform to some fundamental rules. Only where these rules are observed will the user experience comfortable interaction.

The most important of these rules is that the `<a>` and `<button>` elements are assigned to appropriate respective tasks. That is: links should be used where navigation is elicited, and `<button>`s where a non-navigational action is being invoked. For example, a 'Sign in' control would suit a `<button>` because its job is to submit the sign in form. An adjacent 'Register' call-to-action—taking the user to a different form, in a different page or screen—would benefit from `<a>` semantics.

This is especially helpful for assistive technology users, such as those running screen reader software. An element announced as a link that behaves as a button creates a confusing and off-putting experience. The visual design of buttons and calls-to-action should also be indicative of their behavior. Where button state changes, this change should be visually represented as well.

## Recommended markup

### Basic call-to-action link

In most cases, a call-to-action should be marked up as a link, since the behaviour is typically to transport the user to a new page or section[^1]. Standard link markup should be used, including an `href` (links omitting `href` attributes are not focusable by keyboard).

A class is provided to the element as a styling hook, enabling it to be differentiated from generic links visually.

```html
<a class="gel-cta" href="path/to/location">Enter the competition</a>
```

### Basic button

It is imperative clickable controls not eliciting link-like behaviour are marked up as `<button>` elements. Any buttons not intended for submitting forms should take `type="button"`[^2]. This is especially important _inside_ a `<form>`, since some user agents consider any `<button>` found without an explicit type to be a form's submit button.

```html
<button class="gel-button" type="button">Calculate tax</button>
```

As a rule of thumb: if a clickable control is intended for running JavaScript, it should be a `<button>` with `type="button"`.

### Labels

Most buttons and calls-to-action should simply be labeled via their text node. Text nodes are interoperable, since they can be seen, heard via screen reader synthetic voices, and used as activation cues with voice activation software.

In most cases, controls that rely on icons alone are not recommended, even where invisible labels are provided to assistive technologies. Icon-only buttons are especially hard to activate via voice since the (hidden) textual label has to be guessed by the user.

Where an icon-only button _is_ employed (the ubiquitous play/pause button is a good example), provide the text via a visually hidden `<span>`, _not_ `aria-label`. Unfortunately, `aria-label` is not picked up by popular translation services[^3].

```html
<button class="gel-button" type="button">
  <!-- icon here -->
  <span class="gel-sr">Play</span>
</button>
```

Avoid using `title` attributes. These are only revealed on hover, not focus, in most browsers. Additionally, they are often suppressed by default in screen reader verbosity settings.

### Icons

Where icons are provided to buttons and calls-to-action, make sure they are taken from the GEL SVG Iconography library[^4]. Icons should contain text or be otherwise accessible to assistive technologies, nor should they be focusable. Hence, they should take `aria-hidden="true"` and `focusable="false"`. Note the classes, used for sizing and alignment.

```html
<a class="gel-cta" href="path/to/help-page">
  <span class="gel-button__label">Help</span>
  <svg aria-hidden="true" focusable="false">
    <use xlink:href="#help"></use>
  </svg>
</a>
```

### States

#### Disabled state

Standard `<button>` elements can be disabled using the `disabled` property/attribute. Beware that adding `disabled` makes the `<button>` unfocusable. This may cause confusion among some screen reader users and users exploring by <kbd>Tab</kbd> at a high zoom level. You can make disabled buttons focusable again by adding `tabindex="0"`.

```html
<button class="gel-button" type="button" disabled tabindex="0">Download</button>
```

::: info Avoid disabled submit buttons
There are a number of usability and accessibility issues with disabling form submit buttons until the user has entered valid/expected data[^5]. It's often better to let the user _attempt_ submission and provide explicit feedback in response.
:::

Links do not take `disabled`. You can, however, elicit announcement that a link is 'disabled' by applying the `aria-disabled="true"` attribution.

```html
<a class="gel-cta" href="path/to/forbidden-place" aria-disabled="true">The forbidden place</a>
```

Either apply `event.preventDefault()` or remove the `href` to functionally disable the link. As previously mentioned, removing the `href` makes the link unfocusable. As with `<button>`s, you can reinstate focus using `tabindex="0"`. 

#### Toggle states

WAI-ARIA provides a suite of state attributes, many applicable to buttons. Two of the most common are `aria-pressed` and `aria-expanded`, which define two kinds of toggle state. The first denotes a kind of on/off switch, and the second indicates whether an associated/controlled element is expanded (visible) or collapsed (hidden).

The presence of these state attributes augments the announced role of the `<button>` from _"button"_ to _"push button"_ or _"toggle button"_ (depending on the state and assistive technologies involved). It is therefore important that the attribute is always present, and carries an explicit `true` or `false` value.

```html
<!-- collapsed -->
<button class="gel-button gel-button-switch" type="button" aria-expanded="false">More info</button>

<!-- expanded -->
<button class="gel-button gel-button-switch" type="button" aria-expanded="true">More info</button>
```

::: alert Use native checked states
It is not recommended you use `<button>` elements with `aria-checked`. Instead, employ native checkbox and radio button elements. The basic behaviours of these elements do not rely on JavaScript and make for more robust and accessible components.
:::

Buttons may move focus upon being pressed. Examples include buttons that open dialogs, or invoke menus. In these circumstances, include the `aria-haspopup="true"` property[^6]. This warns the screen reader user their context will change by announcing the button as a _"popup button"_ or similar.

If the button simply moves focus to a new section within the page, or to a new page entirely, it should not be a button but a link. Us a generic link or CTA instead.

## Recommended layout

Button and CTA design differs somewhat between BBC sites and products. However, there are basic principles you should follow.

1. **Be consistent:** All of your buttons should share the same basic design, and so should all of your CTAs. Be consistent with colour, font size and weight, and padding.
2. **Differentiate buttons and links:** It is recommended your CTAs are visually distinct from your `<button>`s: form should follow function. A common approach is to give all `<button>`s a background colour, but make CTAs 'ghosts' (with a transparent background but a surrounding border).
3. **Give affordance:** Make sure your buttons and CTAs invite the user to click them. Use the site's established link colour, if not just inherited; include clear hover and focus styles (see below); use imperative language.

::: alert Contrast
No matter the brand colours employed, the contrast between the foreground (text) and background colours must meet minimum contrast requirements (WCAG Level AA[^7])
:::

### Hover and focus styles

Hover and focus styles should be strong to differentiate them from the default state.

Since buttons and CTAs tend to have a rectangular border/perimeter, the thin and faint focus outline offered by some user agent stylesheets can be very unclear. If an outline style is used, make it a solid one, optionally with an offset to separate it from the control's edges.

```css
.gel-button:focus, .gel-cta:focus {
  outline: 2px solid; /* adopts the font color */
  outline-offset: 2px;
}
```

It is recommended call-to-action links take `text-decoration: underline` on `:hover`/`:focus`. This way, if it is not already clear the element is a link, this becomes clearer under scrutiny. The [Reference implementation](#reference-implementation) employs `text-decoration-skip: objects` to remove the underline from any icon that might be present.

### Indicating state

Toggle buttons using `aria-pressed` or `aria-expanded` (see [#toggle-states]) should clearly indicate which state is current. On/off (`aria-pressed`) can achieve this by explicitly including the the text 'on' or 'off'. This text should be removed from screen reader output with `aria-hidden="true"` since the state is already announced via `aria-pressed` itself. 

```html
<!-- night theme inactive -->
<button class="gel-button gel-button-switch" type="button" aria-pressed="false">
  Night theme
  <span aria-hidden="true">off</span>
</button>

<!-- night theme active -->
<button class="gel-button gel-button-switch" type="button" aria-pressed="true">
  Night theme
  <span aria-hidden="true">on</span>
</button>
```

### High contrast mode

Windows High Contrast Mode tends to remove the background from buttons, making them appear as simple text. To reinstate their 'boxy' shape, we can apply a transparent border[^8]. This border will become visible when Windows HCM is running.

```css
.gel-button, .gel-cta  {
  border: 2px solid transparent; /* for high contrast mode */
}
```

![The boxy shape is retained by applying a border on all sides](../../static/images/hcm_buttons_and_ctas.png)

## Recommended behaviour

Where `<a>` and `<button>` links are employed correctly for CTAs and buttons respectively, browsers will invoke the standard and expected behaviours. These are as follows.

### Links

* The element is identified as a link via assistive technologies
* The element is focusable by keyboard
* The element can be activated by mouse click, touch, and with the <kbd>Enter</kbd> key
* The link-specific context menu can be invoked using the right mouse button, or <kbd>Shift</kbd> + <kbd>F10</kbd> (Windows)
* The element can be dragged by mouse to the browser bookmarks bar

### Buttons

* The element is identified as a button via assistive technologies
* The element is focusable by keyboard
* The element can be activated by mouse click, touch, and with the <kbd>Enter</kbd> and <kbd>Space</kbd> keys
* The `type="submit"` attribution enables the button to submit a parent `<form>`
* The `disabled` attribution (Boolean) makes the button unfocusable (by default; see [disabled state](#disabled-state)) and identifies the button as disabled via assistive technologies

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/buttons-and-ctas.html">

<cta label="Open in new window" href="../demos/buttons-and-ctas/">


## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Anchors, buttons, and accessibility — Formidable Labs, <https://formidable.com/blog/2014/05/08/anchors-buttons-and-accessibility/>
[^2]: The `button` element — W3C, <https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html#the-button-element>
[^3]: ARIA Label Is A Xenophobe — heydonworks.com, <http://www.heydonworks.com/article/aria-label-is-a-xenophobe>
[^4]: GEL Iconography (demo), <http://bbc.github.io/gel-iconography/>
[^5]: Disabled Buttons Suck — Access Lab, <https://axesslab.com/disabled-buttons-suck/>
[^6]: `aria-haspopup` property — W3C, <https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup>
[^7]: WCAG2.1 1.4.3, Contrast (Minimum), <https://www.w3.org/TR/WCAG21/#contrast-minimum>
[^8]: Transparent border for high contrast mode (test case) — Joe Watkins, <https://codepen.io/joe-watkins/pen/mApBvo>
