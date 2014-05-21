path         = require 'path'
myth         = require 'myth'
colors       = require 'colors'
Middleware   = require './middleware.coffee'

class Myth extends Middleware

	filePattern: /\.css$/

	contentType: 'text/css'

	constructor: (config) ->
		super(config)
		@options =
			source: @config.src
			browsers: @config.autoprefixer

	logError: (err) ->
		errorMessage = "Myth error: #{err.message}"
		@compiledSource = "body::before{display:block;content:\"#{errorMessage}\";background:white;color:red;border:3px solid red;padding: 20px;font:20px/1.5 Helvetica,Arial,sans-serif;}"
		console.log errorMessage.red
		return

	compile: (file) =>
		file && console.log("#{path.relative(process.cwd(), file)} changed: CSS (myth) compiled")
		contents = @readSrcFile()
		try
			@compiledSource = myth(contents, @options)
			super()
		catch e
			@logError(e)
		return

module.exports = Myth
