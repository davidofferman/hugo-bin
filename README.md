# hugo-bin

> [Hugo](https://gohugo.io/) is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.


## Install

```
$ npm install --save @davidofferman/hugo-bin
```


## Usage

```js
const util = require('util');
const cp = require('child_process');
const hugo = require('@davidofferman/hugo-bin');

const execFile = util.promisify(cp.execFile);

(async () => {
	await execFile(hugo, ["--destination", "dist"]);
	console.log('Hugo built to "dist"');
})();
```


## CLI

```
$ npm install --global @davidofferman/hugo-bin
```

```
$ hugo --help
```
