"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const util = require("util");
const { spawn } = require("child_process");

const download = require("download");

module.exports = class BinWrapper {
	constructor() {
		this._sources = [];
		this._destination;
		this._binary;
	}

	src(src, os, arch) {
		if(arguments.length === 0) {
			return this._sources;
		}

		this._sources.push({
			src: src,
			platform: os,
			arch: arch
		});

		return this;
	}

	dest(dest) {
		if(!dest) {
			return this._destination;
		}

		this._destination = dest;
		return this;
	}

	use(bin) {
		if(!bin) {
			return this._binary;
		}

		this._binary = bin;
		return this;
	}

	path() {
		return path.join(this.dest(), this.use());
	}

	run(args=[]) {
		return this.findBinary().then(() => {
			return spawn(this.path(), args);
		});
	}

	findBinary() {
		const stat = util.promisify(fs.stat);
		return stat(this.path()).catch(error => {
			if(error && error.code == "ENOENT") {
				return this.download();
			}

			return Promise.reject(error);
		});
	}

	download() {
		const source = this.matchSource(os.platform(), os.arch());
		const chmod = util.promisify(fs.chmod);

		if(!source) {
			return Promise.reject(new Error("No binary matches your system."));
		}

		return download(source.src, this.dest(), {
			extract: true
		}).then(result => {
			return chmod(this.path(), 0o755);
		});
	}

	matchSource(platform, arch) {
		var i = 0;
		var len = this._sources.length;
		var source;

		for(i = 0; i < len; ++i) {
			source = this._sources[i];
			if(source.platform == platform && source.arch == arch) {
				return source;
			}
		}

		return null;
	}
};
