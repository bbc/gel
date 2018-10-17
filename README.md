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

If you have added new JS files to the project, you may include them in the `main.js` file...

`npm run js`

Or, if you're feeling like you want it all, try this...

`npm run js && npm run sass && npm run build`

## Example

This is only an example: https://bbc.github.io/code-gel/components/hello-world/

## Testing

It's just HTML, so you only need to open up a web browser :-)

If you're trying to preview the site running off of your desktop, I recommend using [the awesome 'serve' module](https://www.npmjs.com/package/serve).

From the project base directory simply run...

`serve`

Then navigate to the resulting server address like so: `http://localhost:8888/code-gel/components/hello-world` using whatever hostname and port is appropriate.
