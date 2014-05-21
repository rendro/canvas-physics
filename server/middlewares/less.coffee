path         = require 'path'
colors       = require 'colors'
less         = require 'less'
autoprefixer = require 'autoprefixer'
Middleware   = require './middleware.coffee'

class Less extends Middleware

	filePattern: /\.less$/

	contentType: 'text/css'

	constructor: (@config) ->

		@parser = new(less.Parser)({
			filename: path.basename(@config.src)
			paths: @config.paths or []
		})

		super(@config)

	logError: (err) ->
		errorMessage = "LESS #{err.type} error: #{err.message} in #{err.filename}:#{err.line}:#{err.column}"
		@compiledSource = "body::before{display:block;content:'#{errorMessage}';background:white;color:red;border:3px solid red;padding: 20px;font:20px/1.5 Helvetica,Arial,sans-serif;}"
		console.log errorMessage.red
		return

	compile: (file) =>
		file && console.log("#{path.relative(process.cwd(), file)} changed: LESS compiled")
		contents = @readSrcFile()
		@parser.parse(contents, (err, tree) =>
			if err
				@logError(err)
				return

			try
				css = tree.toCSS({
					sourceMap: true
					outputSourceFiles: true
				})
			catch err
				@logError(err)
				return

			result = autoprefixer.apply(null,@config.autoprefixer).process(css, {
				from: path.basename(@config.src)
				to: path.basename(@config.src).replace('.less', '.css')
				inlineMap: true
			})

			@compiledSource = result.css
		)
		super
		return

module.exports = Less
