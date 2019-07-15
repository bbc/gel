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
      <div class="gel-comment__success" role="status" aria-live="polite"></div>
    </div>
    <div class="gel-form__divider">
      <button class="gel-button" type="submit" aria-describedby="notice">Submit</button>
    </div>
    <p id="notice">All comments are <a
        href="https://www.bbc.co.uk/social/moderation">reactively-moderated</a> and must follow <a
        href="https://www.bbc.co.uk/social/moderation/house-rules">the house rules</a>.</p>
  </form>
  <div class="gel-comments__stream">
    <noscript>You cannot read or write comments with JavaScript disabled. Please enable JavaScript and refresh the
      page.</noscript>
  </div>
  <a class="gel-comments__add-link" href="#comment">Add your comment</a>
</aside>
```

* **`aria-labelledby`:** This property labels the `<aside>` by association to the heading's `id`. In aggregated landmark menus, this makes it possible to identify the **Breakout box** by its label. The label is announced along with the ('complementary') role when the user traverses into the `<aside>` element. It also labels the `<aside>` in landmark lists (see the previous point), so it should be unique — that is, not just _"Note"_ or _"Warning"_ in each case.
* **`for="comment"`:** The textarea must be labeled programmatically, by matching its `id` with a `<label>`'s `for` value. As recommended in [**Form fields**](../form-fields) the label should appear persistently above the input/textarea.
* **`class="gel-form__field-error"`:** The form should use the standard and accessible error messaging mechanism described in [**Form fields**](../form-fields). This error element is associated with the `<textarea>` and populated via the [**Form fields**](../form-fields) implementation's script.
* **`id="notice"`:** All users should be made aware of the moderation rules before submitting their comment. To make this information available to screen reader users in a timely fashion, it is associated with the submit button using `aria-describedby`[^2]. That is: it will be read out as part of the button's semantic information while the user is focused on it.
* **`href="#comment"`:** The comment form should be easily accessible at the top of the comments landmark. A link to the _"Add your comment"_ field is also available _after_ the list of comments. This allows a user whose reached the end of the comments to directly access the comment form to add their own.
* **`class="gel-comments__success"`:** This live region[^3] is populated with the message _"Your comment was posted successfully"_. Live regions are announced in screen reader software whever content is appended to them, meaning screen reader users can be kept abreast of changes to state.

### Heading structure

As outlined in [**Headings**](../../foundations/headings), you should use headings to describe a relationship of belonging. The comments landmark belongs as a direct subsection of the page. It should, therefore, take an `<h2>` heading to follow the page's main `<h1>`. Comments themselves each belong to the comments landmark, making the `<h3>` level applicable in context.

```html
* Article title (`<h1>`)
    * Comments (`<h2>`)
        * Clive Warren on Wed Jul 10 2019, at 13:48: (`<h3>`)
        * Clive Butterworth on Tue Jul 09 2019, at 09:42: (`<h3>`)
        * Clive Symington on Mon Jul 08 2019, at 13:37: (`<h3>`)
```

### A single comment

The comments should be grouped into a list, since lists are identified and their items enumerated in screen reader output. Screen readers also provide list navigation shortcuts, such as the <kbd>i</kbd> key for navigating to the next list item in NVDA[^4].

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

Any one comment's replies should be grouped into a _nested_ list. That is, the reply should belong to a list that belongs to a comment that belongs to its own, higher-level, list (`ul > li > ul` in CSS selector terms).

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

Note the `<h3>`. While the nested list structure describes the nested relationship of replies to original comments, each comment should be considered _on the same plain_ as a contribution to the comment stream / discourse. This way, screen reader users are made aware of the nesting structure, but know that a comment of any type (reply or otherwise) can be navigated to using the `<h3>` shortcut (<kbd>3</kbd> in NVDA or JAWS on Windows).

For brevity, comment replies are not implemented in the [**Reference implementation**](#reference-implementation).

## Recommended layout

The aesthetic for comments will vary between BBC sites. For example, CBBC comments ([see an example of a CBBC comments stream here](https://www.bbc.co.uk/cbbc/joinin/blue-peter-fan-club-page#comments)) uses a speech bubble design. All BBC comment sections should follow the following structure (reading from top to bottom):

1. Introductory heading (_"Comments"_ or _"Your comments"_)
2. Comment form (or sign-in form if the user is not signed in)
3. Comment sorting controls (described in [**Recommended behaviour**](#recommended-behaviour))
4. The comments list
5. An _"Add your comment"_ link that focuses the _"Add your comment"_ textarea in the form above the comments list

See the [**Reference implementation**](#reference-implementation) for an example layout implementation.

## Recommended behaviour

Comments, and the ability to write them, should be considered a progressive enhancement and the functionality provided via JavaScript. In the [**Reference implementation**](#reference-implementation), some plain ES5 JavaScript is used to handle comment submissions and (re)render the comment stream. In practice, you are more likely to use a library like React or Vue, and fetch comment data over XHR. The [**Reference implementation**](#reference-implementation) uses dummy data and just exemplifies the expected layout and interaction behaviour.

Where JavaScript is not available, the comment form's submit button is disabled and dimmed. The `<noscript>` tag for the comments stream is visible.

```html
<div class="gel-comments__stream">
  <noscript>You cannot read or write comments with JavaScript disabled. Please enable JavaScript and refresh the
    page.</noscript>
