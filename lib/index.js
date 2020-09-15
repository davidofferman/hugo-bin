'use strict';
const path = require('path');
const pkgjson = require('../package.json');
const BinWrapper = require('./binwrapper');

const url = `https://github.com/gohugoio/hugo/releases/download/v${pkgjson.hugoVersion}/hugo_${pkgjson.hugoVersion}`;

module.exports = new BinWrapper()
	.src(`${url}_macOS-64bit.tar.gz`, 'darwin', 'x64')
	.src(`${url}_FreeBSD-32bit.tar.gz`, 'freebsd', 'x32')
	.src(`${url}_FreeBSD-64bit.tar.gz`, 'freebsd', 'x64')
	.src(`${url}_FreeBSD-ARM.tar.gz`, 'freebsd', 'arm')
	.src(`${url}_Linux-32bit.tar.gz`, 'linux', 'x32')
	.src(`${url}_Linux-64bit.tar.gz`, 'linux', 'x64')
	.src(`${url}_Linux-ARM.tar.gz`, 'linux', 'arm')
	.src(`${url}_Linux-ARM64.tar.gz`, 'linux', 'arm64')
	.src(`${url}_OpenBSD-32bit.tar.gz`, 'openbsd', 'x32')
	.src(`${url}_OpenBSD-64bit.tar.gz`, 'openbsd', 'x64')
	.src(`${url}_OpenBSD-ARM.tar.gz`, 'openbsd', 'arm')
	.src(`${url}_Windows-32bit.zip`, 'win32', 'x32')
	.src(`${url}_Windows-64bit.zip`, 'win32', 'x64')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'hugo.exe' : 'hugo');
