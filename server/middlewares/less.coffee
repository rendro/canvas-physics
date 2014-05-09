fs           = require 'fs'
path         = require 'path'
less         = require 'less'
autoprefixer = require 'autoprefixer'
WatchDir     = require '../watchdir.coffee'

LessMiddleware = (cfg) ->

	compiledCss = ''

	watcher = new WatchDir(path.dirname(cfg.src), /\.less$/)
	watcher.on 'change', (filename) ->
		console.log "#{filename} changed"
		compile()

	parser = new(less.Parser)({
		filename: path.basename(cfg.src)
		paths: cfg.paths or []
	})

	compile = ->
		contents = fs.readFileSync(cfg.src).toString()
		parser.parse(contents, (e, tree) ->
			css = tree.toCSS({
				sourceMap: true
				outputSourceFiles: true
			})

			result = autoprefixer.process(css, {
				from: path.basename(cfg.src)
				to: 'app.css'
				inlineMap: true
			})

			compiledCss = result.css
		)

	compile()

	handleRequest = (req, res) ->
		res.set({
			'Content-Length': compiledCss.length,
			'Content-Type': 'text/css'
		})
		res.send(200, compiledCss)

	return handleRequest

module.exports = LessMiddleware
