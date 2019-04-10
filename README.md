# bbc/gef-docs
Static documentation generator for GEF components.

## Installation
Prerequisites: Node.js 8+ (known to work on v8.9.4) and NPM.

1. `cd gef-docs`
2. `npm install`
3. `npm link`

## Develop
- `npm run develop`

This will watch and compile files, and serve `docs/` on localhost while reloading the browser automatically.

## Build
To generate the HTML output into the project `docs` folder, using the markdown from the project `src` folder, run this command...

- `npm run html`

To make updates to the generated CSS files from the `scss` source...

- `npm run sass`

If you have added new JS files to the project, you may include them in the `main.js` file...

- `npm run js`

Or, if you're feeling like you want it all, try this...

- `npm run build`

## Example

This is only an example: https://bbc.github.io/gef-docs/components/hello-world/

## Testing

It's just HTML, so you only need to open up a web browser :-)

If you're trying to preview the site running off of your desktop, I recommend using [the awesome 'serve' module](https://www.npmjs.com/package/serve).

From the project base directory simply run...

- `serve`

Then navigate to the resulting server address like so: `http://localhost:8888/gef-docs/components/hello-world` using whatever hostname and port is appropriate.
