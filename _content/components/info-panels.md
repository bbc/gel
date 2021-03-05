---
title: Information panels
summary: The information panel is a specialized popup panel for supplementary content and functionality
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/information-panel
---

## Introduction

The **Information panel** borrows from both the Menu Button[^1] and Dialog[^2] ARIA authoring patterns. Most of the behaviour and semantics are in line with the Menu Button, but a close button is included like that of a dialog. Many of the accessibility features, including the management of focus between the button and panel support for closing the panel using the <kbd>Esc</kbd> key are present in both Menu Button and Dialog implementations.

As the [GEL definition attests](https://www.bbc.co.uk/gel/guidelines/information-panel), the content of the panel is not strictly prescribed and can contain a combination of text, images, links, and other information and functionality. This document sets out the **Information panel** as a functional interaction mechanism, and the [Reference implementation](#reference-implementation) only contains basic example content. The [**Share tools** component](../share-tools) incorporates sharing functionality in an **Information panel**

## Recommended markup

The following structure is expected, with notes to follow. 

```html
<div class="infopanel-example gel-infopanel">
  <button class="gel-button gel-infopanel__button" type="button" aria-haspopup="true" aria-expanded="false">More info</button>
  <div class="gel-infopanel__panel" role="group" aria-labelledby="unique-ref" style="width: 15rem;" hidden>
    <div class="gel-infopanel__title-area"><span id="unique-ref" aria-hidden="true">More info</span>
      <button class="gel-infopanel__close-button">
        <span class="gel-sr">close</span>
        <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
          <use xlink:href="path/to/static/images/gel-icons-all.svg#gel-icon-no"></use>
        </svg>
      </button>
    </div>
    <!-- panel content -->
  </div>
</div>
```

* **`class="gel-button"`:** A standard `<button>` element takes the `aria-haspopup="true"` property and `aria-expanded="false"` state. The former indicates that the button secretes a popup (panel) and the later (set to `false` initially) indicates whether that popup is in an expanded or collapsed state.
* **`class="gel-infopanel__panel"`:** The panel itself takes `role="group"` to indicate it's contents are related. A standard Menu Button[^1] would expect `role="menu"` here, but that would prescribe the presence of menu items (`role="menuitem"` etc.). Because **Information panel** contents diverge between instances, a more generic parent role is used.

* **`aria-labelledby`:** This associates the panel with its title's `id` (`id="unique-ref"` in this example). This ensures the title is read out as the screen reader enters the panel.
* **`gel-infopanel__close-button`:** The close button has a visually hidden (but available to assistive technologies) text label of _"close"_ to supplement the visible 'X' icon. The visually hidden span (achieved with `class="gel-sr"`) is preferred to using `aria-label` since `aria-label` is not translated by Google's or Microsoft's translation services[^3]. 
* **`focusable="false"` and `aria-hidden="true"`:** Each icon, taken from the [Gel Iconography suite](http://bbc.github.io/gel-iconography/) must take these attributes to ensure the icon is not in focus order and is not erroneously identified by assistive technologies.

## Recommended layout

The most important aspect of the layout is the alignment of the panel to its invoking button. If the button is to appear towards the left of the screen, the panel should align with the button's left hand side and 'poke out' to the right. If the button is towards the right of the screen, the reverse should be true.

The [Reference implementation's](#reference-implementation) constructor accepts an options object that lets you set the horizontal (`hAlign`) and vertical (`vAlign`) alignment of the panel, as well as the panel's width:

```js
// The default settings for the tab interface
var settings = {
  hAlign: 'left',  // or 'center' or 'right'
  vAlign: 'below', // or 'above'
  width: '15rem'   // width of the panel
};

// Overwrite defaults where they are provided in options
for (var setting in options) {
  if (options.hasOwnProperty(setting)) {
    settings[setting] = options[setting];
  }
}
```

Central alignment is achieved with a CSS transform, meaning any width of panel will automatically align centrally:

```css
.gel-infopanel__center {
  transform: translateX(-50%);
  left: 50%;
}
```

The width is overridden by a `max-width` where overflow (and the panel being obscured) would otherwise be an issue. This is hard-coded at `80vw`, with `20vw` subtracted to help address padding that might apply to the document's left and right sides.

```css
.gel-infopanel__panel {
  text-align: left;
  background-color: $gel-color--alto;
  position: absolute;
  max-width: 80vw;
}

```

### Arrows

The directional arrow, pointing from the panel to the button, is considered a progressive enhancement. It is achieved—where supported—with `clip-path` and `@supports`[^4]. This technique is preferred to the CSS triangle trick[^5] which uses transparent borders and is liable to fail in Windows High Contrast Mode (each border/side will become non-transparent and the arrow will appear as a square).

```css
@supports (clip-path: inset(100%)) {
  .gel-infopanel__panel::after {
    content: '';
    display: inline-block;
    background-color: inherit;
    width: 0.75rem;
    height: 0.75rem;
    position: absolute;
  }

  .gel-infopanel__below::after {
    clip-path: polygon(0 100%, 50% 0, 100% 100%);
    top: calc(-0.75rem + 1px); /* suppress rounding errors */
  }

  .gel-infopanel__above::after{
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    bottom: calc(-0.75rem + 1px); /* suppress rounding errors */
  }

  .gel-infopanel__left::after {
    left: 1.5rem;
  }

  .gel-infopanel__right::after {
    right: 1.5rem;
  }
  
  .gel-infopanel__center::after {
    left: calc(50% - 0.375rem);
  }
}
```

### `z-index`

For the panel to be positioned in alignment with its invoking button, the parent `class="gel-infopanel"` element must take `display: inline-block` and `position: relative`. However, `position: relative` is _only_ applied (via a toggled `gel-infopanel__showing` class) when the panel is shown. This avoids `z-index` stacking issues caused by too many positioned elements being on the page.

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. Transparent border styles appear when Windows HCM is activated, defining the shape of the menu in the absence of the removed `background-color`.

![A border around the button and menu defines their respective shapes](../../static/images/hcm_infopanel.png)

## Recommended behaviour

### Without JavaScript

Without JavaScript the component cannot function. Since it is only intended for _"not essential information"_, the [Reference implementation's](#reference-implementation) hides the component where JavaScript is absent:

```css
.gel-infopanel {
  display: none; 
}

.gel-infopanel__with-js {
  position: relative;
  display: inline-block;
}
```

However, it is recommended a copy of the contents of the **Information panel** are available to users without JavaScript available. If not, users without JavaScript are denied the same detail of information.

```html
<div class="gel-infopanel">
  <!-- panel contents -->
</div>
...
<noscript>
  <!-- panel contents -->
</noscript>
```

### With JavaScript

When correctly initialised, the **Information panel** allows the mouse or touch user to interact with it in the following way:

* Clicking the button opens the panel
* Clicking the button again closes the panel
* Clicking the close button closes the panel
* Clicking outside the open panel closes the panel

In addition, there are a number of considerations for keyboard and screen reader users:

* When the panel is opened, focus is moved inside the panel onto the close button. In screen readers, this triggers the following announcement (or similar): _"Close button, [panel title], group"_. That is, they are made aware they are in a group element, what it is called, and that they can dismiss this element (the panel) with the currently focused button.
* When the user activates the close button or hits the <kbd>Esc</kbd> key to close the panel, focus is returned to the invoking button
* When the keyboard user tabs forward past the last interactive element in the menu (a link, button, or form control) the panel closes
* The invoking button tracks state with `aria-expanded`. In the expanded state (`true` value) the button is announced as _"toggle button, expanded"_ (or similar). In the collapsed state (`false` value) it is announced as _"toggle button, collapsed"_.

::: alert Avoid keyboard traps
In order to achieve modality, dialog implementations often 'trap' focus within them. Even in a dialog, this approach to focusing the user's attention is not recommended, since it makes it difficult to leave the page. In fact, it is a failure under WCAG2.1 2.1.2 Keyboard Trap[^6] and use of `inert` is preferred (see the [**Action dialog**](../action-dialogs)).

The **Info panel**, like the standard Menu Button[^1] pattern, does not need to resort to a keyboard trap or `inert`, especially since its designated content is _"not essential information"_. Instead, the keyboard user is afforded a number of methods for dismissing the panel:

1. Re-clicking the invoking button
2. Pressing <kbd>Esc</kbd>
3. Tabbing out of the menu
4. Pressing the close button

Offering choice[^7] makes it more likely that users will find a way to achieve the task — and a way that best suits their mode of interaction.
:::

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/info-panels.html">

<cta label="Open in new window" href="../demos/info-panels/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: ARIA Authoring Practices: Menu button — W3C, <https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton>
[^2]: ARIA Authoring Practices: Dialog — W3C, <https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal>
[^3]: ARIA-label Is A Xenophobe — heydonworks.com, <http://www.heydonworks.com/article/aria-label-is-a-xenophobe>
[^4]: `@supports` — MDN, <https://developer.mozilla.org/en-US/docs/Web/CSS/@supports>
[^5]: CSS Triangle — CSS-Tricks, <https://css-tricks.com/snippets/css/css-triangle/>
[^6]: WCAG2.1 2.1.2: Keyboard Trap, <https://www.w3.org/TR/WCAG21/#no-keyboard-trap>
[^7]: Offer choice — Inclusive Design Principles, <https://inclusivedesignprinciples.org/#offer-choice>


