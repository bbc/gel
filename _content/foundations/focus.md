---
title: Focus
summary: Indicating and managing focus is integral to keyboard accessibility
version: 0.1.0
published: true
---

## Introduction

When discussing access to web content, we often use the term assistive technologies[^1]: software and devices to help those with disabilities. However, assistive technologies, unlike _adaptive technologies_ (such as hearing aids), do not just address disability. A screen reader is not just for blind and vision-impaired users; it can be called upon to address educational and productivity requirements as well.

It’s misleading to think that the term "keyboard users" only applies to disabled people. The keyboard, whether mechanical or virtual, is used by most anyone at some point during interaction. All people use keyboards; some depend on them more than others.

For many, including those with temporary injuries and long term ailments, operating a mouse (or 'pointer') is not easy. The keyboard is _assistive_ in that it provides an alternative means of selecting and activating interactive content — one that does not require fine motor control.

Accordingly, WCAG2.1 has a number of success criteria that cover keyboard navigation access. **Keyboard Accessible**[^2] is its own section, and is complemented by the **Focus Order** and **Focus visible** rules under **Navigation**[^3].

The purpose of this guide is to collate the various keyboard accessibility considerations for BBC content.

## Recommended markup

Only interactive elements should be focusable by keyboard. If an element does not do anything when pressed, clicked, or tapped, it should not appear in _focus order_: the succession of elements focusable by using the <kbd>Tab</kbd> key.

The HTML standard offers a handful of elements for interactive purposes, including links (`<a>`), buttons (`<button>`), and form controls. These are not only focusable by default, but each provide an implicit _role_. The role identifies the class of element non-visually. For example, a link is identified as _"link"_ and a button as _"button"_ in screen reader output upon focusing the element. Blind and vision-impaired screen reader users are typically keyboard users, since they cannot (easily) perceive the interface's topology in order to guide a mouse/pointer.

We recommend that only semantic HTML be used for interactive elements. Creating accessible interactive elements for non-semantic markup is verbose and less robust.

### <mark is="bad"> JavaScript dependency

The following will be identified as a button, and focusable with the application of a `tabindex` value of `0`[^4]. However, it cannot be activated like a `<button>` by keyboard unless a keyboard event listener (for <kbd>Enter</kbd> and/or <kbd>Space</kbd> key presses) is supplied by JavaScript.

```html
<div class="button" role="button" tabindex="0">Press me</div>
```

### <mark is="good"> Built in behaviour

The `<button>` element does not require an explicit ARIA role, and it is focusable by default. Click events are triggered by <kbd>Enter</kbd> and/or <kbd>Space</kbd> automatically.

```html
<button class="button">Press me</button>
```

### Focus order

Focus order is the order in which interactive elements receive focus. Interfaces become confusing for sighted keyboard users when the focus order is at odds with the visual layout. This is exacerbated by magnification: when a user is zoomed in and navigating by focus, the interface may take them in unexpected directions and to unexpected locations.

There are two main things that are likely to disrupt focus order:

#### Positive `tabindex` values

By default, focus order follows source order: the order that the elements appear in the markup. But numbered `tabindex` values override this. That is: an element with `tabindex="1"` will be the first focusable element on the page regardless of the source order. Navigation by keyboard would likely mean passing over interactive content — content that would become focusable _after_ the `tabindex="1"` element has been unfocused. This is unlikely to be desirable. 

Avoid positive `tabindex` values.

#### Layout augmentation

On English language websites, flow content is laid out from top to bottom (the _block flow direction_) and inline content from left to right (the _writing direction_)[^5]. However, this can be disrupted by an improper use of some CSS layout techniques. 

For example, the first (in source order) of two flow elements could be floated right, and the second floated left. This effectively _reverses_ their visual order. If either element is focusable, or contains focusable content, the focus order will contradict the reading order.

```css
:first-child {
  float: right;
}

:last-child {
  float: left;
}
```

The `order` property, available in Flexbox and Grid contexts, can reorder elements along either the horizontal or vertical axes. 

```css
.flex {
  display: flex;
}

.flex > :first-child {
  order: 2;
}
```

