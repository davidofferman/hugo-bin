'use strict';

const test = require('ava');
const BinWrapper = require('../lib/binwrapper');

test('src get/setter', t => {
	const bw = new BinWrapper();
	const expected = {
		arch: 'x64',
		platform: 'linux',
		src: 'http://example.com/linux/x64/bin'
	};

	bw.src('http://example.com/linux/x64/bin', 'linux', 'x64');
	t.deepEqual(bw.src(), [expected]);
});

test('dest get/setter', t => {
	const bw = new BinWrapper();

	t.is(bw.dest('/tmp/bin/vendor'), bw);
	t.is(bw.dest(), '/tmp/bin/vendor');
});

test('use get/setter', t => {
	const bw = new BinWrapper();

	t.is(bw.use('hugo'), bw);
	t.is(bw.use(), 'hugo');
});

test('path builder', t => {
	const bw = new BinWrapper();

	bw.use('hugo');
	bw.dest('/tmp/bin/vendor');

	t.is(bw.path(), '/tmp/bin/vendor/hugo');
});

test('match source', t => {
	const bw = new BinWrapper();
	const expected = {
		arch: 'x64',
		platform: 'linux',
		src: 'http://example.com/linux/x64/bin'
	};

	bw.src('http://example.com/linux/x64/bin', 'linux', 'x64');

	t.falsy(bw.matchSource('win32', 'x64'));
	t.deepEqual(bw.matchSource('linux', 'x64'), expected);
});
