var jsFox = require('../js-fox');

var script = 'var a="test";';

jsFox(script, {
	compact: false
}).then(function(obfuscated) {
		console.log(obfuscated);
	}, function(err) {
		console.error(err);
	});