As detailed in [**Grids**](../grids#order), `order` should be avoided, especially where interactive content is involved.

## Recommended layout

As the **WCAG2.1 2.4.7 Focus Visible** mandates: _"any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible"_. Without visible indication, it's not easy to tell which element currently has focus, if any.

User agents provide focus styles by default, but these diverge considerably, and are not sufficient under many circumstances[^6]. 

To normalize browser behaviour, and make focus styles more apparent, remove the default style and provide your own. Any CSS declaration can be applied to the `:focus` state, but be mindful that focus styles are _functional_ styles, and must be visible under all circumstances. 

Be aware that in some browsers background images are eliminated when Windows High Contrast Mode is active, and changes to _colour alone_ could fail **WCAG2.1 1.4.1 Use of color**[^7], so ensure that you provide a reasonably thick `outline` using a colour with adequate contrast against all the backgrounds on the page where it could be visible. One simple way to achieve this is to set the outline colour to share the text's `color`. This should be safe since the contrast for the text will already differentiate it from its background. The CSS to implement that simply omits the `color` property:

```css
:focus {
  outline: 2px solid;
}
```

You may find your mouse users are confused or distracted by the focus style appearing when the element is clicked (activation and focus happen simultaneously). With progressive enhancement, you can suppress focus styles for mouse users in browsers that support `:focus-visible`.

```css
:focus {
  outline: 2px solid;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

The second declaration block is dropped in browsers not supporting `:focus-visible`, meaning the first declaration remains intact and all keyboard users are provided focus styles.

## Recommended behaviour

Your principle responsibility towards focus behaviour is not to disrupt standard browser behaviour for focus. Only interactive elements should typically receive focus, and in an expected and logical order. As already covered, you should therefore avoid positive `tabindex` values, and visual arrangements that contradict source order. Users should be able to press <kbd>Tab</kbd> to focus the next interactive element, and <kbd>Shift</kbd> and <kbd>Tab</kbd> to focus the previous one.

In rare cases, programmatic focus (focus elicited on the user's behalf) _is_ necessary. For example, [**Action dialogs**](../../components/action-dialogs) must take focus upon being opened. If not, the keyboard user would not be able to easily locate and operate that dialog's controls. It's important components like dialogs have the correct semantic information (in this case: `role="dialog"` and an associated label). This information provides context when the user's focus is moved, letting them know what has happened and where they are.

Sometimes, as outlined in [**Routing**](../routing), it's beneficial to move focus to a non-interactive element, such as a heading. This is legitimate so long as the element is not made _user_-focusable. A `tabindex` value of `-1` allows the element to be focused using JavaScript's `focus()` method _without_ placing it in focus order. It's a technique whereby the user's focus position can be moved without creating confusion or obstruction.

For convenience, here is the code from [**Routing**](../routing), describing how to focus a single-page application's view upon route change. By focusing the heading, its content is announced in screen reader software, identifying the newly loaded view to the screen reader user.

```js
const mainHeading = document.querySelector('h1');
mainHeading.tabindex = -1;
mainHeading.focus();
```

In React, you would defer to the `refs` API:

```js
// Initialize <h1 ref={this.mainHeading} tabindex="-1">Brexitcast</h1>
this.mainHeading = React.createRef();

// Focus the ref's DOM node (accessible as `current`)
this.mainHeading.current.focus();
```

### Keyboard traps

Under all circumstances, it should be possible to leave the web page, and the browser, via keyboard. Accordingly, **WCAG2.1 2.1.2 No Keyboard Trap**[^8] mandates focus can be moved _away_ from any focusable element. 

Restricting focus to the inside of a dialog (and between the various dialog elements) is not recommended. This technique makes it difficult for users to focus and operate parts of the browser chrome  outside viewport, such as the address bar.

Instead, as outlined in [**Action dialogs**](../../components/action-dialogs), all content outside of the dialog should receive the `inert` property while the dialog is open. This property (and its polyfill[^9]) removes content from both focus order and screen reader announcement. The dialog becomes the only focusable context _by default_ and explicitly confining focus to the dialog by augmenting focus order is no longer necessary.

```html
<div class="content" inert></div>
<div role="dialog" open>...</div>
```

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Assistive technology — Wikipedia, <https://en.wikipedia.org/wiki/Assistive_technology>
[^2]: WCAG2.1 2.1 KeyboardAccessible, <https://www.w3.org/TR/WCAG21/#keyboard-accessible>
[^3]: WCAG2.1 2.4 Navigable, <https://www.w3.org/TR/WCAG21/#navigable>
[^4]: Using the `tabindex` attribute — The Paciello Group, <https://developer.paciellogroup.com/blog/2014/08/using-the-tabindex-attribute/>
[^5]: `writing-mode` — MDN, <https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode>
[^6]: Avoid default browser focus styles — Adrian Roselli, <http://adrianroselli.com/2017/02/avoid-default-browser-focus-styles.html>
[^7]: WCAG2.1 1.4.1 Use of color, <https://www.w3.org/TR/WCAG21/#use-of-color>
[^8]: WCAG2.1 2.1.2 No Keyboard Trap, <https://www.w3.org/TR/WCAG21/#no-keyboard-trap>
[^9]: WICG `inert` (polyfill), <https://github.com/WICG/inert>

