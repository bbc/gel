# bbc/code-gel

Static documentation generator for GEL components.

## Installation

Known to work on nodeJS version `v8.9.4`.

Try...

`nvm use 8`

And then...

```
npm install
npm link
```

## Build

To generate the HTML output into the project `docs` folder, using the markdown from the project `src` folder, run this command...

`npm run build`

To make updates to the generated CSS files from the `scss` source...

`npm run sass`

## Example

This is only an example: https://bbc.github.io/code-gel/components/hello-world/

## Testing

It's just HTML, so you only need to open up a web browser :-)

If you're trying to preview the site running off of your desktop, I recommend using [the awesome 'serve' module](https://www.npmjs.com/package/serve).

From the project base directory simply run...

`serve`

Then navigate to the resulting server address like so: `http://localhost:8888/code-gel/components/hello-world` using whatever hostname and port is appropriate.

## Advanced

Supported shortcodes that can be included in the Markdown source:

### `<note>`

```html
<note text="`setState` is asynchronous, so a callback function is used to trigger the `focus()` method." />
```

... becomes ...

```html
<aside class="note" aria-label="Note:">
  <p class="note_label" aria-hidden="true"><strong>Note</strong></p>
  <p><code>setState</code> is asynchronous, so a callback function is used to trigger the <code>focus()</code> method.</p>
</aside>
```

### `<important>`

```html
<important text="The button's state is not toggled via `aria-expanded`. This is because the button label changes, and a simultaneous change in state would result in contradictory information." />
```

... becomes ...

```html
<aside class="note" aria-label="Important:">
  <p class="note_label" aria-hidden="true"><strong>Important</strong></p>
  <p>The button's state is not toggled via <code>aria-expanded</code>. This is because the button label changes, and a simultaneous change in state would result in contradictory information.</p>
</aside>
```
