enchilada      = require 'enchilada'
coffeeify      = require 'coffeeify'
es6ify         = require 'es6ify'

# allow let keyword
es6ify.traceurOverrides.blockBinding = true

JsMiddleware = (app) ->

	debug = app.get('debug')

	app.use(enchilada({
		cache: !debug,
		compress: !debug,
		debug: debug,
		src: app.get('paths.staticSrc.js'),
		transforms: [coffeeify, es6ify]
	}))

	return

module.exports = JsMiddleware
