---
title: Articles
summary: A lot of BBC content is organized into articles. Structuring articles accessibly is a question of which elements and components to use where, when, in what number, and in which order.
version: 0.1.0
published: false
---

## Introduction

The HTML5 specification proffered a number of _sectioning elements_, including the `<article>` element[^1]. Many adopted the element under a somewhat literal interpretation of its name, placing any and all prosaic and longform content inside `<article>`s.

The `<article>` has a specific purpose: it _"represents a complete, or self-contained, composition in a document, page, application, or site."_ Accordingly, it is not necessary or appropriate to mark up _articles_ as `<article>`s, unless they share a page with other articles or article extracts, or do not constitute the main content of the page.

Conversely, a BBC article is the principle focus of the page found at its permalink[^2] URL. How that content and functionality is composed is the subject of this guide.

## Semantic structure

_"The `<main>` element represents the main content section of the body of a document or application"_.[^3] Hence, `<main>` should contain the page's article content (no `<article>` markup necessary). The page is likely to include other content, such as _"site navigation links, copyright information, ...and search forms"_, but such content should exist _outside_ `<main>` since it will be shared by multiple pages of the same conventional structure.

<figure>

![Standard page layout with the navigation at the top, main content in the middle, and footer at the bottom]({{site.basedir}}static/images/article_main.svg)

</figure>

::: info Navigation and search
The [**Masthead**](../masthead) and [**Site menu**](../site-menu) documents cover global and local navigation schema respectively. [**Search**](../search) covers both global and local search functionality.
:::

The `<main>` element is accessible via screen reader keyboard shortcuts. For example, JAWS' <kbd>Q</kbd> key navigates the user to the `<main>` element from their current location anywhere in the page. 

As described in [**Routing**](../../foundations/routing), keyboard users not operating screen readers do not have access to such shortcuts. To enable them to reach the `<main>` content from the top of the page, implement a bypass[^4] in the form of a 'skip link'. Note the `href` and `id` match, as well as the `tabindex="-1"` attribution. This forces browsers to move keyboard focus to `<main>` when the skip link is activated. The `-1` value means it is not erroneously included in sequential focus navigation, however[^5].

```html
<a href="#main">Skip to content</a>
<!-- navigation/banner content here -->
<main id="main" tabindex="-1">...</main>
```

## Headings

The principle, `<h1>`, heading for the article and page should be placed _inside_ the `<main>` element and before any lower-level (sub)headings. It is advised that the `<h1>` is the first textual element inside `<main>`, but some content (such as a 'feature' or 'hero' image) is permissable before the `<h1>` in the source order.

The `<h1>` text is the article title, and should be included with the site name in the page `<title>`:

```html
<title>Royal wedding 2018: Bouquet laid on tomb of unknown warrior - BBC News</title>
```

As set out in [**Headings**](../../foundations/headings), subsequent subheadings should be organized according to belonging: An `<h2>` represents a subheading belonging to the `<h1>` supersection; an `<h3>` represents a subheading inside an `<h2>` subsection.

<figure>

![Nested boxes. The outermost box is labelled h1 level. A box directly inside it is labelled h2 level, and a box inside an h2 level box is labelled h3 level]({{site.basedir}}static/images/article_nesting.svg)

</figure>

Headings are labels for sections of content, and heading tags should be used for no other purpose. A byline, for example, might take a heading-like larger/bolder text style. However, the name of the article's author does not name a subsection of the article. To 'pick out' the author name, use a `class` or a `<strong>` element.

### <mark is="bad"> Bad example: byline as heading

```html
<h1>Film Review: Toy Story 4</h1>
<h4>Nicholas Barber</h4>
```

### <mark is="bad"> Good example: byline in strong element

The `<p>` tag is used as a generic block element, to ensure the byline is identified as a separate block, on a new line.

```html
<h1>Film Review: Toy Story 4</h1>
<p><strong>By Nicholas Barber</strong></p>
```

