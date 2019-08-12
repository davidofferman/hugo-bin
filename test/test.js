'use strict';

const {execFile} = require('child_process');
const fs = require('fs');
const test = require('ava');
const request = require('request');

const hugo = require('..');

test.cb('return path to binary', t => {
	t.plan(1);

	fs.stat(hugo, (err, stats) => {
		if (err) {
			t.fail(err.message);
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

	t.plan(sources.length);

	sources.forEach(src => {
		const options = {
			uri: src.src,
			method: 'HEAD',
			followRedirect: false
		};

		request(options, (error, response) => {
			++cbcount;

			if (response) {
				t.true(response.statusCode >= 200 && response.statusCode < 400, `${response.statusCode}: ${src.src}`);
			} else {
				t.fail(error);
			}

			if (cbcount === sources.length) {
				t.end();
			}
		});
	});
});
