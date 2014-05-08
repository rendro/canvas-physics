fs      = require 'fs'
traceur = require 'traceur'

# enchilada      = require 'enchilada'
# coffeeify      = require 'coffeeify'
# es6ify         = require 'es6ify'

# # allow let keyword
# es6ify.traceurOverrides.blockBinding = true

JsMiddleware = (app) ->

	debug = app.get('debug')

	contents = fs.readFileSync(process.cwd() + '/static/src/js/app.js').toString();

	result = traceur.compile(contents, {
		filename: 'app.js',
		sourceMap: true,
		# etc other Traceur options
		modules: 'commonjs'
		blockBinding: true
	})

	console.log result

	throw result.error if result.error

	console.log result.js

	# fs.writeFileSync('out.js', result.js);
	# fs.writeFileSync('out.js.map', result.sourceMap);

# 	app.use(enchilada({
# 		cache: !debug,
# 		compress: !debug,
# 		debug: debug,
# 		src: app.get('paths.staticSrc.js'),
# 		transforms: [coffeeify, es6ify]
# 	}))
#
# 	return

module.exports = JsMiddleware
