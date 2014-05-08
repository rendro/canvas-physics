fs           = require 'fs'
path         = require 'path'
less         = require 'less'
autoprefixer = require 'autoprefixer'


class WatchDir

	callbacks = {}

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
		@watcher = []
		@lastChange = {}
		@files = recursiveFindFiles(_path, pattern)
		@files.forEach( (file) =>
			@watcher.push fs.watch(file, (event) =>
				if event == 'change'
					@lastChange[file] = 0 unless @lastChange[file]
					stats = fs.statSync(file)
					if @lastChange[file] < stats.mtime
						@lastChange[file] = stats.mtime
						callbacks['change'].forEach((cb) -> cb(file))
			)
		)

	on: (event, callback) =>
		callbacks[event] = [] unless callbacks[event]
		callbacks[event].push(callback)
		return @

LessMiddleware = (app) ->
	debug  = !app.get('debug')
	cached = {}
	paths  = [
		'.'
		path.join(process.cwd(), 'node_modules')
	]

	watcher = new WatchDir(app.get('paths.staticSrc'), /\.less$/)
	watcher.on('change', (filename) ->
		console.log "#{filename} changed, empty less cache"
		cached = {}
	)

	getFilename = (req) ->
		return path.basename(req.url, '.css')

	getLess = (req, res) ->
		filename = getFilename(req)

		if cached[filename]
			return sendResponse(req, res)

		filepath = path.join(app.get('paths.staticSrc.less'), filename + '.less')
		contents = fs.readFileSync(filepath).toString()

		opts =
			verbose: true
			filename: filename + '.less'
			paths: paths
			sourceMap: debug
			outputSourceFiles: debug

		parser = new(less.Parser)(opts)

		parser.parse(contents, (err, tree) ->
			if err
				return console.error(err)

			sourceMap = null

			css = tree.toCSS({
				compress: true
				yuicompress: true
				sourceMap: true
				# outputSourceFiles: true
				writeSourceMap: (_sourceMap) ->
					sourceMap = _sourceMap
			})

			# auto prefix
			css = autoprefixer.process(css,{
				map: true
				sourceMap: sourceMap
				from: filepath
				inlineMap: true
			}).css

			cached[filename] = css

			sendResponse(req, res)
		)

	sendResponse = (req, res) ->
		filename = getFilename(req)
		res.set({
			'Content-Length': cached[filename].length,
			'Content-Type': 'text/css'
		})
		res.send(200, cached[filename])


	app.get(/\.css$/, getLess)

	# app.use(less(app.get('paths.staticSrc.less'), {
	# 	dest: app.get('paths.staticDest')
	# 	debug: debug
	# 	once: !debug
	# 	postprocess:
	# 		css: (css) ->
	# 			result = autoprefixer.process(css, {
	# 				map: sourceMap
	# 				inlineMap: debug
	# 			})
	# 			return result.css
	# }, {
	# 	paths: [
	# 		path.join(process.cwd(), 'node_modules')
	# 	]
	# }, {
	# 	compress: !debug
	# 	sourceMap: debug
	# 	writeSourceMap: (x) ->
	# 		sourceMap = x
	# 		return
	# 	yuicompress: !debug
	# }))

	return


module.exports = LessMiddleware
