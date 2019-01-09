---
title: Video controls
summary: Custom HTML5 video functionality must be accessible and intuitive
version: 0.1.0
published: false
accessibility: false
---

## Introduction

Video is an important consideration for a broadcasting company. The BBC presents web-based video in a variety of different ways. Sometimes the video is embedded in a fully-featured player, and in other cases just a couple of basic controls are present. The purpose of this 
documentation the recommended interaction design for custom video controls.

## Recommended markup

### Baseline

Before enhancing a video instance with custom controls, there are a few fundamental considerations. Here is a code example, with notes to follow.

```html
<video controls>
  <source src="path/to/video.webm" type="video/webm">
  <source src="path/to/video.mp4" type="video/mp4">
  <track label="English" kind="subtitles" srclang="en" src="path/to/captions.vtt" default>
  <p>
    Your browser doesn't support HTML5 video.
    <a href="path/to/video.mp4" download>Download</a> the video instead.
  </p>
</video>
```

1. **`<video>`:** The standard video element is used.
2. **`mp4`:** A well-supported video format is included (optionally with alternative formats via `<source>` elements).
3. **`controls`:** Controls are activated via the `controls` Boolean. 
4. **`download`:** An option to download the video is provided for browsers not supporting HTML5 video.
5. **`kind="subtitles"`:** Videos with dialogue need captions, provided in `<track>` elements. In the following examples, only a single English captions track is provided, but additional languages should be supported where possible.

If your video has dialog and you are using custom controls, do one of the following:

* Display captions by default
* Provide custom controls to access captions
* Provide an option to switch back to using native controls (which will include captions functionality)

### Enhancement

Custom controls should be added progressively. Until JavaScript is run, the `<video>` should take `controls` to provide the native controls, and any custom controls should be hidden with `hidden`:

```html
<div class="codegel-video-container" role="group">
  <video controls>
    <source src="path/to/video.webm" type="video/webm">
    <source src="path/to/video.mp4" type="video/mp4">
    <p>
      Your browser doesn't support HTML5 video.
      <a href="path/to/video.mp4" download>Download</a> the video instead.
    </p>
  </video>
  <div class="codegel-video-controls" hidden>
    <!-- custom controls here -->
  </div>
</div>
```

::: info The group role
Note the inclusion of the ARIA `group` role[^1] in the above example. This communicates to assistive technologies that the video player and custom controls are semantically related.
:::

The JavaScript to switch to the enhanced/custom version is trivial:

```js
// Where `video` represents the <video> node
// and `customControls` the custom controls container
video.controls = false;
customControls.hidden = false;
```

### Toggle buttons

Many of the controls for video playback, including **Play** and **Mute**, are simple toggle buttons switching the user between active and inactive states. It is important these controls:

1. Are native `<button>` elements
2. Take the `type="button"` attribution
3. Modify their label depending on state

In regards to (3), toggle buttons often have a persistent label and communicate state via `aria-pressed` (`true` or `false`). However, video player controls should be easy to voice activate, so their labels must be consistent with their iconography. For example, for the play button:

* Paused state → shows the familiar triangle-shaped icon → "play"
* Playing state → shows the familiar two-vertical-lines icon → "pause"

