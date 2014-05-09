fs           = require 'fs'
path         = require 'path'
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

	compile: (file) =>
		file && console.log("#{file} changed: LESS compiled")
		contents = fs.readFileSync(@config.src).toString()
		@parser.parse(contents, (e, tree) =>
			console.log e if e

			css = tree.toCSS({
				sourceMap: true
				outputSourceFiles: true
			})

			result = autoprefixer.process(css, {
				from: path.basename(@config.src)
				to: path.basename(@config.src).replace('.less', '.css')
				inlineMap: true
			})

			@compiledSource = result.css
		)
		return

module.exports = (cfg) ->
	mw = new Less(cfg)
	return mw.handleRequest
