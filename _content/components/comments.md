---
title: Comments
summary: The ability to engage with content must be inclusive. Everyone should be able to have their say
version: 0.1.0
published: true
linkback: https://www.bbc.co.uk/gel/guidelines/comments
---

## Introduction

The principle [GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments) goes into some detail about how BBC comments should be presented and behave. The purpose of _this_ guide is to describe the expected technical implementation of a comments section's key features.

Rather than providing a full [reference implementation](#reference-implementation) of a working comments section (which is best achieved using a suitable framework such as React or Vue), we will focus on the individual behaviour of the key subcomponents that contribute together to the pattern. 

## Recommended markup

### The comments section

The larger comments section comprises:

1. The comment form (or sign in functionality where the user is not authenticated)
2. Meta information and sorting control
3. The comments stream

Since comments, and the ability to leave a comment, are tangential to the article itself these are grouped into an `<aside>` element placed at the end of the article body. The `<aside>` element represents a complementary landmark[^1] to assistive technology users. An `aria-labelledby` attribute is used to label the `<aside>` by association to the heading's `id`. The heading should comprise both the term _"Comments"_ and the question or call-to-action intended to spark participation.

```html
<aside class="gel-comments" aria-labelledby="comments-label">
  <h2 class="gel-comments__label" id="comments-label" >
    <small>Comments:</small>
    <span>Does the England team have any chance of qualifying for the World Cup?</span>
  </h2>
  <p>Join in to comment, reply, and rate.</p>
  <!-- comments form and comments stream here -->
</aside>
```

The label is announced along with the complementary role when the user traverses into the `<aside>` element. It is also included as the label in screen readers' aggregated landmark menus. The `<h2>` heading level marks the comments section as a subsection of the parent article, with its `<h1>` heading. 

* All About The World Cup Qualifiers (`<h1>`)
    * Comments: Does the England team have any chance of qualifying for the World Cup? (`<h2>`)

Screen reader users can navigate directly between headings (and the sections / landmarks they denote), typically using the <kbd>h</kbd> shortcut key.

Inside the comments section, the comments form comes first, followed by the meta information and sorting, then the comments stream. A link at the bottom of the section labelled _"Leave your comment"_ points to the comment form's `<textarea>` by `id` (`#your-comment`), so readers can easily leave a comment after reaching the end of the stream.

```html
<aside class="gel-comments" aria-labelledby="comments-label">
  <h2 class="gel-comments__label" id="comments-label" >
    <small>Comments:</small>
    <span>Does the England team have any chance of qualifying for the World Cup?</span>
  </h2>
  <p>Join in to comment, reply, and rate.</p>
  <!-- comments form and comments stream here -->
  <div class="gel-comments__footer">
    <a href="#your-comment">Leave your comment</a>
  </div>
</aside>
```

### The comment form

Authentication is out of scope for this article, so you are asked to imagine the user is already signed in—and the sign in call-to-action replaced by the comment form—in the following example.

```html
<form class="gel-comments__form">
  <p>You're signed in as <a href="path/to/user/comment/history">Ben</a></p>
  <div class="gel-form__divider">
    <div class="gel-comments__success" role="status" aria-live="polite"></div>
  </div>
  <div class="gel-form__divider">
    <label for="your-comment">Add your comment</label>
    <div class="gel-comments__field">
      <textarea name="your-comment" id="your-comment" maxlength="200" aria-describedby="chars-left"></textarea>
      <span class="gel-comments__chars" id="chars-left">
        <span class="gel-comments__chars-left">200</span>
        <span class="gel-comments__chars-of" aria-hidden="true">/ 200</span>
        <span class="gel-sr">characters remaining</span>
      </span>
    </div>
    <div class="gel-form__field-error" id="your-comment-error"></div>
  </div>
  <div class="gel-form__divider">
    <button type="submit" aria-describedby="your-comment-rules" hidden>Post</button>
  </div>
  <p id="your-comment-rules"><small>Comments must follow the <a href="path/to/rules">house rules</a></small>.</p>
</form>
```

* **`for="your-comment"`:** The textarea must be labelled programmatically, by matching its `id` with a `<label>`'s `for` value. As recommended in [Form fields](../form-fields) the label should appear persistently above the input/textarea, and not be supplanted by a `placeholder` attribute, which presents various accessibility and usability issues
* **`class="gel-comments__field"`:** This groups the `<textarea>` with the character count element for CSS positioning. The count is associated with the `<textarea>` using `aria-describedby`.
* **`class="gel-comment__chars"`:** A combination of `aria-hidden="true"` and `class="gel-sr"` ensures the accessible wording for this element follows the pattern _"[number] characters remaining"_. The complete `aria-describedby` value is a space separated combination of the `your-comment-error` and `chars-left` `id`s. The text of each `id`'s element is read in turn whenever the textarea is focused.
* **`class="gel-form__field-error"`:** The form should use the standard and accessible error messaging mechanism described in [Form fields](../form-fields). This error element is associated with the `<textarea>` and populated via the [Form fields](../form-fields) implementation's script (with added `aria-describedby`, and `aria-invalid` where applicable).
* **`id="your-comment-rules"`:** All users should be made aware of the moderation rules before submitting their comment. To make this information available to screen reader users in a timely fashion, it is associated with the submit button using `aria-describedby`[^2]. That is: it will be read out as part of the button's semantic information while the user is focused on it.
* **`hidden`:** As set out in the principle [GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments), the submit button is not revealed until the user has entered some text into the `<textarea>`
* **`class="gel-comments__success"`:** This live region[^3] is populated with the message _"Your comment was posted successfully"_. Live regions are announced in screen reader software whenever content is appended to them, meaning screen reader users can be kept abreast of changes to state.

## Meta information and sort control

Sandwiched between the form and the comment stream is a subcomponent that tells the user the comment count, and allows them to sort the comments based on a handful of different criteria.

How many sorting criteria are present depends on the complexity of any comment for the specific implementation. At the very least, users should be able to reorder comments by submission time: _"Latest first"_ versus _"Oldest first"_. Some comments (see [the ensuing comment stream section](#the-comment-stream)) include reaction controls. If so, you might implement _"Most popular"_ and _"Least popular"_.

The [GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments) illustrates the sorting control as a kind of _dropdown_ or `<select>`. It's recommended this is either implemented using the ARIA menu button pattern[^4] or uses a native `<select>` element with some special styling. It's possible to achieve the aesthetic illustrated in the [GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments) with CSS—at least for the closed state[^5], if not for the `<option>`s. The advantage of using the native control is that semantic HTML is robust and interoperable with minimal code.

In the following code sample, the comment count is used as a description for the list (`<ul>`) that encloses [the comment stream](#the-comment-stream).

```html
<div class="gel-comments__meta">
  <span id="comments-count">186 comments</span>
  <label class="gel-comments__sort" for="comments-sort">
    Show:
    <select id="comments-sort">
      <option selected>Latest first</option>
      <option>Oldest first</option>
    </select>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="/path/to/gel-icons-all.svg#gel-icon-down"></use>
    </svg>
  </label>
</div>
<ul class="gel-comments__stream" aria-describedby="comments-count">
  <!-- stream of comment list items -->
</ul>
```

As standard, the SVG takes `focusable="false"` and `aria-hidden="true"` take it out of focus order and ensure it is not announced in screen reader output. 

## The comments stream

As already explained in the previous section, the comments themselves ought to be marked up as a list. Lists are identified and their items enumerated in screen reader output. Screen readers also provide list navigation shortcuts, such as the <kbd>i</kbd> key for navigating to the next list item in NVDA[^6].

Where the facility to reply to comments is implemented, replies should be marked up as _nested_ lists appended to the original comment's content. This describes the **relationship of belonging** non-visually and to assistive technology users.

```html
<ul class="gel-comments__stream" aria-describedby="comments-count">
  <li>
    <!-- comment content -->
    <ul>
      <li>
        <!-- reply comment content -->
      </li>
    </ul>
  </li>
</ul>
```

Each comment, regardless of its nesting level in the list structure, should be introduced by an `<h3>` level heading:  comments are subcomponents of the comments stream.

* All About The World Cup Qualifiers (`<h1>`)
    * Comments: Does the England team have any chance of qualifying for the World Cup? (`<h2>`)
        * Ben (12:00) (`<h3>`)
        * Clive (13:27) (`<h3>`)
        * Judith (14:22) (`<h3>`)
        * Alex (15:08) (`<h3>`)

While the nested list structure describes the nested relationship of replies to original comments, each comment should be considered _on the same plane_ as a contribution to the comment stream / discourse. This way, screen reader users are made aware of the nesting structure, but know that a comment of any type (reply or otherwise) can be navigated to using the `<h3>` shortcut (<kbd>3</kbd> in NVDA or JAWS on Windows).

## A single comment

Every comment on a BBC site must include:

* An `<h3>` heading containing the commenter's name and the date of submission
* The text/body of the comment

Each comment belonging to the same comment stream may also include:

* A reply button
* A sharing button
* Reaction functionality
* An overflow menu containing supplementary functionality such as reporting or sharing the comment

Where possible, it is advised you do not resort to using the overflow menu (as illustrated in the [main GEL documentation](https://www.bbc.co.uk/gel/guidelines/comments)). If there is room, make all functionality visible by default.

Where the overflow menu _is_ implemented, it should always be as the last control inside the comment, on the right (when rendered in a left-to-right language). It should expand and collapse a horizontal menu of controls according to its `aria-expanded` state (`true` for expanded; `false` for collapsed). Its (visually hidden) text label should read _"More"_.

In the following sample, the overflow menu is in the _collapsed_ state, and the menu itself is, accordingly, `hidden`.

```html
<button class="gel-comment__overflow-button" aria-expanded="false">
  <span class="gel-sr">More</span>
  <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
    <use xlink:href="/path/to/overflow/icon"></use>
  </svg>
</button>
<div class="gel-comment__overflow-menu" hidden></div>
```

### The heading

The comment's `<h3>` heading (see the previous [comments stream](#the-comments-stream) section) must include _both_ the commenter's name (as derived from the authenticated user) and the time/date the comment was posted. Only by including the time/date does the `<h3>` become unique, and therefore discernible by screen reader users navigating an aggregated headings list.

#### <mark is="bad"> Name-only headings list

* Clive
* Clive
* Clive
* Judith

#### <mark is="good"> Headings include timings

* Clive (12:00)
* Clive (12:01)
* Clive (12:04)
* Judith (12:17)

#### Linking

The heading content should also be wrapped in a link. This enables readers to link directly to, and share, the comment in contention. In the below example, clicking on the link places the comment's unique `id` in the query string, and focuses the comment itself. The `tabindex="-1"` attribution ensures keyboard focus, along with scroll position, is moved to the comment.

```html
<li class="gel-comment" id="comment-1562746727083" tabindex="-1">
  <h3>
    <a href="#comment-1562746727083">
      Clive
      <time datetime="2019-7-10T12:04">12:04</time>
    </a>
  </h3>
</li>
```

The `<time>` element's text node can display a time, a date, or a colloquialism like _"Just now"_ depending on the circumstances. However, the `datetime` value should consistently include the machine-readable format of the previous example. Here is how you would convert the current time to this format:

```js
var now = Date.now();
var timeParsed = new Date(timestamp);
var datetime = timeParsed.getFullYear() + "-" + (timeParsed.getMonth() + 1) + "-" + timeParsed.getDate() + 'T' + timeParsed.getHours() + ":" + timeParsed.getMinutes();
```

Reply comments should contain a link to both the current comment and the comment replied to, using the construction _"Person 1 replied to Person 2"_:

```html
<h3>
  <a href="#comment-1562762936794">Steve</a> 
  replied to 
  <a href="#comment-1562746727083">Clive</a>
  <time datetime="2019-08-10T13:48">13:48</time>
</h3>
```

Theoretically, reply nesting could recurse indefinitely. However, to prevent the comment stream from becoming unwieldy, it is recommended an arbitrary limit is set. Comments, say, 3 replies deep would no longer offer a reply button.

### Reaction functionality

The type of 'reaction' functionality available will vary depending on the specific BBC product. But, as illustrated in the [GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments), it is likely to be a voting or like/dislike mechanism.
Where the like/dislike controls are implemented as illustrated, they should take the form of a toggle button pair:

```html
<div class="gel-comment__vote" role="group" aria-label="vote">
  <button aria-pressed="false" aria-descibedby="total-likes-1562746727083">
    <span class="gel-sr">Like</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="/gel/static/images/gel-icons-all.svg#gel-icon-like"></use>
    </svg>
    <span id="total-likes-1562746727083" aria-hidden="true">216 <span class="gel-sr">total</span></span>    
  </button>
  <button aria-pressed="false" aria-descibedby="total-dislikes-1562746727083">
    <span class="gel-sr">Dislike</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="/gel/static/images/gel-icons-all.svg#gel-icon-dislike"></use>
    </svg>
    <span id="total-dislikes-1562746727083" aria-hidden="true">34 <span class="gel-sr">total</span></span>
  </button>
</div>
```

* **`role="group"`:** The group ARIA role[^7] is a generic role to indicate the contents are related/equivalent
* **`aria-label`:** This gives a non-visual role to the subcomponent, supplementing visual signification
* **`aria-describedby` and `aria-hidden="true"`:** `aria-describedby` appends the total vote count to the `<button>` screen reader announcement for context. Since the `<span>` is inside the button, it would also be announced on focus. This is prevented with `aria-hidden="true"`
* **`gel-sr`:** Visually hides elements only needed for non-visual clarification

See the [Recommended behaviour](#recommended-behaviour) section for notes on how state is managed for this functionality.

## Recommended layout

### The sorting control

The biggest challenge in terms of styling is the custom aesthetic for the sorting `<select>` element. The wtfforms.com site includes a solution using `appearance: none`[^8] and the positioning of a custom downwards-pointing arrow. The `<option>` elements cannot take many custom styles (only `color` and `background-color` are applicable) but this is considered a fair compromise given the robustness of the underlying native control.

```css
.gel-comments__sort {
  position: relative;
}

.gel-comments__sort select {
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  background: none;
  padding-right: 1em;
}

.gel-comments__sort svg {
  width: 0.75em;
  position: absolute;
  right: 0;
  top: 0.25em;
}
```

### Reply styling

As set forth in [the GEL Comments guide](https://www.bbc.co.uk/gel/guidelines/comments), reply comments should be demarcated using a vertical line down the left-hand side of the comment. It is recommended this is achieved using a `border` and not an image or gradient. CSS `border`s are honoured and visible in Windows High Contrast Mode.

```css
.gel-comment--reply {
  padding-left: 1rem;
  border-left: 2px solid $gel-color--blue;
}
```

### State indication

The pressed (`aria-pressed="true"`) state of controls must not be indicated only through a change in colour[^9]. In the case of the like and dislike voting controls, the [reference implementation](#reference-implementation) uses a blue `fill` for the button's SVG icon.

```css
  .gel-comment__vote button[aria-pressed="true"] path {
    fill: $gel-color--star-command-blue;
  }
```

## Recommended behaviour
 
Comments, and the ability to write them, should be considered a progressive enhancement and the functionality provided via JavaScript. In the [Reference implementations](#reference-implementation) to follow, some plain ES5 JavaScript is used to handle rendering to the DOM. In practice, you are more likely to use a library like React or Vue, and fetch comment data over XHR. 

Where there is latency, a loading spinner may need to be incorporated similar to that implemented in the [Load more component](../load-more). The [Reference implementations](#reference-implementation) use dummy content and data and just exemplify the expected layout and interaction behaviour. Rendering is instantaneous.

### Posting a comment

Where JavaScript is available, comments section is rendered and form validation initialised, as implemented in [Form fields](../form-fields). In this case, the only validation rule is that the `id="your-comment"` `<textarea>` is `required`. With the following rules object supplied, the `aria-required="true"` attribution is automatically added to the `<textarea>` element.

```js
var rules = [
  {
    name: 'your-comment',
    required: true,
  }
];
```

The `hidden` submit button is visible/available whenever the `<textarea>`'s value in non-empty. Note that this does not do away with form validation, since we still need to provide associated state information (`aria-invalid="true"`) to the user while they are typing, and where they might have deleted all their text. It is better to be explicit.

Submission is suppressed where the required field is empty, and the field's associated error element is populated. The field is marked as invalid with `aria-invalid="true"`.

```html
<div class="gel-form__divider">
  <label for="your-comment">Add your comment:</label>
  <textarea name="your-comment" id="your-comment" name="comment" rows="5" aria-describedby="your-comment-error" aria-required="true" aria-invalid="true"></textarea>
  <div class="gel-form__field-error" id="your-comment-error"><strong>Error:</strong> This field is required</div>
</div>
```

When a comment is successfully submitted, the comment stream should be immediately re-rendered to include the new comment. _"Thanks! We will check this as quickly as possible before posting"_ is appended to the `class="gel-comment__success"` live region, and the comment box value is emptied. The custom `gel-submitted` event from the [Form fields](../form-fields) validation script can be the 'hook' for this state management.

```js
form.addEventListener('gel-submitted', function () {
  successMsg.textContent = 'Thanks! We will check this as quickly as possible before posting.';
  textarea.value = '';
});
```

This message persists until the user unfocuses the submit button (a `blur` event is emitted). This is recommended over a timed removal, which would mean a change in UI unexpectedly not coinciding with a user action. The submit button itself is also hidden at this juncture (the `blur` event suggests a keyboard user will have already safely moved to another focusable element).

```js
submitButton.addEventListener('blur', function () {
  successMsg.innerHTML = '';
  submitButton.hidden = true;
});
```

#### Character count

The character count is revealed only when the `<textarea>` is in focus.

```css
.gel-comments__chars {
  display: none;
}

.gel-comments__form textarea:focus + .gel-comments__chars {
  display: block;
}
```

The accessible text for the character count (_"[number] characters remaining"_) is announced as part of the `<textarea>`'s accessible description, thanks to the element's `id` being included in the `<textarea>`'s `aria-describedby` value (see [Recommended markup](#recommended-markup)).

Decrementing the remaining characters is taken care of with an ad hoc script in the [reference implementation](#reference-implementation):

```js
textarea.addEventListener('input', function () {
  charsLeft.textContent = 200 - textarea.value.length;
});
```

#### Replying

Writing a reply to a comment is first invoked by pressing the original comment's reply button. This should reveal an inline comment form, similar to [the main comment form](#the-comment-form), directly under the reply button, and the reply `<textarea>` should be focused. Reply forms are not implemented in the [reference implementation](#reference-implementation) but they should behave similarly to [the main comment form](#the-comment-form), with character count and validation error messages included.

### Sorting

Selecting a sorting option should immediately re-render the comments stream in the new order. The newly selected option doubles as the control's new label (_"Oldest first"_ in the following example). Since a native `<select>` control is used, all of the expected behaviours for such a control are present.

```html
<label class="gel-comments__sort" for="comments-sort">
  <span class="gel-sr">Sort</span>
  <select id="comments-sort">
    <option>Latest first</option>
    <option selected>Oldest first</option>
  </select>
</label>
```

### Voting 

The example voting functionality illustrated in the [Reaction functionality](#reaction-functionality) section can exist in states. At the outset, no voting has taken place. Each `<button>` takes `aria-pressed="false"`.

```html
<div class="gel-comment__vote" role="group" aria-label="vote">
  <button aria-pressed="false" aria-descibedby="total-likes-1562746727083">
    <span class="gel-sr">Like</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="/gel/static/images/gel-icons-all.svg#gel-icon-like"></use>
    </svg>
    <span id="total-likes-1562746727083" aria-hidden="true">216 <span class="gel-sr">total</span></span>    
  </button>
  <button aria-pressed="false" aria-descibedby="total-dislikes-1562746727083">
    <span class="gel-sr">Dislike</span>
    <svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
      <use xlink:href="/gel/static/images/gel-icons-all.svg#gel-icon-dislike"></use>
    </svg>
    <span id="total-dislikes-1562746727083" aria-hidden="true">34 <span class="gel-sr">total</span></span>
  </button>
</div>
```

Where _either_ of the buttons are pressed, that button's `aria-pressed` state is switched to `true`. 

```html
<button aria-pressed="true" aria-descibedby="total-likes-1562746727083">Like</button>
```

Press the same _"Like"_ button again and its state should switch back to `aria-pressed="false"`. Accordingly, the total for likes should be decremented. If the _"Dislike"_ button is pressed while the _"Like"_ button is in the `aria-pressed="true"` state, both button states change: _"Like"_ to `false` and _"Dislike"_ to `true`. Likes decrement by `1` and dislikes increment by `1`. Users cannot both like and dislike something simultaneously.

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
[^4]: ARIA Practices: Menu Button — WAI, <https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton>
[^5]: WTFForms — Mark Otto, <http://wtfforms.com/>
[^6]: NVDA Keyboard Shortcuts — Deque University, <https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts>
[^7]: Using the `group` role — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role>
[^8]: `appearance` — MDN, <https://css-tricks.com/almanac/properties/a/appearance/>
[^9]: WCAG2.1 1.4.1 Use Of Color, <https://www.w3.org/TR/WCAG21/#use-of-color>