In the [reference implementation](#reference-implementation), an `active` class is appended to the parent button in its active state. This is used as a styling hook to toggle between the two text labels and their icons. In the following example, `class="code-gel-video-button-play-off` is hidden with `display: none` and it not available to assistive technologies. The calculated accessible name is _"Pause"_.

```html
<button class="codegel-video-play-button active" type="button">
  <span class="codegel-video-button-off">
    <span class="vh">Play</span>
    <svg><!-- play icon --></svg>
  </span>
  <span class="codegel-video-button-on">
    <span class="vh">Pause</span>
    <svg><!-- pause icon --></svg>
  </span>
</button>
```

The text labels are included as `<span>`s and hidden visually using the `vh`[^2] class.

#### Icons

Icons for custom controls should be taken from the standard [GEL Iconography](https://www.bbc.co.uk/gel/guidelines/iconography) set. They must take `aria-hidden="true"` and `focusable="false"`[^3] to ensure they are not available to assistive technologies or focusable by keyboard.

```html
<svg class="gel-icon gel-icon--text" focusable="false" aria-hidden="true">
  <use xlink:href="pth/to#gel-icon-play"></use>
</svg>
```

### The timeline

AKA the 'scrub' or progress bar. It has two purposes:

1. To indicate the current progress of the video
2. To allow the user to select a point along this timeline

The timeline must, therefore, be keyboard and screen reader accessible. The `type="range"` input is a robust solution.

```html
<label for="timeline" class="codegel-video-scrub-container">
  <span class="vh">Timeline</span>
  <input type="range" id="timeline" min="0" max="95.2" value="14.7" />
</label>
```

Note `min`, `max`, and `value`, which determine the range and the current play position. These values are in seconds. The `max` and `value` values map to the `<video>`'s `duration` and `currentTime` properties.

To make these values more readable non-visually, they are rounded up into whole numbers and converted into minutes and seconds to be represented by the `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` properties.

```html
<label for="timeline" class="codegel-video-scrub-container">
  <span class="vh">Timeline</span>
  <input type="range" id="timeline" min="0" aria-valuemin="0 seconds" max="95.2" aria-valuemax="1 minutes and 35 seconds" value="14.7" aria-valuenow="0 minutes and 14 seconds" />
</label>
```

### Recommended layout

The layout will differ depending on the context and number of simultaneous controls that are implemented. It is, however, recommended the controls are sufficiently large enough to be targeted by mouse and touch, and they carry clear focus styles.

```css
.codegel-video-container button:focus {
  outline: 2px solid $gel-color--tundora;
}
```

The `type="range"` input (for the timeline) requires a number of proprietary styles to have a custom appearance[^4]. 

#### The controls container

In the [reference implementation](#reference-implementation), the controls container uses Flexbox to distribute the controls along a horizontal axis. The timeline constiner takes `flex: auto` to take up any space not taken by surrounding buttons. This makes the control bar responsive and tolerant of different functionality complexity.

```css
.codegel-video-timeline-container {
  flex: auto;
}
```

## Recommended behaviour

### Autoplay

If the video is set to `autoplay`, it is imperative the video is muted by default. Some browsers handle this for users already[^5], but not all. In which case, we need to set the muted state on the `loadedmetadata` event (when the video has been appended to the DOM):

```js
video.addEventListener('loadedmetadata', function () {
  if (video.autoplay) {
    video.muted = true;
  }
});
```

It is especially important that autoplaying videos are muted since screen reader users rely on the synthetic voice output of their software to navigate, and this should not be 'talked over' by any video. They will not know where this uninvited noise is coming from, and it may take them some time to locate the video to mute it.

### Play and mute buttons

Any play button must switch its label and iconography according to the play state (see [Recommended markup](#recommended-markup) for information on labeling and accessible SVGs).

In the [reference implementation](#reference-implementation), both the **Play** and **Mute** buttons take an `active` class in their active state, to use as a styling hook (this is used to show/hide the appropriate icon and accessible label).

In the **Play** button's case, the button must be switched into an inactive state upon the video ending (otherwise the button's appearance will be out of sync' for successive plays of the video):

```js
self.playButton = function (button, video) {
  button.addEventListener('click', function () {
    video.paused || video.ended ? video.play() : video.pause();
    button.classList.toggle('active');
  });

  video.addEventListener('ended', function () {
    button.classList.remove('active');
  });
}
```

### The timeline

As stated in [Recommended markup](#recommended-markup), the timeline must represent the current state of progress _and_ allow the user to 'scrub' and relocate themselves within the video's duration. 

The first part is achieved by linking the input's value to the video's `currentTime` property within successive `'timeupdate'` events:

```js
video.addEventListener('timeupdate', function () {
  range.value = video.currentTime;
  range.setAttribute('aria-valuenow', getMins(video.currentTime));
});
```

Note that `aria-valuenow` must be updated too, translating the cryptic `value` of the input for screen reader users. The `getMins` function converts the value into minutes and seconds:

```js
var getMins = function (secs) {
  let mins = Math.floor(secs / 60);
  let remainder = secs - mins * 60;
  return mins + ' minutes and ' + Math.round(remainder) + ' seconds';
}
```

Searching/scrubbing is accommodated by listening on `'input'`:

```js
range.addEventListener('input', function () {
  video.currentTime = range.value;
});
```

The keyboard user is able to focus the input and use the arrow keys to 'scrub' right and left in increments.

### Reference implementation

::: alert Important
Reference implementations are intended to demonstrate **what needs to be achieved**, but not necessarily how to achieve it. That would depend on the technology stack you are working with. The HTML semantics, layout, and behaviour of your implementation should conform to the reference implementation. Your JS framework, CSS methodology, and—most likely—content will differ.
:::

<include src="components/demos/video.html">

<p><a class="geldocs-button geldocs-button--dark geldocs-long-primer-bold" href="../demos/video/" target="_new">Open in new window <svg class="geldocs-button__icon geldocs-icon geldocs-icon--text"><use xlink:href="/code-gel/static/images/gel-icons-core-set.svg#gel-icon-external-link" style="fill:currentColor"></use></svg></a></p>

## Related research

This topic does not yet have any related research available.

### Further reading, elsewhere on the Web

[^1]: Using the group role — MDN, <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role>
[^2]: Gist of the `vh` (visually hidden) class,  <https://gist.github.com/Heydon/c8d46c0dd18ce96b5833b3b564e9f472> 
[^3]: IE focus bugs with focusable elements — Simply Accessible,  <https://simplyaccessible.com/article/7-solutions-svgs/#acc-heading-4> 
[^4]: Styling Cross-browser compatibe range inputs — CSS Tricks, <https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/>
[^5]: Autoplay Policy Changes — Google Developers, <https://developers.google.com/web/updates/2017/09/autoplay-policy-changes>

