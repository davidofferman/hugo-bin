"use strict";

const test = require("ava");
const { execFile } = require("child_process");
const fs = require("fs");
const request = require("request");


const hugo = require("..");

test.cb("return path to binary", t => {
	t.plan(1);

	fs.stat(hugo, (err,stats) => {
		t.true(stats.isFile());
		t.end();
	});
});

test.cb("executing hugo", t => {
	t.plan(1);

	var run = execFile(hugo, ["version"]);
	run.on("close", (code) => {
		t.is(code, 0);
		t.end();
	});
});

test.cb("test download urls", t => {
	var sources = require("../lib/").src();
	var cbcount = 0;

	t.plan(sources.length);

	sources.forEach((src) => {
		var options = {
			uri: src.src,
			method: "HEAD",
			followRedirect: false
		};

		request(options, (error, response, body) => {
			++cbcount;

			if(response) {
				t.true(response.statusCode >= 200 && response.statusCode < 400, `${response.statusCode}: ${src.src}`);
			}else{
				t.fail(error);
			}

			if(cbcount == sources.length) {
				t.end();
			}
		});
	});
});
