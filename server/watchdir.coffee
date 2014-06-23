fs       = require 'fs'
watch    = require 'node-watch'
path     = require 'path'
Observer = require './observer.coffee'

class WatchDir extends Observer

	isDir = (f) ->
		return fs.statSync(f).isDirectory()

	recursiveFindFiles = (basePath, pattern) ->
		result = []

		if basePath.match(pattern)
			return [basePath]

		if isDir(basePath)
			files = fs.readdirSync(basePath)
				.filter((f) -> f != '.' and f != '..')
				.map((f) -> path.join(basePath, f))

			result = result.concat(recursiveFindFiles(f, pattern)) for f in files

		return result

	addFile: (file) =>
		stats = fs.statSync(file)
		@lastChanges[file] = stats.mtime
		console.log "[WatchDir] WATCHING: #{file}"
		@emit('watch', file)

	onWatchEvent: (file) =>

		# deleted if file does not exist any more
		if not fs.existsSync(file)
			console.log "[WatchDir] DELETED: #{file}"
			@emit('delete', file)
		else
			# matches file pattern
			return unless file.match(@pattern)
			# edited
			stats = fs.statSync(file)
			if @lastChanges[file]?
				if @lastChanges[file] < stats.mtime
					@lastChanges[file] = stats.mtime
					console.log "[WatchDir] CHANGED: #{file}"
					@emit('change', file)
			else
				@lastChanges[file] = stats.mtime
				console.log "[WatchDir] ADDED: #{file}"
				@emit('add', file)

	constructor: (@basePath, @pattern) ->
		super()
		@lastChanges = {}

		# add initial files
		recursiveFindFiles(@basePath, @pattern).forEach(@addFile)

		# watch changes
		watch(@basePath, @onWatchEvent)

module.exports = WatchDir
