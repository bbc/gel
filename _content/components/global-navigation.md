---
title: Global Navigation
summary: The global navigation enables movement between different products. 
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/masthead
---

## Introduction

The core purpose of the global navigation is to provide navigation between BBC products. It also allows users to access their account or notifications. The global navigation also provides users with a method to search the BBC or a BBC service (such as iPlayer)

This document contains the intended designed experience for the global navigation pattern. Specific attention has been taken to include high risk user groups. For example, older users, users of assistive technology and users who customise fonts, colours and backgrounds. 

The navigation is intended for use by all groups apart from children under 5.

Technical scope:

1. **No JavaScript:** The functionality must be available to users whose browsers are not running JavaScript
2. **Progressive Enhancement:** A core experience for all functionality must be provided, to be enhanced depending the browsers capability. 

## Recommended markup

TBC

### The subcomponents in order

TBC

#### The logo

TBC

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. 

![The borders become white and the background colour black](../../static/images/hcm_masthead.png)

Not shown in the image: supplementary outline styles for focus (since the `box-shadow` style is eliminated by Windows HCM):

```css
.gel-masthead__bar a:hover,
.gel-masthead__bar a:focus {
  outline: 2px solid transparent; /* for high contrast mode */
  outline-offset: -4px;
  box-shadow: inset 0 -4px 0 0 currentColor;
}
```

## Recommended behaviour

There are some special considerations for keyboard and screen reader usage that are not covered elsewhere in this document:


### Something

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<cta label="Open in new window" href="../demos/global-navigation/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: CSS Background Images & High Contrast Mode — Adrian Roselli, <http://adrianroselli.com/2012/08/css-background-images-high-contrast-mode.html>
[^2]: Managing Focus in SVG — Ally.js, <https://allyjs.io/tutorials/focusing-in-svg.html>
[^3]: Keyboard Shortcuts For JAWS — WebAIM, <https://webaim.org/resources/shortcuts/jaws#headings>
[^4]: ARIA Form Role — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Form_Role>
[^5]: WCAG 2.1 2.4.2 Focus Order, <https://www.w3.org/TR/WCAG21/#focus-order>
[^6]: ARIA Authoring Practices: Dialog Keyboard Interaction — W3, <https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-6>

