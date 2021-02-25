'use strict';

const pkgjson = require('../package.json');
const log = require('./log').name(pkgjson.name);
const bin = require('.');

(async () => {
	try {
		await bin.run(['version']);
		log.info('hugo downloaded successfully');
	} catch (error) {
		log.error(error);
		log.error('hugo failed to download');
	}
})();
