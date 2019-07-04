---
title: Portal pages
summary: Some BBC web pages (typically homepages) are intended primarily for exhibiting the content available on the local site. By linking to that content, they act as 'portals' for the reader.
version: 0.1.0
published: false
---

## Introduction

It’s helpful to think of a **Portal page** as a kind of _specials menu_ for a BBC site; an illustrated menu intended to entice the reader towards the freshest and best content. 

Accordingly, not everything available on the site should be featured in the body of a **Portal page**. That should instead be covered by the [**Site menu**](../../components/site-menu) found directly _above_ the main content of the page (and consistently across all of the site’s pages).

<figure>

![The global navigation is shown on top, with the local site navigation below it. Underneath that is the main content, for either a portal or article page.]({{site.basedir}}static/images/portal_global_site.svg)

</figure>

## Semantic structure

**Portal page** content must reside in a `<main>` element, accessible via a 'skip link'. As described in [**Articles**](../articles), this skip link allows keyboard users to bypass[^1] the page's header/navigation/preamble after the page loading, and move directly to the main content.

On a **Portal page**, this content is constituted primarily of [**Promos**](../../components/promos). These are grouped into lists, using standard `<ul>` and `<li>` markup, and each list is introduced by a heading. The heading should describe the theme shared by the grouped promos: _"New"_ for fresh content, or _"Featured"_ for featured/promoted content, for example.

```html
<h2>Featured</h2>
<ul class="gel-promos">
  <li class="gel-promo">...</li>
  <li class="gel-promo">...</li>
  <li class="gel-promo">...</li>
  <li class="gel-promo">...</li>
</ul>
```

Lists are identified by assistive technologies, and their items are enumerated. Most screen readers also provide shortcuts to traverse list items, such as [the <kbd>i</kbd> key in NVDA](https://webaim.org/resources/shortcuts/nvda).

### Hierarchy

Hierarchically speaking, groups of promos are siblings, with no 'master' group to which others belong. Therefore, each should be introduced with the same `<h2>` level of heading. The name of the site itself should be the text of the `<h1>` heading labeling the outer page. 

Accordingly, on **Portal pages** the site's branding/logo should be wrapped in an `<h1>`. On the article/permalink pages to which portal pages direct the reader, the branding/logo should be provided as a simple link, with no heading markup to contain it.

<figure>

![Two diagrams of web pages. On the left, the portal page, with the site name/logo indicated as the h1 heading. On the right, the article page, with the article's title indicated as the h1.]({{site.basedir}}static/images/portal_portal_article.svg)

</figure>

For example, on the GEL **Portal page**, the text for the main (`<h1>`) heading is derived from the logo's alternative text[^2]: _"GEL — Global Experience Language"_. On GEL article pages (like [BBC For Everyone](https://www.bbc.co.uk/gel/articles/bbc-for-everyone)), this `<h1>` is omitted and the article's main heading (aptly: _"BBC For Everyone"_) becomes the singular `<h1>` instead.

### Larger promos

As detailed in [**Promos**](../../components/promos), you can create a larger promo by changing its orientation or by other means. Despite its enlarged dimensions, this promo should be semantically similar to its siblings. The non-visual communication of its 'importance' should, instead, come from placing it as the _first_ item in the source order of the list.

<figure>

![Five promos. The first-child, on the left, is larger, taking up two columns and two rows]({{site.basedir}}static/images/portal_source_order.svg)

</figure>

::: info Promo titles
The promo 'title'—the principle text of the promo; its link text—is often treated visually to look like a heading. However, ordinarily it should not be a heading but a simple link. Screen reader users are already able to navigate to lists of **Promos** by the common list heading, or by using list navigation shortcuts. 

Headings should introduce sections of content within the page (such as the combined lists of **Promos**). Promos do not represent anything so large as a section; they are simply a call to action. Too many headings make the document outline[^4] complex and consequently unwieldy for screen reader navigation.
:::

## Other calls-to-action

[**Promos**](../../components/promos) are a variety of calls-to-action[^5], since they call upon the user to follow their link to the promoted content.

Not all calls-to-action have to strictly follow the **Promo** pattern. For example, the [Bitesize](https://www.bbc.com/bitesize) portal page incorporates a set of _"Learn and revise"_ actions:

<figure>

![Three adjacent, coloured boxes, with button shaped controls, labelled Primary, Secondary, and Post-16]({{site.basedir}}static/images/portal_bitesize.svg)

</figure>

Note that they each incorporate both a title and a button-shaped element containing the imperative text: _"Go to x"_. It is recommended the markup for this kind of call-to-action is handled in one of two ways:

### <mark is="good"> Heading and link

The title is a heading element, and the link follows it. It is acceptable to use headings to introduce calls-to-action if they form part of the permanent and unchanging structure of the **Portal page** (such as these).

```html
<div class="call-to-action">
  <h2>Primary</h2>
  <p>Age three to eleven</p>
  <a class="gel-cta" href="/path/to/primary">
    Go to primary
  </a>
</div>
```

Note the `gel-cta` class, intended to create a pronounced link. This is differentiated from the `gel-button`, which denotes a `<button>` element.

Screen reader users can locate the Primary content by locating this `<h2>` heading and the _"Go to primary"_ action located under it.

### <mark is="good"> Block link

The entire call-to-action may be encapsulated as a block link[^6].

```html
<a href="/path/to/primary">
  <h2>Primary</h2>
  <p>Age three to eleven</p>
  <span class="gel-cta" aria-hidden="true">Go to primary</span>
</a>
```

In this case, it's important the button element is not, in fact, a `<button>` or link. This would represent a second, and redundant, tab stop for keyboard users. Instead, you can use a presentational/non-semantic `<span>`.

The `aria-hidden="true"` attribution silences the button in screen reader output. This changes the link's label from _"Primary, Age three to eleven, go to primary"_ to simply _"Primary, Age three to eleven"_. Since the announcement of the element's role, _"link"_, indicates the content is a call-to-action, the _"Go to primary"_ part is redundant (and makes the complete label scan/read poorly).

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: WCAG2.1 2.4.1 Bypass Blocks, <https://www.w3.org/TR/WCAG21/#bypass-blocks>
[^2]: Alternative text — WebAIM, <https://webaim.org/techniques/alttext/>
[^3]: How to structure headings for web accessibility — Nomensa, <https://www.nomensa.com/blog/2017/how-structure-headings-web-accessibility>
[^4]: Document Outlines — HTML5 Doctor, <http://html5doctor.com/outlines/>
[^5]: Calling To Action: 3 Key Principles, <https://usabilla.com/blog/call-to-action-key-principles/>
[^6]: Accessibility and HTML5 block links — Simply Accessible, <https://simplyaccessible.com/article/html5-block-links/>