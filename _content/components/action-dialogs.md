---
title: Action dialogs
summary: Action dialogs are presented where the user must choose a course of action
version: 0.1.0
published: true
accessibility: true
linkback: http://www.bbc.co.uk/gel/guidelines/confirmation-and-error-messages
---

## Introduction

GEL defines two generic kinds of alert message:

1. **Purely informative:** indicating something has happened already (and requiring no input on the part of the user).
2. **Requiring action:** asking the user to choose a course of action when a critical impasse has been reached.

The **Action dialog** defines the second of these. It is a type of modal window[^1], restricting interaction to itself until one of the options it presents the user has been chosen. **Action dialogs** should be used sparingly, and only where the user's immediate input is critical to the continuation of their session.

For more context, consult the [Confirmation & Error Messages GEL page](http://www.bbc.co.uk/gel/guidelines/confirmation-and-error-messages).

## Recommended markup

In the following example, we imagine the user has tried to add a programme to 'My Programmes'. Since this functionality is only available to authenticated users, an action dialog asks the user to either sign in or register in order to continue.

```html
  <div class="gel-action-dialog" role="dialog" aria-labelledby="gel-action-dialog__label-1" aria-describedby="gel-action-dialog__desc-1">
    <h3 id="gel-action-dialog-label__1" class="gel-action-dialog__title">Add to enjoy later</h2>
    <div id="gel-action-dialog-desc__1" class="gel-action-dialog__content">
      <p>Sign in to add to My Programmes and enjoy it later on other devices</p>
    </div>
    <div class="gel-action-dialog__buttons">
      <a href="#/path/to/sign-in">Sign in</a>
      or 
      <a href="#/path/to/register">Register</a>
    </div>
    <button class="gel-action-dialog__close">
      <span class="vh">close</span>
      <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
        <use xlink:href="#gel-icon-no"></use>
      </svg>
    </button>
  </div>
</body>
```

### Notes

* **`role="dialog"`:** This `role` is critical for making the dialog behave in an expected way in assistive technologies such as screen reader software. It also identifies the dialog _as_ a dialog when it is opened and focus is placed inside it.
* **`aria-labelledby` and `aria-describedby`:** These relationship attributes associate the text of the dialog's heading/label and content with the dialog element itself. Along with the dialog role, this information is announced upon the dialog being opened. You will need to write or generate unique identifiers for the `id`s required here.
* **`class="gel-action-dialog__buttons"`:** A simple, non-semantic wrapper for the action elements. Action elements must be marked up as `<button>`s if they instigate something on the same page (such as a change of setting or state) or links if they take the user to a new page.
* **`class="gel-action-dialog__close"`:** Provide a close button if doing _nothing_ (not authenticating to add a programme after all, in this example) is a viable option. The visually hidden `vh`[^2] class is provided here to include accessible, translatable text alongside the screen reader inaccessible icon. The close button is deprioritized in favour of the named actions, appearing last in source and focus order.
* **`</body>`:** For the overlay/inert characteristic to function correctly, the dialog must be a child of the `<body>` element. See [Recommended behaviour](#expected-behaviour)

## Recommended layout

**Action dialogs** can appear in the center, or at the bottom, of the page. In the [**reference implementation**](#reference-implementation) they appear at the bottom by default. The `fixed` position value ensures they cannot be scrolled out of view.

```css
.gel-action-dialog {
  position: fixed;
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
}
```

The center configuration requires a `transform` to place the element in the vertical center irrespective of its natural height:

```css
.gel-action-dialog__center {
  top: 50%;
  bottom: auto;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

With this translation in place, dialogs with considerable content will become obscured at the top and bottom of the viewport. To avoid this, the dialog description element (`class="gel-action-dialog__desc"`) is given a `max-height` and allowed to scroll vertically:

```css
.gel-action-dialog__desc {
  max-height: 30vh;
  overflow-y: auto;
}
```

When the dialog is open, sibling elements are given the `inert` attribute (see [**expected behaviour**](#expected-behaviour), below). The inert content should _appear_ inert by diminishing its visibility. Opacity and/or filtering can achieve this effect.

```css
.gel-action-dialog--open [inert] {
  opacity: 0.3;
}
```

Note that the style is applied via a class placed on the `<body>` using the 'gel-action-dialog' namespace. This ensures the specific inert style is only applied in the presence of an open dialog (the style does not 'leak' to other `inert` instances).

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active:

![Borders help demarcate the dialog where high contrast mode is running](../../static/images/hcm_action-dialogs.png)

## Expected behaviour

::: info Results of actions
The result of an action taken via an action dialog will depend on the purpose of your dialog and is not specified here. Attach listeners to the action dialog's controls as appropriate.
:::

### When the dialog opens

1. The dialog element appears in its designated position
2. The surrounding page becomes inert (non-interactive, unavailable to assistive technologies, and not focusable by keyboard)
3. Focus is moved to the first control (a link or button that is not disabled) inside the `class="gel-action-dialog__buttons"` element

### When the dialog closes

1. The dialog is hidden
2. The surrounding page ceases to be inert
3. If the dialog was originally invoked as a response to a user action, the element that invoked the action (such as a button) is refocused

::: alert Interruptions
Interruptions are dialogs that appear spontaneously, without direct invocation (conscious or otherwise) on the part of the user. These are very disruptive, and should be avoided in almost all circumstances. One legitimate use case would be to inform the user of their timed session coming to an end and offering them the opportunity to extend it.

Notifications and status messages that do not require user action should not steal focus. Consider using an ARIA live region instead[^3].
:::

### Keyboard and screen reader experience

Focus is placed inside the dialog upon opening it, meaning keyboard users have access to the functionality and screen reader users are informed of the dialog's presence. When the dialog first opens, a screen reader user will hear the announcement of the dialog role (_"dialog"_), its associated label (title) and description, and the role and label of the initially focused control. 

Users can move focus between the supplied controls and the close button, as well as 'escape' the dialog to focus browser chrome such as the address bar. Only the dialog is available and interactive while it is open, making it [^4 modal] (it presents a 'mode' that suppresses and overrides normal page functionality).

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/action-dialogs.html">

<cta label="Open in new window" href="../demos/action-dialogs/">


## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: "Modal window" (Wikipedia), <https://en.wikipedia.org/wiki/Modal_window>
[^2]: Gist of the `vh` (visually hidden) class,  <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: "Notifications" (Inclusive Components blog), <https://inclusive-components.design/notifications/>
[^4]: "The current state of modal dialog accessibility" <https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/>