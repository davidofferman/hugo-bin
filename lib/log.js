'use strict';

class Log {
	info(message) {
		return this._log('info', message);
	}

	warn(message) {
		return this._log('warning', message);
	}

	error(message) {
		return this._log('err', message);
	}

	name(name) {
		if (!name) {
			return this._name;
		}

		this._name = name;
		return this;
	}

	_log(level, message) {
		console.log(`${this._name} <${level}> ${message}`);
		return true;
	}
}

module.exports = new Log();
