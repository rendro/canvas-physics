fs         = require 'fs'
path       = require 'path'
browserify = require 'browserify'
es6ify     = require 'es6ify'
Middleware = require './middleware.coffee'

es6ify.traceurOverrides =
	blockBinding: true

class Js extends Middleware

	filePattern: /\.js$/

	contentType: 'text/javascript'

	compile: (file) =>
		file && console.log("#{file} changed: javascript compiled")
		contents = fs.readFileSync(@config.src).toString()

		browserify()
			.add(es6ify.runtime)
			.transform(es6ify)
			.require(require.resolve(@config.src), { entry: true })
			.bundle({ debug: true }, (err, src) =>
				return console.log(err) if err
				@compiledSource = src
			)

		return

module.exports = (cfg) ->
	mw = new Js(cfg)
	return mw.handleRequest
