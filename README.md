# gelui-docs

## Installation

Works on node version `v8.9.4`.

`npm install`

## Build

To generate HTML output into the project `docs` folder, using the markdown from the project `src` folder:

`npm run build`

That's it!

## Running

It's just HTML, so just open a web browser :-) If you are running the site off of your desktop, I recommend using [the node serve module](https://www.npmjs.com/package/serve). From the project base directory simply run:

`serve`

Then navigate to the resulting server like so: `http://localhost:8888/gelui-docs/components/hello-world/` (using whatever hostname and port is appropriate).