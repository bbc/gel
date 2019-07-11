---
title: Comments
summary: The ability to engage with content must be inclusive. Everyone should be able to have their say.
version: 0.1.0
published: false
---

## Introduction

## Recommended markup

There are two main parts to a comments section for a BBC [**Article**](../../foundations/articles): the comments form and the comments themselves. Since comments, and the ability to leave a comment, are tangential to the article itself these are grouped into an `<aside>` element. The `<aside>` element represents a complementary landmark[^1] to assistive technology users.

The following example assumes the user is already signed in and able to comment.

```html
<aside aria-labelledby="comments-label">
  <h2 id="comments-label">Comments</h2>
  <form>
    <p>
      You're signed in as Your Name. 
      <a href="https://account.bbc.com/signout">Sign out</a>
    </p>
    <div class="gel-form__divider">
      <label for="comment">Add your comment:</label>
      <textarea id="comment" name="comment"></textarea>
      <div class="gel-form__field-error" id="comment-error"></div>
    </div>
    <div class="gel-form__divider">
      <button class="gel-button" type="submit" aria-describedby="notice">Submit</button>
    </div>
    <p id="notice">All comments are <a
        href="https://www.bbc.co.uk/social/moderation">reactively-moderated</a> and must follow <a
        href="https://www.bbc.co.uk/social/moderation/house-rules">the house rules</a>.</p>
  </form>
  <div class="gel-comments">
    <!-- previously posted comments appear here -->
  </div>
  <a href="#comment">Add your comment</a>
</aside>
```

* **`aria-labelledby`:** This property labels the `<aside>` by association to the heading's `id`. In aggregated landmark menus, this makes it possible to identify the **Breakout box** by its label. The label is announced along with the ('complementary') role when the user traverses into the `<aside>` element. It also labels the `<aside>` in landmark lists (see the previous point), so it should be unique — that is, not just _"Note"_ or _"Warning"_ in each case.
* **`for="comment"`:** The textarea must be labeled programmatically, by matching its `id` with a `<label>`'s `for` value. As recommended in [**Form fields**](../form-fields) the label should appear persistently above the input/textarea.
* **`gel-form__field-error`:** The form should use the standard and accessible error messaging mechanism described in [**Form fields**](../form-fields). This error element is associated with the `<textarea>` and populated via the [**Form fields**](../form-fields) implementation's script.
* **`id="notice"`:** All users should be made aware of the moderation rules before submitting their comment. To make this information available to screen reader users in a timely fashion, it is associated with the submit button using `aria-describedby`[^2]. That is: it will be read out as part of the button's semantic information while the user is focused on it.
* **`href="#comment"`:** The comment form should be easily accessible at the top of the comments landmark. A link to the _"Add your comment"_ field is also available _after_ the list of comments. This allows a user whose reached the end of the comments to directly access the comment form to add their own.

### Heading structure

As outlined in [**Headings**](../../foundations/headings), you should use headings to describe a relationship of belonging. The comments landmark belongs as a direct subsection of the page. It should, therefore, take an `<h2>` heading to follow the page's main `<h1>`. Comments themselves each belong to the comments landmark, making the `<h3>` level applicable in context.

```html
* Article title (h1)
    * Comments (h2)
        * Clive Warren on Wed Jul 10 2019, at 13:48: (h3)
        * Clive Butterworth on Tue Jul 09 2019, at 09:42: (h3)
        * Clive Symington on Mon Jul 08 2019, at 13:37: (h3)
```

### A single comment

The comments should be grouped into a list, since lists are identified and their items enumerated in screen reader output. Screen readers also provide list navigation shortcuts, such as the <kbd>i</kbd> key for navigating to the next list item in NVDA[^3].

The following example illustrates a single comment, as a list item:

```html
<li class="gel-comment" id="lmu4jrrnt" tabindex="-1">
  <h3>
    Clive Warren
    <time datetime="2019-07-10T13:48">on Wed Jul 10 2019, at 13:48</time>
  </h3>
  <div class="gel-comment__body">
    <p>I like this content very much.</p>
  </div>
  <div class="gel-comment__options">
    <a href="https://www.bbc.co.uk/moderation/complaints/comments/lmu4jrrnt">Report</a> 
    <a href="path/to/this/permalink#lmu4jrrnt">Link</a>
  </div>
</li>
```