</div>
```

### Posting a comment

Where JavaScript is available, the submit button is enabled and form validation is initialized, as implemented in [**Form fields**](../form-fields). In this case, the only validation rule is that the `id="comment"` `<textarea>` is `required`. With the following rules object supplied, the `aria-required="true"` attribution is automatically added to the `<textarea>` element.

```js
var rules = [
  {
    name: 'comment',
    required: true,
  }
];
```

Submission is suppressed where the required field is empty, and the field's associated error element is populated. The field is marked as invalid with `aria-invalid="true"`.

```html
<div class="gel-form__divider">
  <label for="comment">Add your comment:</label>
  <textarea id="comment" name="comment" rows="5" aria-describedby="comment-error" aria-required="true" aria-invalid="true"></textarea>
  <div class="gel-form__field-error" id="comment-error"><strong>Error:</strong> This field is required</div>
</div>
```

When a comment is successfully submitted, the comment stream is immediately re-rendered to include the new comment. _"Your comment was posted successfully"_ is appended to the `class="gel-comment__success"` live region, and the comment box value is emptied. The custom `gel-submitted` event from the [**Form fields**](../form-fields) validation script is the 'hook' for this state management.

```js
this.form.addEventListener('gel-submitted', function () {
  this.success.textContent = 'Your comment was posted successfully.';
  this.commentBox.value = '';
}.bind(this));
```

This message persists until the user refocuses the comment `<textarea>` to post another comment (should they ever do so).

```js
this.commentBox.addEventListener('focus', function () {
  this.success.textContent = '';
}.bind(this));
```

### Sorting

To make the exploration of comments easier, you may wish to provide some sorting options. By default, comments in the [**Reference implementation**](#reference-implementation) are sorted in descending order  by their `time` property (newest first). The time of submission is acquired with `Date.now()`:

```js
comments.addComment({
  id: Math.random().toString(36).substr(2, 9),
  time: Date.now(),
  name: 'Your Name',
  comment: this.sanitize(this.form.comment.value)
});
```

The `sortBy` method enables the re-rendering of the comment stream according to a chosen sorting method. In the [**Reference implementation**](#reference-implementation), just `timeAsc` is implemented alongside the default. 

```js
switch (this.sortMethod) {
  case 'timeAsc':
    data.sort(function (a, b) {
      return a.time - b.time;
    });
    break;
  default: // by time, ascending
    data.sort(function (a, b) {
      return b.time - a.time;
    });
}
```

It is recommended sorting controls are implemented using a fieldset of radio buttons, since they represent mutually exclusive options.

```html
<fieldset class="gel-comments__sort-controls">
  <legend>Sort by</legend>
  <label>
    <input name="sort" type="radio" value="timeDesc" checked>
    <span>Newest first</span>
  </label>
  <label>
    <input name="sort" type="radio" value="timeAsc">
    <span>Oldest first</span>
  </label>
</fieldset>
```

```js
var sortControls = document.querySelector('.gel-comments__sort-controls');
sortControls.addEventListener('change', function (e) {
  comments.sortBy(e.target.value);
});
```

### Linking to comments

Clicking any comment's _"Link to"_ link simply links to the comment—as document fragment—itself. In the [**Reference implementation**](#reference-implementation) this invokes a default focus ring around the comment.

### Reporting comments

Each comment includes a link for reporting abuse. The links URL is appended with the comment `id` so it can be correctly identified and tracked in the moderation system.

```js
<a href="https://www.bbc.co.uk/moderation/complaints/comments/' + this.id + '">Report</a>
```

### Voting

Some BBC sites' comment streams include the ability to upvote comments. Upvote buttons should be implemented as standard `<button>` elements, associated to the total vote count with `aria-describedby`. Something like this:

```html
<button class="gel-button" aria-describedby="total-z50fsmh2h">Upvote</button>
<span class="gel-votes" id="total-z50fsmh2h">
  <span class="gel-votes__number">126</span> 
  <span class="gel-sr">votes in total</span>
</span>
```

Note the `gel-sr` `<span>`, which provides visually hidden information to screen readers. The text _"votes in total"_ adds clarification for blind screen reader users for whom the nature of the functionality may be less clear.

Comments that include a `points` property could be sorted by points. You could adapt the [**Reference implementation**](#reference-implementation) like so:

```js
switch (this.sortMethod) {
  case 'timeAsc':
    data.sort(function (a, b) {
      return a.time - b.time;
    });
    break;
  case 'pointsAsc': 
    data.sort(function (a, b) {
      return a.points - b.points;
    });  
    break;
  case 'pointsDesc': 
    data.sort(function (a, b) {
      return b.points - a.points;
    });  
    break;
  default: // by time, ascending
    data.sort(function (a, b) {
      return b.time - a.time;
    });
}
```

## Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation must conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/comments.html">

<cta label="Open in new window" href="../demos/comments/">

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Complementary Landmark — W3C, <https://www.w3.org/TR/wai-aria-practices/examples/landmarks/complementary.html>
[^2]: Using the `aria-describedby` attribute — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute>
[^3]: ARIA live regions — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions>
[^4]: NVDA Keyboard Shortcuts — Deque University, <https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts>