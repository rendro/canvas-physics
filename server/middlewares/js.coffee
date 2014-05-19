fs         = require 'fs'
path       = require 'path'
es6ify     = require 'es6ify'
browserify = require 'browserify'
Middleware = require './middleware.coffee'

class Js extends Middleware

	filePattern: /\.js$/

	contentType: 'text/javascript'

	constructor: (@config) ->
		super(@config)
		if @config.traceur
			es6ify.traceurOverrides = @config.traceur

	compile: (file) =>
		file && console.log("#{path.relative(process.cwd(), file)} changed: javascript compiled")
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