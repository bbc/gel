# bbc/gel Technical Guides

## Summary

This repository holds the source for the _documentation_ that explains the BBC GEL Technical Guides: the result of running this project is to produce the static HTML-based website found at https://bbc.github.io/gel.

Notice that there is *no library or framework here*, we're just documentation all the way down.

## Contributing

We love contributors. If you have an idea for how to make an improvement, let us know by [creating an issue to discuss your idea](https://github.com/bbc/gel/issues). We recommend you familiarise yourself with [the process of creating a pull-request in GitHub](https://help.github.com/en/articles/creating-a-pull-request) before proceeding.

[Raising an issue](https://github.com/bbc/gel/issues) is a great way to contribute! Let us know if you spotted anything that can be fixed or improved or if you have an idea for a change. You don't need to have any special software or developer skillz to raise an issue or make a suggestion, just pop onto our public GitHub website and let us know!

If you do want to work with our source files, you will need to have the `git` commandline  tool (or the [GitHub Desktop client](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop)) installed. With `git` you can [`clone` our repository](https://www.youtube.com/watch?v=CKcqniGu3tA) onto your own computer and get hacking! This project's files are roughly organised into [source files](https://github.com/bbc/gel/tree/master/_content) and generated [documentation files](https://github.com/bbc/gel/tree/master/docs). As authors we work in the [Markdown](https://learnxinyminutes.com/docs/markdown/)-formatted files in the `/_content` folder.

Running the build scripts, described below, will then generate the corresponding web pages in the `/docs` folder. Use `git` to commit and [create a pull request](https://opensource.com/article/19/7/create-pull-request-github). We'll take it from there!

## Installation

Prerequisites:

* This requires [`npm` and `node` commandline tools to be installed](https://nodejs.dev/learn/how-to-install-nodejs). this process is known to work on NodeJS v12.x.
```
$ node -v
  v12.13.0
$ npm -v
  6.12.0
```
* Global [`sass`](https://www.npmjs.com/package/sass) binary installed: Like `npm i sass -g`
```
$ sass --version
  1.34.1 compiled with dart2js 2.13.1
```
* Global [`uglifyjs`](https://www.npmjs.com/package/uglify-js) binary installed: Like `npm i uglify-js -g`
```
$ uglifyjs --version
  uglify-js 3.11.6
```
* Global [`gulp`](https://www.npmjs.com/package/gulp) binary installed: Like `npm i gulp -g`
```
$ gulp --version
  CLI version: 2.3.0
```

To install:
```
$ git clone https://github.com/bbc/gel.git
$ cd gel
$ npm install
$ npm link
```

## Develop
- `npm run watch`

This will use `gulp` to watch and compile files, and serve the `docs` folder on localhost while reloading the browser automatically.

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

If you're trying to preview the site running off of your desktop, you can run the `serve` script:

From the project base directory...

- `npm run serve`

Then navigate to the resulting server address like `http://localhost:3000/components/hello-world` (or using whatever hostname and port is appropriate).

## Licence

The code in this repository is used to generate our documentation and is unlicenced. The generated documentation itself is published at <https://bbc.github.io/gel/> and is licenced under the [Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/), unless otherwise noted.
