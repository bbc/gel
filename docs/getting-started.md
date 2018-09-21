_Note that this is a **prototype**, do not use, move along, nothing to see here._


# Getting Started

A quick overview of how to get up and running with GelUI.

## Installation

Via the `npm` tool.

```
$ npm install @bbc-gelui/core
```

Or include through a CDN.

```html
<link rel="stylesheet" href="https://cdn.bbc.co.uk/gelui/font.css?family=Reith:300,400,500">
<script src="https://cdn.bbc.co.uk/gelui/core/main.umd.min.js" crossorigin="anonymous"></script>
```

## Usage

Assuming your host page should have HTML like this:

```html
<div id="app"></div>
```

You can use the following React code to add a GelUI Card to your "app" element:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@bbc-gelui/core/Card';

function App() {
  return (
    <Card variant="xwide" theme="bbcsport">
      Hello World
    </Card>
  );
}

ReactDOM.render( <App />, document.querySelector('#app') );
```

### Not using React?

We also speak Vanilla here.

```js
require(['@bbc-gelui/core/Card'], function (Card) {
	var card = Card.render(
		'Hello World',
		{
			variant: 'xwide',
			theme: 'bbcsport'
		}
	);
	document.querySelector('#app').innerHTML = card;
});
```