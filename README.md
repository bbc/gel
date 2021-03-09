# bbc/gel Technical Guides

## Summary

This repository holds the _documentation_ for the BBC GEL Technical Guides. The purpose of the code in this project is to compile and generate the website found at https://bbc.github.io/gel Notice that there is *no library or framework here*, we're just about documentation.

## Contributing

We love contributors. If you have an idea for how to make an improvement, let us know by [creating an issue to discuss your idea](https://github.com/bbc/gel/issues). We recommend you familiarise yourself with [the process of creating a pull-request in GitHub](https://help.github.com/en/articles/creating-a-pull-request) before proceeding.

Our project is roughly organised into [source files](https://github.com/bbc/gel/tree/master/src) and generated [documentation files](https://github.com/bbc/gel/tree/master/docs). As writers we work in the [Markdown](https://learnxinyminutes.com/docs/markdown/)-formatted files in the `/src` folder. Running the build scripts, described below, will then generate the corresponding web pages in the `/docs` folder.

## Installation

Prerequisites:

* Requires `npm` and `node`. (Known to work on NodeJS v11.)
* Global [`uglify`](https://www.npmjs.com/package/uglify-js) binary installed: Like `npm install uglify-js -g`
* Global [dart `sass`](https://sass-lang.com/install) binary installed: Like `brew install sass/sass/sass`

1. `cd gel`
2. `npm install`
3. `npm link`

## Develop
- `npm run develop`

This will watch and compile files, and serve the `docs` folder on localhost while reloading the browser automatically.

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

This is only an example: https://bbc.github.io/gel/components/hello-world/

## Testing

It's just HTML, so you only need to open up a web browser :-)

If you're trying to preview the site running off of your desktop, I recommend using [the awesome 'serve' module](https://www.npmjs.com/package/serve).

From the project base directory simply run...

- `serve`

Then navigate to the resulting server address like so: `http://localhost:8888/gel/components/hello-world` using whatever hostname and port is appropriate.

## Licence

The code in this repositoy is used to generate our documentation and is unlicenced. The generated documentation itself is published at <https://bbc.github.io/gel/> and is licenced under the [Open Government Licence](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/), unless otherwise noted.