**TODO: section on heading microcopy. Should probably refer back to [wording, in the headings document](../../foundations/headings/#wording)**

## Paragraph content

**TODO: Section on writing good paragraphs. Rhythm, simple language, etc.**

### Non-english content

**TODO: Section on including quotes/segments in different languages (using fonts that support the necessary glyphs / accents; `lang` attribute; translation tools etc.)**

## Links

Links must be adequately, and inclusively, differentiated from surrounding text. As mandated by WCAG2.1 1.4.1 Use of color[^8], this means not differentiating links by color alone. Not all people can (accurately) perceive color differences, and not all devices and screens accurately convey color.

Lean on established convention by providing an underline, using either `text-decoration: underline` or a border.

### <mark is="bad"> Bad example: removing text decoration

```css
p a {
  text-decoration: none;
}
```

### <mark is="bad"> Good examples: underlines or borders

```css
p a {
  text-decoration: underline;
}
```

```css
p a {
  text-decoration: none;
  border-bottom: 2px solid;
}
```

Consult [**External links**](../external-links) on how to indicate links that take users away from the current site. External links navigate the user to new and potentially unfamiliar user interfaces, and this can be particularly disorientating for blind users. Ensure all external links follow the [**External links**](../external-links) advice.

### Link labels

**TODO: section on good link text (i.e. descriptive; makes sense independent of context)**

### Promos

[**Promos**](../promos) are illustrated links, presented as cards, and used to promote BBC content. They should be treated as _interjections_, and contained by labelled `<aside>` landmarks (as set out in the [interjections section](#interjections)).

## Structured data

The inclusion of structured data[^6] can help to make search results for articles more visible and better structured. The **Article** or **NewsArticle** schemas are appropriate:

```html
<main itemscope itemtype="https://schema.org/NewsArticle" id="main" tabindex="-1">
  <h1 itemprop="headline">Royal wedding 2018: Bouquet laid on tomb of unknown warrior</h1>
  <time itemprop="datePublished" datetime="2019-04-05">5 April 2019</time>
  <div itemprop="articleBody">
    <!-- the main text of the article -->
  </div>
</main>
```

If it is not practical to template structured data, you can instead include an auxiliary JSON-LD (JavaScript Object Notation for Linked Data) `<script>` in the head of the page:

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org", 
    "@type": "NewsArticle",
    "headline": "Royal wedding 2018: Bouquet laid on tomb of unknown warrior",
    "datePublished": "2019-04-05"
  }
</script>
```

### Publish date

In the preceding code examples, we used a `<time>` element and structured data to provide a machine readable date. It's important this date is also _human_ readable, and placed near the beginning of the article — preferably shortly after the `<h1>` heading. Since screen reader users commonly navigate _by_ heading, any key information about the article placed _before_ its main/introductory heading is liable to be missed.

<figure>

![The left example shows the meta information above/before the main heading. The right example shows the main heading first and is labelled preferred.]({{site.basedir}}static/images/article_order.svg)

</figure>

Sometimes the publish time should be accompanied by other meta information. This is covered by the [**Metadata strip**](../metadata-strips) component. In the following example, the time is human readable as _"Five days ago"_. It is accompanied, in a description list, by the location: _From: UK_. This is identified to structured data parsers using the `locationCreated` property.

```html
<dl class="gel-metadata-strip">
  <div>
    <dt class="gel-sr">Published:</dt>
    <dd>
      <svg class="gel-icon gel-icon--text" focusable="false">
        <use xlink:href="path/to/gel-icons-all.svg#gel-icon-duration"></use>
      </svg>
      <time itemprop="datePublished" datetime="2019-04-05">Five days ago</time>
    </dd>
  </div>
  <div>
    <dt class="gel-sr">From:</dt>
    <dd>
      <a itemProp="locationCreated" href="link/to/category">UK</a>
    </dd>
  </div>
</dl>
```

Note that the `<dt>` elements are visually hidden, but available to screen readers using the `gel-sr` class.

## Typography

The [**Typography**](../../foundations/typography) **foundation** document covers the pillars of legible type in detail:

1. [Font size](../../foundations/typography#font-size)
2. [Alignment](../../foundations/typography#alignment)
3. [Measure](../../foundations/typography#measure)
4. [Leading](../../foundations/typography#leading-and-white-space)
5. [Contrast](../../foundations/typography#contrast)

Suffice it to say that paragraph text is the most abundant part of any article. The BBC typeface, [Reith](https://www.bbc.co.uk/gel/articles/introducing-bbc-reith) has been designed with accessibility in mind, but the aforementioned legibility concerns need to be observed to do the typeface justice.

## Images

All images used to illustrate articles must be accompanied by alternative text: a textual description of the information the image conveys, for blind and partially sighted users operating screen readers.

Partially sighted users are able to see the image, albeit not clearly. Therefore it is important to include clarification on the _form_ of the image as well as its meaning/intent. If no caption is provided, all of this information must be included in the alternative text.

### <mark is="bad"> Bad example: only conveys intent

```html
<img src="path/to/image" alt="Two women sit in conversation." />
```

### <mark is="bad"> Good example: conveys intent and form

```html
<img src="path/to/image" alt="Two women sit in conversation. The woman in the foreground, with her back to the camera, is raising her arm." />
```

### Figures

If a caption _is_ provided, divide the information between the alternative text (form) and caption (intent), inside `<figure>` element.

```html
<figure>
  <img src="path/to/image" alt="Two women sit across from one another at a desk. The woman in the foreground has her back to the camera and is raising her arm." aria-describedby="figure-1-caption" />
  <figcaption id="figure-1-caption">Volunteer your expertise</figcaption>
</figure>
```

Note the `aria-describedy` attribute, pointing to the caption's `id` value. The `<figure>` should be identified by role, and its `<figcaption>` used to label it. However, this is not consistent or dependable across different screen reader software[^9]. Accordingly, `aria-describedy` (pointing to the `<figcaption>`'s id) is used to associate the caption with the image directly. In most screen readers, the ARIA description is read after the label, with a pause to separate each of these announcements.

### Infographics

Infographics can be an incisive and compelling way to communicate complex concepts otherwise stated in text[^10], but they need to be accessible too. Infographics need alternative text, and frequently benefit from a caption — as described in [**Infographics**](../infographics). 

Charts and graphs can be expressed as tabular data. As [**Infographics**](../infographics) contends, the (source) [**Data table**](../data-tables) should be provided alongside the visualisation, both providing an accessible interface for the full data set, and a means to explore that data set in a granular fashion. 

Screen readers provide shortcuts to navigate between and around data tables, with their column and row headers exposed as labels for the grid of cells / data points.

## Interjections

The main _thrust_ of an article is carried by its paragraph text, organized under subheadings where appropriate. However, it is permissible to include tangential information and supplementary functionality. These _interjections_ must be clearly demarcated and accessibly marked up.

Both the [**Breakout box**](../breakout-boxes) and [**Share tools**](../share-tools) components are encapsulated in `<aside>` elements[^7], representing complementary landmarks in assistive technologies. Each `<aside>` must have a unique label, since it will need identifying among similar landmarks in screen readers' aggregated landmark lists.

The label is associated with the landmark using `aria-labelledby`. Although a heading element is used for presentational purposes, it is removed from screen reader output and navigation with `aria-hidden="true"`. Only headings directly related to the article should form part of the article's outline.

```html
<aside aria-labelledby="the-complementary-aria-role">
  <h4 id="the-complementary-aria-role" aria-hidden="true">The complementary ARIA role</h4>
  <p>The complementary ARIA role (<code>role="complementary"</code>) maps to <code>&lt;aside;&gt;</code>. Since support for <code>&lt;aside;&gt;</code> is high, the ARIA role is redundant and not necessary.</p>
</aside>
```

Some interjections may be considered obstructive. The [**Share tools**](../share-tools) incorporates its own skip link, enabling keyboard users to forego its functionality if desired.

<figure>

![A set of social sharing tools are interjected in the flow of an article. An arrow indicates you can press 'skip sharing' to land on an element with the text 'end of sharing tools']({{site.basedir}}static/images/article_skip.svg)

</figure>

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: The `<article>` element — W3C, <https://www.w3.org/TR/html51/sections.html#the-article-element>
[^2]: Permalink — Wikipedia, <https://en.wikipedia.org/wiki/Permalink>
[^3]: The `<main>` element — W3C, <https://www.w3.org/TR/html-main-element/#the-main-element>
[^4]: WCAG2.1 2.4.1 Bypass Blocks, <https://www.w3.org/TR/WCAG21/#bypass-blocks>
[^5]: Understanding SC 2.4.3: Focus Order, <https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html>
[^6]: Organization of schemas — schema.org, <https://schema.org/docs/schemas.html>
[^7]: The Aside element — MDN, <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside>
[^8]: WCAG2.1 1.4.1 Use of color, <https://www.w3.org/TR/WCAG21/#use-of-color>
[^9]: How do you figure? — Scott O'Hara, <https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html>
[^10]: How to design infographics — BBC GEL, <https://www.bbc.co.uk/gel/guidelines/how-to-design-infographics>
