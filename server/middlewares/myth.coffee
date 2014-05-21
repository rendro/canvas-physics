path         = require 'path'
colors       = require 'colors'
Middleware   = require './middleware.coffee'

class Myth extends Middleware

	filePattern: /\.less$/

	contentType: 'text/css'

	logError: (err) ->
		console.log err
		return

	compile: (file) =>
		file && console.log("#{path.relative(process.cwd(), file)} changed: LESS compiled")
		contents = @readSrcFile()

		@compiledSource = ''
		return

module.exports = (cfg) ->
	mw = new Myth(cfg)
	return mw.handleRequest
