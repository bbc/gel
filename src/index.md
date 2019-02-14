---
layout: layout-index.njk
title: Home
summary: Guidance for developers building accessible websites based on BBC GEL.
version: 0.1.0
published: false
accessibility: false
linkback: http://www.bbc.co.uk/gel
---

## What's all this?

These documents are a working-draft of a project whose aim is to answer the BBC developer's question, "What is the recommended way to code the patterns documented in BBC GEL?" If you've ever sat down to build a component documented in GEL, and wondered what are the best HTML tags, attributes and behaviours to use then Welcome! you're in the right place.

How do we decide what "best" is? We invite _everyone_ to join in that conversation. This is an evolving guideline and the more voices we include, the better the advice we can offer. But there are three major areas of concern that we use to decide what constitutes recommended practice...

- **Accessibility**: We _strongly_ believe that when we endeavour to create anything at the BBC, we must hold ourselves the highest possible standard of accessibility. The BBC is for _everyone_, and as creators it is our duty to ensure that everyone can access our content. But we acknowledge that it can be tricky to get it right, even with the best of intentions, and with the wide range of assistive technologies in use we can all benefit from sharing our collective experience and knowledge. The guidance here incorporates relevant and specific thinking about exactly this, collected from some of the best minds across the digital accessibility community.
- **Standards**: We closely follow the work of recognised standards such as the _HTML 5.x Recommendation_, the _HTML Living Standard_, and the W3C _Web Accessibility Initiative – Accessible Rich Internet Applications_ specifications; as well as the BBC's own _Mobile Accessibility Guidelines_ and all applicable _BBC Standards and Guidelines_. Like accessibility, this is an area rich with nuance and detail; getting it right is easier when we work together collectively towards known-good examples that we share with everyone.
- **Research Driven**: Not every question about implementation can be answered in an external standards document and the BBC holds itself to be a _contributor_ of knowledge to the wider industry, so we expect that in some cases we will be breaking fresh ground and innovating in ways that require hands-on research to confirm if we're heading in the right direction. In cases where a question cannot be clearly answered by referring to standards and guidelines we expect valid research and testing data to be documented and made available as evidence that a recommendation is a known-best technique.

Finally, in cases where none of the above are available, we seek to use what is considered _standard practice_. Without any evidence to show a benefit, merely being different for the sake of being different can result in an experience that is pointlessly confusing for users, particularly those with impairments and who use assistive technologies. In questions of usability patterns, until we have evidence to show that being different is actually a benefit, we try to stick to what is traditional, either across the BBC or the wider industry.

## But our product is special...

Let me stop you there.

Yes, we completely understand that the BBC, along with the web-at-large, is a landscape of variation when it comes to the myriad ways a web page can be generated. But this is not the case with how web pages are _interpreted_. Standards-compliant web browsers **all** expect a very limited set of well-defined technologies be used: HTML, CSS and JS. No matter how unique your back-end service is, at the time your product is actually rendered in front of a user it cannot be so technologically different that it can't be recognised by the typical web browser application. That is the point where you can compare the functional experience of your product with the guidance provided here.

## What's here?

We are working our way through a list based closely on what's already published in [the BBC GEL Guidelines](http://www.bbc.co.uk/gel/). You should generally start there when seeking to understand any documented pattern but at the point where you're wondering about which HTML tags to use we're here for you!

| Component | Status |
|-----------|--------|
| [Accordions]({{site.basedir}}components/accordions/) | Draft / Pending|
| [Action dialogs]({{site.basedir}}components/action-dialogs/) | Draft / Pending|
| [Breakout boxes]({{site.basedir}}components/breakout-boxes/) | Draft / Pending|
| [Buttons and CTAs]({{site.basedir}}components/buttons-and-ctas/) | Draft / Pending|
| [Cards]({{site.basedir}}components/cards/) | Draft / Pending|
| [Carousels]({{site.basedir}}components/carousels/) | Draft / Pending|
| [External links]({{site.basedir}}components/external-links/) | Draft / Pending|
| [Metadata strips]({{site.basedir}}components/metadata-strips/) | Draft / Pending|
| [Headings]({{site.basedir}}components/headings/) | Draft / Pending|
| [Promos]({{site.basedir}}components/promos/) | Draft / Pending|
| [Tabs]({{site.basedir}}components/tabs/) | Draft / Pending|
| [Form fields and validation]({{site.basedir}}components/form-fields/) | Draft / Pending|
| [Video controls]({{site.basedir}}components/video-controls/) | Draft / Pending|
| [Pocket]({{site.basedir}}components/pockets/) | Draft / Pending|
| [Pagination]({{site.basedir}}components/load-more/) | Draft / Pending|
| [Information Panel]({{site.basedir}}components/info-panels/) | Draft / Pending|
| [Share Tools]({{site.basedir}}components/share-tools/) | Draft / Pending|
| [Site Menu]({{site.basedir}}components/site-menu/) | Draft / Pending|
| [Grids]({{site.basedir}}atoms/grids/) | Draft / Pending|
| [Headings]({{site.basedir}}atoms/headings/) | Draft / Pending|
| [Icons]({{site.basedir}}atoms/iconography/) | Draft / Pending|
| [Type]({{site.basedir}}atoms/typography/) | Draft / Pending|


## Questions?

This project is currently being overseen by the BBC Accessibility Team, managed by Gareth Ford Williams. If you have access to our corporate Slack channel pop in and say hi. We welcome questions and suggestions posted to the GEF Docs GitHub issue tracker.

