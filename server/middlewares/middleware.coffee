fs       = require 'fs'
path     = require 'path'
Observer = require '../observer.coffee'
WatchDir = require '../watchdir.coffee'

class Middleware extends Observer

	compiledSourcecompiledSource: ''

	filePattern: /./

	contentType: 'text/plain'

	constructor: (@config) ->
		super()
		@compiledSource = ''
		@watcher = new WatchDir(path.dirname(@config.src), @filePattern)
		@watcher.on('add change delete', @compile)
		@compile()

	readSrcFile: =>
		return fs.readFileSync(@config.src).toString()

	compile: =>
		@emit('compiled', @config.src)

	handleRequest: (req, res) =>
		res.set({
			'Content-Length': @compiledSource.length,
			'Content-Type': @contentType
		})
		res.send(200, @compiledSource)
		return

module.exports = Middleware
