var ejs  = require('ejs');
var ext  = require('object-assign');
var fs   = require('fs');
var path = require('path');

module.exports = function (themeopts) {

	// set theme options object
	themeopts = Object(themeopts);

	// set theme logo
	themeopts.logo = themeopts.logo;
	themeopts.fixedLogo = typeof themeopts.fixedLogo === 'undefined' ? true : themeopts.fixedLogo;

	// set theme title
	themeopts.title = themeopts.title || 'Style Guide';

	// set theme css
	themeopts.css = themeopts.css || ['style.css'];

	// set theme css
	themeopts.js = themeopts.js || [];

  // set theme masthead color
	themeopts.color = themeopts.color || ['#4078c0'];

  // set navigation links
	themeopts.nav = themeopts.nav || [];

	// return theme
	return function (docs) {
		// set assets directory and template
		docs.assets   = path.join(__dirname, 'assets');
		docs.template = path.join(__dirname, 'template.ejs');

		// set theme options
		docs.themeopts = themeopts;

		// return promise
		return new Promise(function (resolve, reject) {
			// read template
			fs.readFile(docs.template, 'utf8', function (error, contents) {
				// throw if template could not be read
				if (error) reject(error);
				else {
					// set document options
					docs.opts = ext({}, docs.opts, docs.themeopts);

					// set compiled template
					docs.template = ejs.compile(contents)(docs);

					// resolve docs
					resolve(docs);
				}
			});
		});
	};
};

module.exports.type = 'sgcss-theme';
