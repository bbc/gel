---
title: Form fields and validation
summary: Form fields must be accessible and usable, helping the user to provide valid input
version: 0.1.0
published: true
accessibility: false
linkback: https://www.bbc.co.uk/gel/guidelines/how-to-design-forms
---

## Introduction

Gracefully handling user input is critical to the usability of BBC services, but also an area of Interaction Design fraught with potential problems. The purpose of this document is to set out robust approaches to presenting and validating form fields.

The focus here is on web-based forms. For further guidance specific to mobile/native applications, please consult the [BBC Mobile Accessibility Guidelines](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/mobile/forms/labelling-form-controls).

## Recommended markup

### Labeling

Any field's element needs to be associated programmatically with a label. This is achieved by making the label's <code>for</code> attribute and the input's <code>id</code> attribute share the same value.

```html
<label for="username">Username</label>
<input type="text" id="username" name="username" />
```

::: info `name` and `id`
It is a common misconception that the `name` attribute is used in label calculation. Although it often takes the same value as the `id`, it is only the `id` that associates the label to the input.
:::

#### Group labels

Sometimes multiple form elements should be grouped together under a common label. The standard method for creating such a group is with the `<fieldset>` and `<legend>` elements. The `<legend>` must be the first child inside the `<fieldset>`.

```html
<fieldset>
  <legend>Group label</legend>
  <!-- individually labelled elements -->
</fieldset>
```

This is most important when providing radio button controls: a group of radio buttons, sharing a common `name` attribute, constitute _a single_ form field and the `<legend>` labels this field.

```html
<fieldset>
  <legend>Your favourite pet</legend>
  <label>
    <input type="radio" name="favourite-pet">
    Cat
  </label>
  <label>
    <input type="radio" name="favourite-pet">
    Dog
  </label>
  <label>
    <input type="radio" name="favourite-pet">
    Seahorse
  </label>
</fieldset>
```

::: info Label wrappers
Note the use of labels _wrapping_ inputs in the above example. Only when wrapping inputs in `<label>`s can you omit the `for` and `id` association. It is a common pattern for radios and checkboxes.
:::

It's quite legitimate to place headings inside `<legend>`s. In fact, this helps to give your form a semantic structure (improving navigation by screen reader users) without having to create separate and redundant labels.

```html
<fieldset>
  <legend><h2>Group label</h2></legend>
  <!-- individually labelled elements -->
</fieldset>
```

### Descriptions, not placeholders

The `placeholder` attribute is often misused to supplant the primary label. Not only is the `placeholder` less reliable for accessible name calculation, but it also presents a number of issues relating to cognition, translation, and interoperability[^1].

Where they _are_ used, placeholders should only give supplemental information, such as a hint regarding the expected input format. It is strongly recommended you use descriptions instead of `placeholders` for this purpose. Descriptions are appended to the `<label>` and, therefore, counted in the accessible name calculation. Unlike `placeholder`s, they persist during input and their text content can wrap, so is not in danger of being obscured.

In the following example, the `<small>` element is used to demarcate the description visually. By default, it will display smaller text. You can place it on a new line by applying `display: block`. Note that `<label>` elements are inline level, so it is non-conforming to include block elements inside them.

```html
<label for="username">
  Username
  <small>You set this when you signed up</small>
</label>
<input type="text" id="username" name="username" />
```

Not all form fields need descriptions.

### Input types

Where specialist HTML5 input types are well supported, it is advised they are used in place of the generic (and default) `type="text"`. The `number` `type`, for example, helpfully restricts input to numerals, allows incrementation—typically by providing up and down buttons—and elicits the display of a numerical virtual keyboard.

::: alert Avoid custom form elements
The most efficient and robust way to implement accessible form fields is to use the native `<input>`, `<textarea>`, and `<select>` elements. These elements have predefined and expected behaviours, and automatically communicate their roles, values, and states to assistive technologies.

It is _possible_ to emulate native form element behaviour with WAI-ARIA attribution and JavaScript, but it
is rarely a good idea. Implementations tend towards complexity, and are necessarily more likely
to break because they depend on JavaScript in order to function.

```html
<!-- native -->
<input type="checkbox">

<!-- WAI-ARIA (requiring JavaScript to switch the checked state) -->
<div role="checkbox" aria-checked="false" tabindex="0"></div>
```
:::

