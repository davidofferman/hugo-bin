"use strict";
const log = require("logalot");
const bin = require(".");

(async () => {
	try {
		await bin.run(["version"]);
		log.success("hugo pre-build test passed successfully");
	} catch (error) {
		log.warn(error.message);
		log.warn("hugo pre-build test failed");
	}
})();
