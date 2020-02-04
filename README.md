# hugo-bin

> [Hugo](https://gohugo.io/) is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.

## Version

The version of this package does not relate to the Hugo release version. There will be dist-tags on the npm package in the format of `hugo-<major>.<minor>.<patch>`.

## Install

```
$ npm install --save @davidofferman/hugo-bin
$ npm install --save @davidofferman/hugo-bin@hugo-0.64.0
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
