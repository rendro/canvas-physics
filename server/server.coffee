fs             = require 'fs'
path           = require 'path'
cons           = require 'consolidate'
express        = require 'express'
logger         = require 'morgan'

jsMiddleware   = require './middlewares/js'
less = require './middlewares/less'

app = express()

rootDir = process.cwd()
staticDir = path.join(rootDir, 'static')

app.set('page.title', 'NextGen Boilerplate')


app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', path.join(process.cwd(), 'views'))

if app.get('env') is 'development'
	app.use(logger('dev'))
	livereload = require 'express-livereload'
	livereload(app, {
		watchDir: staticDir
		exts: [
			'js'
			'coffee'
			'less'
			'css'
		]
	})
	console.log("Livereload server started")
else
	app.use(logger())


app.use('/app.css', less({
	src: path.join(staticDir, 'less', 'app.less')
	paths: [
		path.join(rootDir, 'node_modules')
	]
}))


# lessMiddleware(app)
# jsMiddleware(app)

# app.use(express.static(app.get('paths.staticDest')))

app.get('*/', (req, res) ->
	res.render('layouts/default', {
		title: app.get('page.title')
		partials:
			content: '../pages/' + (req.url.substr(1) or 'index')
	})
)

app.listen 3000, ->
	console.log("Server listening on port 3000")