* **`id` and `tabindex="-1"`:** It's important users are able to link directly to the specific comment — hence the provision of the _"Link"_ inside `.gel-comments__options`. The `tabindex="-1"` attribution ensures keyboard focus, along with scroll position, is moved to the comment.
* **`<h3>`:** See [**Heading structure**](#heading-structure). The heading level should reflected the nesting level of the comments. In this case, `<h3>` is expected since it is assumed the (outer) comments section is introduced with an `<h2>`.
* **`<time>`** The `<time>` element uses `datetime` to create a machine readable version of the comment's date and time. It does not have any direct impact of the user experience.

### Replies

In some cases, the ability to reply directly to extant comments may be deemed beneficial in terms of engagement. A reply button should be provided alongside the other controls inside the `.gel-comment__options` element:

```html
<div class="gel-comment__options">
  <a href="https://www.bbc.co.uk/moderation/complaints/comments/lmu4jrrnt">Report</a> 
  <a href="path/to/this/permalink#lmu4jrrnt">Link</a>
  <button class="gel-button">Reply</button>
</div>
```

Any one comment's replies should be grouped into a _nested_ list. That is, the reply should belong to a list that belongs to a comment that belongs to its own, higher-level, list; `ul > li > ul` in CSS selector terms.

```html
<div class="gel-comments">
  <ul>
    <li class="gel-comment" id="lmu4jrrnt" tabindex="-1">
      <h3>
        Clive Warren
        <time datetime="2019-07-10T13:48">on Wed Jul 10 2019, at 13:48</time>
      </h3>
      <div class="gel-comment__body">
        <p>I like this content very much.</p>
      </div>
      <div class="gel-comment__options">
        <a href="https://www.bbc.co.uk/moderation/complaints/comments/lmu4jrrnt">Report</a> 
        <a href="path/to/this/permalink#lmu4jrrnt">Link</a>
        <button class="gel-button">Reply</button>
      </div>
      <ul>
        <li>
          <!-- a nested reply comment -->
        </li>
      </ul>
    </li>
    <li>
      <!-- a top-level comment -->
    </li>
  </ul>
</div>
```

Theoretically, reply nesting could recurse indefinitely. However, to prevent the comment stream from becoming unwieldy, it is recommended an arbitrary limit is set. Comments, say, 3 replies deep would no longer offer a reply button.

The heading for a reply should link back to the original comment by the original commenter's name. Use the construction _"Person 2 replied to Person 1"_ like so:

```html
<h3>
  Clive Sinclair replied to <a href="path/to/this/permalink#lmu4jrrnt">Clive Warren</a>
  <time datetime="2019-07-10T13:48">on Wed Jul 10 2019, at 13:48</time>
</h3>
```

Note the `<h3>`. While the nested list structure describes the relationship of comments to reply comments, each comment should be considered _on the same plain_ as a contribution to the comment stream / discourse. This way, screen reader users are made aware of the nesting structure, but know that a comment of any type (reply or otherwise) can be navigated to using the `<h3>` shortcut (<kbd>3</kbd> in NVDA or JAWS on Windows).

### Sorting

[TODO]

## Recommended layout

The aesthetic for comments will vary between BBC sites. For example, CBBC comments ([see an example of a CBBC comments stream here](https://www.bbc.co.uk/cbbc/joinin/blue-peter-fan-club-page#comments)) uses a speech bubble design. All BBC comment sections should follow the following structure (reading from top to bottom):

1. Introductory heading (_"Comments"_ or _"Your comments"_)
2. Comment form (or sign-in form if the user is not signed in)
3. Comment sorting controls (described in [**Recommended behaviour**](#recommended-behaviour))
4. The comments list
5. An _"Add your comment"_ link that focuses the _"Add your comment"_ textarea in the form above the comments list

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Complementary Landmark — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/complementary.html>
[^2]: Using the `aria-describedby` attribute — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute>
[^3]: NVDA Keyboard Shortcuts — Deque University, <https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts>