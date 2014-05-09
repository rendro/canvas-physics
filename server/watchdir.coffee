fs   = require 'fs'
path = require 'path'

class WatchDir
	isDir = (f) ->
		return fs.statSync(f).isDirectory()

	recursiveFindFiles = (_path, pattern) =>
		result = []

		if _path.match(pattern)
			return [_path]

		if isDir(_path)
			files = fs.readdirSync(_path)
				.filter((f) -> f != '.' and f != '..')
				.map((f) -> path.join(_path, f))

			result = result.concat(recursiveFindFiles(f, pattern)) for f in files

		return result

	constructor: (_path, pattern) ->
		@callbacks = {}
		@watchers = []
		@lastChange = {}
		@files = recursiveFindFiles(_path, pattern)
		@files.forEach( (file) =>
			@watchers.push fs.watch(file, (event) =>
				if event == 'change'
					@lastChange[file] = 0 unless @lastChange[file]
					stats = fs.statSync(file)
					if @lastChange[file] < stats.mtime
						@lastChange[file] = stats.mtime
						@callbacks['change'].forEach((cb) -> cb(file))
			)
		)

	on: (event, callback) =>
		@callbacks[event] = [] unless @callbacks[event]
		@callbacks[event].push(callback)
		return @

	end: ->
		watcher.end() for watcher of @watchers
		return

module.exports = WatchDir
