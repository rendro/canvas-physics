fs       = require 'fs'
path     = require 'path'
WatchDir = require '../watchdir.coffee'

class Middleware

	compiledSourcecompiledSource: ''

	filePattern: /./

	contentType: 'text/plain'

	constructor: (@config) ->
		@compiledSource = ''
		@watcher = new WatchDir(path.dirname(@config.src), @filePattern)
		@watcher.on('change', @compile)
		@compile()

	readSrcFile: =>
		return fs.readFileSync(@config.src).toString()

	compile: =>

	handleRequest: (req, res) =>
		res.set({
			'Content-Length': @compiledSource.length,
			'Content-Type': @contentType
		})
		res.send(200, @compiledSource)
		return

module.exports = Middleware
