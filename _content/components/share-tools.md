---
title: Share tools
summary: Share tools offer unobtrusive options to share BBC content on social media
version: 0.1.0
published: true
accessibility: true
linkback: https://www.bbc.co.uk/gel/guidelines/share-tools
---

## Introduction

Research indicates that as little as 0.25% of visitors use social media buttons [^1] [^2]. However, there is evidence that mobile users especially find them a source of convenience when it comes to sharing content.

The construction of GEL's **Share tools** must, therefore, be both unobtrusive and ergonomic. The implementation to follow is easy to avoid and dismiss, but not difficult to locate or operate.

## Recommended markup

Omitting the individual social media buttons for the time being, let's explore the outer structure:

```html
<aside class="gel-sharetools" aria-labelledby="gel-sharetools__label">
  <h3 id="gel-sharetools__label" aria-hidden="true">Share this</h3>
  <a href="#gel-sharetools__end" class="gel-sr gel-sr__focusable">Skip sharing</a>
  <!-- list of social media buttons here -->
  <div class="gel-sr gel-sr__focusable" id="gel-sharetools__end" tabindex="-1">End of sharing tools</div>
</aside>
```

* **`<aside>`:** **Share tools** should be encapsulated in a complementary landmark (`<aside>`) with a label similar to "Share this" or "Sharing". This makes them easily discoverable and identifiable in screen reader landmark navigation.
* **`aria-labelledby` and `aria-hidden`:** The heading text is used to label the landmark itself. This label is announced along with the complementary role when the user enters the region/landmark. Ensure that, if **Share tools** appears more than once on the same page, each instance uses a unique identifier for the matching `aria-labelledby` and `id` values. 
* **`aria-hidden="true"`:** The **Share tools** heading should not be part of the host page's structure / document outline because the component represents tangential content. Nor should the text be encountered directly, while browsing. The `aria-hidden="true"` attribution achieves both these ends _without_ suppressing the element's text as a means of labelling the the parent `<aside>`.
* **`href="#gel-sharetools__end"`:** Because the **Share tools** represent a number of tab stops, a mechanism is provided to 'skip' past the region and to the salient page content that comes after it. This is achieved using a same-page link and a visually hidden target element that reads _"End of sharing tools"_ when focused.
* **`tabindex="-1"`:** The `tabindex="-1"` attribution ensures the target of the skip link receives focus when the skip link is activated[^3].

### Individual tools

The social media buttons themselves are members of a list. List semantics (`<ul>` and `<li>`) communicate important information to screen reader users, such as the number of items present, and enable navigation shortcuts.

Here is the Twitter Share tool, for example:

```html
<li>
  <a class="gel-button" href="path/to/external/Twitter/API" target="_blank">
    <span class="gel-sr">Twitter, share this, external</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="path/to/gel-icons-social.svg#gel-icon-twitter"></use>
    </svg>
  </a>
</li>
```

* **`class="gel-sr"`:** This class visually hides the textual label without making it unavailable to assistive technologies. The commas in the text itself produce pauses in the output, making it easier to understand. The _"external"_ part warns screen reader users that `target="_blank"` will change their context to a new page and UI.
* **`focusable="false"` and `aria-hidden="true"`:** The SVG icon is a visual cue only, and should not be identified in assistive technologies (`aria-hidden="true"`) or focusable by keyboard (`focusable="false"`; an issue in some versions of Microsoft browsers[^4]).

### Information panel

As set out in [GEL's **Share tools** documentation](https://www.bbc.co.uk/gel/guidelines/share-tools), the final item in the list of tools secrete an [**Information panel**](../info-panels). This contains a `class="gel-sharetools__complete"` element comprising a complete set of social media buttons (including those not featured outside the **Information panel**) and the option to copy the host page's link from an input element.

```html
<div class="gel-sharetools__complete">
  <ul class="gel-sharetools__options">
    <!-- all sharing buttons -->
  </ul>
  <div class="gel-sharetools__link">
    <label for="gel-sharetools__link-input">Copy this link</label>
    <input class="gel-sharetools__link-input" type="text" id="gel-sharetools__link-input" value="http://bbc.in/3x4mp1e" readonly />
  </div>
</div>
```

* **`for` and `id`:** The _"Copy this link"_ label's `for` must match that of the input's `id` to associate it with the input. All `id`s must be unique; if there is more than one **Share tools** component on the page, make sure each instance's `id`s differ.
* **`readonly`:** The `readonly` attribute prevents the input's value being (accidentally) altered. It does not prevent the user from selecting and copying the value.

## Recommended layout

### The horizontal list

The `<ul>` of tools appears directly after the heading (`role="presentation"`) element. The items receive a margin on all sides, meaning there is a visible gap between items however they wrap. The excess margin is removed using a negative margin on the parent `<ul>`. This ensures the subcomponent does not show an indentation on either side.

```css
.gel-sharetools__options {
  display: flex;
  flex-wrap: wrap;
  margin: -0.125rem; /* excess margin removed */
}

.gel-sharetools__options > li {
  margin: 0.125rem; /* margin added */
}
```

### The skip link

The skip link (_"Skip sharing"_) takes the classes `gel-sr` and `gel-sr__focusable`. The first hides the link visually, but does not remove it from focus order. The second ensures the link appears _when_ it is focused. Only keyboard users (including screen reader users) will be aware of the link.

### The Information panel

The expected layout of the **Information panel** is documented with the [**Information panel** component](../info-panels).

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active. 

![Borders make the buttons visible](../../static/images/hcm_share_tools.png)

## Recommended behaviour

**Share tools** consists of a list of external links, which open social media platforms' respective pages in new tabs. As described in [Expected markup](#expected-markup), screen reader users are forewarned about this change in context by each link's visually hidden label being appended with _"external"_.

Keyboard users (including screen reader users) traversing the page will first encounter the skip link (reading _"Skip sharing"_ in the reference implementation). This link will be revealed visually upon being focused. Users wishing to bypass the **Share tools** can activate the link. Screen reader users will hear _"End of sharing tools"_ as the target element is focused. Sighted keyboard users will see the focused element appear, including the focus style. From there, the user can continue down the page, focusing the remainder of interactive elements sequentially.

### The link input

::: info Information panel behaviour
The interaction behaviour of the **Information panel** is covered in the [Information panel documentation](../info-panels).
:::

The experience of copying the link from the `class="gel-sharetools__link-input"` element is aided slightly by selecting the input's value and copying it to the clipboard on focus. The script for this behaviour is embedded in the demonstration page:

```js
var copyLink = document.querySelector('.gel-sharetools__link-input');
copyLink.addEventListener('focus', function () {
  copyLink.select();
  document.execCommand('copy');
});
```

This behaviour is in place for those who perceive the _"Copy this link"_ label as a control. Clicking a label focuses its associated form element. The cited JavaScript does not prevent the user from selecting and copying the link/value manually.

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/share-tools.html">

<cta label="Open in new window" href="../demos/share-tools/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Social Sharing Buttons: The First 10 Weeks — Gov.uk, <https://insidegovuk.blog.gov.uk/2014/02/20/gov-uk-social-sharing-buttons-the-first-10-weeks/>
[^2]: Social Sharing Buttons Are Useless, <https://www.tuliptree-studios.com/view-post/social-sharing-buttons-are-useless>
[^3]: Removing Headaches From Focus Management — Google Developers, <https://developers.google.com/web/updates/2016/03/focus-start-point>
[^4]: Don't make every `<svg>` focusable by default (issue) — Microsoft, <https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8090208/>