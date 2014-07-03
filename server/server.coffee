fs             = require 'fs'
path           = require 'path'
cons           = require 'consolidate'
express        = require 'express'
logger         = require 'morgan'

app = express()

rootDir   = process.cwd()
staticDir = path.join(rootDir, 'static')
viewsDir  = path.join(process.cwd(), 'views')

app.set('page.title', 'Vectorphysics')

app.set('port', process.env.PORT or 3000)

app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', viewsDir)


if app.get('env') is 'development'
	app.use(logger('dev'))
	app.locals.LRScript = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js\"></' + 'script>')</script>";
	lrServer = require('livereload').createServer({
		exts: [ 'html' ]
	})
	lrServer.watch(viewsDir)
else
	app.use(logger())
	app.locals.LRScript = ""


###
# CSS PREPROCESSOR
###

Myth = require './middlewares/myth'

myth = new Myth({
	src: path.join(staticDir, 'stylesheets', 'app.css')
	autoprefixer: [
		'last 2 versions'
		'> 1%'
	]
})

app.use('/app.css', myth.handleRequest)

myth.on('compiled', (file) ->
	lrServer.refresh('/app.css')
)

# Less = require './middlewares/less'

# less = new Less({
# 	src: path.join(staticDir, 'stylesheets', 'app.less')
# 	paths: [
# 		path.join(process.cwd(), 'node_modules')
# 	]
# 	autoprefixer: [
# 		'last 2 versions'
# 		'> 1%'
# 	]
# })

# app.use('/app.css', less.handleRequest)

# less.on('compiled', (file) ->
# 	lrServer.refresh('/app.css')
# )

###
# JS PREPROCESSOR
###
Js = require './middlewares/js'

js = new Js({
	src: path.join(staticDir, 'javascript', 'app.js')
	traceur:
		blockBinding: true
})

app.use('/app.js', js.handleRequest)

js.on('compiled', (file) ->
	lrServer.refresh('/app.js')
)


app.get('*/', (req, res) ->
	res.render('layouts/default', {
		title: app.get('page.title')
		partials:
			content: '../pages/' + (req.url.substr(1) or 'index')
	})
)

app.listen(app.get('port'), ->
	console.log("Server listening on port #{app.get('port')}")
)
