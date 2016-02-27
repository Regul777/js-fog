var http = require('http');
var querystring = require('querystring');
var q = require('q');

function sanitizeOptions(options) {
	var defaults = {
		stringsEncoding: 'escape-chars-x',
		replaceProperties: true,
		detachStrings: true,
		compact: true
	};
	var toStr = Object.prototype.toString;
	if (toStr.call(options) !== '[object Object]') return defaults;
	for (var def in defaults) {
		if (toStr.call(defaults[def]) !== toStr.call(options[def])) continue;
		defaults[def] = options[def];
	}
	return defaults;
}

function obfuscate(sourceJs, config, cb) {
	var defer = q.defer();

	var callback = function(err, result) {
		if(err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
		cb && cb(err, result);
	}

	config = sanitizeOptions(config)

	if (!sourceJs) {
		callback('Empty source js')
	} else {
		var params = {
			js: sourceJs,
			config: JSON.stringify(config)
		};

		var postData = querystring.stringify(params);


		var req = http.request({
			host: 'jsfoxguard.com',
			port: 80,
			path: '/api/crypt',
			method: 'POST',
			headers: {
				'User-Agent': 'npm-module'
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(postData)
			}
		}, function (res) {
			res.setEncoding('utf8');

			var body = '';
			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function () {
				try {
					var data = JSON.parse(body)
				} catch (e) {
					callback('Response JSON body parse Error', e)
				}

				if (data['error']) {
					callback('Response Error: ' + data['error'])
				} else if (data['crypted']) {
					callback(null, data['crypted'])
				} else {
					callback('Unknown Error')
				}
			});
		});

		req.on('error', function (err) {
			callback(err)
		});

		req.write(querystring.stringify({
			js: sourceJs,
			config: JSON.stringify(config)
		}));

		req.end();
	}

	return defer.promise;

}

module.exports = obfuscate;
module.exports.defaultOptions = sanitizeOptions();