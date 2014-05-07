fs           = require 'fs'
path         = require 'path'
less         = require 'less-middleware'
autoprefixer = require 'autoprefixer'

LessMiddleware = (app) ->

	debug = !app.get('debug')

	sourceMap = {}

	app.use(less(app.get('paths.staticSrc.less'), {
		dest: app.get('paths.staticDest')
		debug: debug
		once: !debug
		postprocess:
			css: (css) ->
				result = autoprefixer.process(css, {
					map: sourceMap
					inlineMap: debug
				})
				return result.css
	}, {
		paths: [
			path.join(process.cwd(), 'node_modules')
		]
	}, {
		compress: !debug
		sourceMap: debug
		writeSourceMap: (x) ->
			sourceMap = x
			return
		yuicompress: !debug
	}))

	return


module.exports = LessMiddleware
