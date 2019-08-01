# bbc/gel Technical Guides

## Summary

This repository holds the _documentation_ for the BBC GEL Technical Guides. The purpose of the code in this project is to compile and generate the website found at https://bbc.github.io/gel Notice that there is *no library or framework here*, we're just about documentation.

## Contributing

We love contributors. If you have an idea for how to make an improvement, let us know by [creating an issue to discuss your idea](https://github.com/bbc/gel/issues). We recommend you familiarise yourself with [the process of creating a pull-request in GitHub](https://help.github.com/en/articles/creating-a-pull-request) before proceeding.

Our project is roughly organised into [source files](https://github.com/bbc/gel/tree/master/src) and generated [documentation files](https://github.com/bbc/gel/tree/master/docs). As writers we work in the [Markdown](https://learnxinyminutes.com/docs/markdown/)-formatted files in the `/src` folder. Running the build scripts, described below, will then generate the corresponding web pages in the `/docs` folder.

## Installation
Prerequisites: Node.js 8+ (known to work on v8.9.4) and NPM.

```
git clone https://github.com/bbc/gel.git
cd gel
npm install
```

## Develop
- `npm run develop`

This will watch and build files, and serve the `docs` folder on localhost while reloading the browser automatically.

## Build
To generate the HTML output into the project `docs` folder, using the markdown from the project `src` folder, run this command...

- `npm run html`

To make updates to the generated CSS files from the `scss` source...

- `npm run sass`

If you have added new JS files to the project, you may include them in the `main.js` file...

- `npm run js`

Or, if you're feeling like you want it all, try this...

- `npm run build`

## Test
We use Cypress and a Cucumber pre-processor to run the feature files found in [cypress/integrations](cypress/integrations).

- `npm test`

To run the test suite.
