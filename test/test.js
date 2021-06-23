'use strict';

const {execFile} = require('child_process');
const fs = require('fs');
const test = require('ava');
const request = require('request');
const hugo = require('..');
const hugoBin = require('../lib');

test.beforeEach(async () => {
	await hugoBin.resolve();
});

test.cb('return path to binary', t => {
	t.plan(1);

	fs.stat(hugo, (error, stats) => {
		if (error) {
			t.fail(error.message);
		} else {
			t.true(stats.isFile());
		}

		t.end();
	});
});

test.cb('executing hugo', t => {
	t.plan(1);

	const run = execFile(hugo, ['version']);
	run.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('test download urls', t => {
	const sources = require('../lib').src();
	let cbcount = 0;
	let i = 0;

	t.plan(sources.length);

	for (i = 0; i < sources.length; ++i) {
		const src = sources[i];

		const options = {
			uri: src.src,
			method: 'HEAD',
			followRedirect: false
		};

		request(options, (error, response) => {
			++cbcount;

			if (response) {
				t.true(response.statusCode >= 200 && response.statusCode < 400, `${response.statusCode}: ${src.src}`);
			} else if (error) {
				t.fail(error);
			} else {
				t.fail("Failed without error")
			}

			if (cbcount === sources.length) {
				t.end();
			}
		});
	}
});