### Error states

When a field has an invalid value, its invalidity and an associated error message must be communicated clearly and accessibly. Since HTML5 native form validation is implemented inconsistently[^2], it is recommended `novalidate` is placed on each field or the parent form, preferring a custom validation process.

The validation process is described in [Recommended behaviour](#recommended-behaviour).

#### `aria-invalid`

A field element in an invalid state should have `aria-invalid="true"`, and `aria-invalid="false"` once the invalidity is corrected.

#### The error message

Error messages should be concise but descriptive. They are associated to their field element as an accessible description via `aria-describedby`. This element is populated with an appropriate error message when the field becomes invalid, and emptied when it is corrected. This element contains `role="alert"` to ensure the change of state is announced to users.

```html
<!-- indeterminate (initial) state -->
<label for="username">
  Username
  <small>You set this when you signed up</small>
</label>
<input type="text" id="username" name="username" aria-describedby="username-error" />
<div role="alert" id="username-error"></div>

<!-- invalid state-->
<label for="username">
  Username
  <small>You set this when you signed up</small>
</label>
<input type="text" id="username" name="username" aria-describedby="username-error" aria-invalid="true" />
<div role="alert" id="username-error">Error: Your username cannot contain spaces</div>

<!-- valid state-->
<label for="username">
  Username
  <small>You set this when you signed up</small>
</label>
<input type="text" id="username" name="username" aria-describedby="username-error" aria-invalid="false" />
<div role="alert" id="username-error"></div>
```

#### Required fields

It is assumed that any fields presented to the user should be completed, otherwise they should not be present. In which case, it is considered needlessly obstructive to indicate required fields before or during individual field validation. 

Only when submission is attempted should the `aria-required="true"` attribution and error message be instated. This attribution is preferred over the HTML5 `required` Boolean just as `aria-invalid` is preferred over `invalid`.

```html
<label for="username">
  Username
  <small>You set this when you signed up</small>
</label>
<input type="text" id="username" name="username" aria-required="true" aria-invalid="true" aria-describedby="username-error" />
<div id="username-error">Error: This field is required</div>
```

Instead of indicating required fields, indicate optional ones. These should be fewer in number. Suffix the `<label>`'s text with '(optional)'.

```html
<label for="fact">Interesting fact (optional)</label>
<input type="text" id="fact" name="fact" aria-describedby="username-error" />
```

## Recommended layout

### Order and orientation

Place labels (and their descriptions, if present) _above_ form elements. This is especially important on mobile platforms because the invoked virtual keyboard has a habit of obscuring labels to the side or below inputs. 

Animated labels that appear as `placeholder`s, then animate upwards to assume the position of a label, should be avoided for their pressure on cognition[^3]. A label _over_ an input, similar to a `placeholder`, can misidentify the field as having a value and being already completed.

#### The 'general' error message

When the user attempts to submit a form containing errors, a general error message appears (and is alerted to screen reader users as an ARIA live region, see [Reference implementation](#reference-implementation)). This error message should appear directly above the submit button, making it visible to the user without the need for scrolling.

The general error message will appear when submission fails and the live region is populated with the error message.

```html
<!-- Initial state -->
<div role="alert"></div>
<button type="submit">Submit</button>

<!-- Submission failed -->
<div role="alert">Errors: Please fix the errors in the form before continuing</div>
<button type="submit">Submit</button>
```

### Invisible labels

It is strongly recommended that form fields have visible and persistent labels; labels that do not disappear upon focus or input.

However, in some specific circumstances an invisible but accessible label is acceptable. For example, a single input search form may have a submit button that reads "Search" — effectively providing a label for both the input and the button itself. In this case, you can hide the `<label>` visually, using a class that keeps the label available to assistive technologies[^4].

```html
<label for="search" class="vh">Your search term</label>
<input id="search">
<button type="submit">Search</button>
```

### High Contrast Mode

A couple of provisions are made to better support Windows High Contrast Mode. A transparent border is added to the error messages so they appear as boxes and, for supporting browsers, the message takes an inversion filter to give it the appearance of a background:

```css
.gel-form__field-error,
.gel-form__warning {
  border: 1px solid transparent;
}

@media (-ms-high-contrast: active) {
  .gel-form__field-error,
  .gel-form__warning {
    filter: invert(100%);
  }
}
```

### Error indication

It is imperative that errors are clearly identified as such. Do not rely on colour to denote an error state[^5] since it will fail on monochrome displays, and for those who cannot accurately perceive colour.

Where there are errors, there should always be error messages. Prefixing the error message with 'Error:',  or a warning symbol, ensures the nature of the message is conveyed explicitly.

```html
<div id="username-error"><strong>Error:</strong> Your username cannot contain spaces</div>
```

### High contrast

How the component looks with a [Windows High Contrast Mode](https://support.microsoft.com/en-gb/help/13862/windows-use-high-contrast-mode) theme active.

![The error message is white with black text](../../static/images/hcm_form_fields.png)

A CSS filter is used to reverse the colours of the error message:

```css
@media (-ms-high-contrast: active) {
  .gel-form__field-error,
  .gel-form__warning {
    filter: invert(100%);
  }
}
```

## Recommended behaviour

Form validation should comprise of two phases:

1. Individual field validation
2. Form submission and validation

The following describes the validation journey, as exemplified by the [**Reference implementation**](#reference-implementation).

### 1. Initial state

* No fields have the `aria-invalid` attribute
* Required fields have `aria-required="true"`
* The general error live region is present in the DOM, but not yet populated

### 2. Individual field validation

* Fields are validated as the user types subject to a debouncing function, giving the user a chance to type a full valid entry before an error message is displayed. 
* `aria-invalid` is toggled between `true` and `false` as the field becomes valid or invalid.
* The error element is populated with a priority error message when the field is in an invalid state (priority depends on the order the `tests` array is populated in the `rules` object; see the [**Reference implementation**](#reference-implementation)).

### 3. Failed submission

* The general error message live region is populated.
* Focus remains on the submit button.

### 4. Correcting errors after failed submission

* Error messages are removed as individual fields are corrected
* Upon all individual errors being corrected, the general error message is removed.

### 5. Successful submission

* The custom `gel-submitted` event is fired on the form. In the [**Reference implementation**](#reference-implementation) this is just used to fire an `alert`.

### Variants and caveats

* Some implementations disable the submit button until the subject form is free of errors. This is not recommended since it can be confusing and frustrating to some users[^6]. Better to allow submission and be explicit with a warning.
* Some implementations disable fields that have been correctly completed, in an effort to make it clearer which fields need addressing. It is recommended that all fields remain enabled, so users can adjust their input at any time. In some cases, correcting one input's value may mean having to adjust another's, even if it is superficially correct in terms of format.
* You may wish to employ 'positive validation', wherein inputs that are successfully completed display a green style and 'tick'. The difficulty here is in discerning between a correct format, and correct information. Showing a tick next to a correctly formatted bank card number, for example, is misleading: the user may believe you're aware it is the correct number for their specific card.

## Reference implementation

::: alert Important
Example implementations are intended to demonstrate **what needs to be achieved** but not how to achieve it. To meet our recommendations your HTML semantics, layout and behaviour must conform to the example implementation. Your server-side and front-end frameworks will likely differ.
:::

<include src="components/demos/form-fields.html">

<p><a class="gel-cta gel-long-primer-bold" href="../demos/form-fields/" target="_new"><span class="gel-button__label">Open in new window</span><svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="/gel/static/images/gel-icons-core-set.svg#gel-icon-external-link"></use></svg></a></p>

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Do Not Use The Placeholder Attribute — Eric Bailey (Smashing Magazine), <https://www.smashingmagazine.com/2018/06/placeholder-attribute/>
[^2]: Native Form Validation — Peter-Paul Koch, <https://medium.com/samsung-internet-dev/native-form-validation-part-3-8e643e1dd06>
[^3]: Floating Labels Are Problematic — Adam Silver, <https://medium.com/simple-human/floating-labels-are-a-bad-idea-82edb64220f6>
[^4]: Gist of the `vh` (visually hidden) class,  <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^5]: WCAG2.1 1.4.1 Use Of Color, <https://www.w3.org/TR/WCAG21/#use-of-color>
[^6]: Disabled buttons suck — Axesslab, <https://axesslab.com/disabled-buttons-suck/>
