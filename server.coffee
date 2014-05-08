debug          = true
fs             = require 'fs'
path           = require 'path'
cons           = require 'consolidate'
express        = require 'express'
logger         = require 'morgan'

jsMiddleware   = require './middlewares/js'
lessMiddleware = require './middlewares/less'

app = express()

app.set('debug', debug)

app.set('paths.staticSrc', path.join(__dirname, 'static', 'src'))
app.set('paths.staticSrc.less', path.join(app.get('paths.staticSrc'), 'less'))
app.set('paths.staticSrc.js', path.join(app.get('paths.staticSrc'), 'js'))
app.set('paths.staticDest', path.join(__dirname, 'static', 'dest'))
app.set('page.title', 'NextGen Boilerplate')

app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

if false && app.get('env') is 'development'
	debug = true
	livereload = require 'express-livereload'
	livereload(app, {
		watchDir: app.get('paths.staticSrc')
		exts: [
			'js'
			'coffee'
			'less'
			'css'
		]
	})
	console.log("Livereload server started")

app.use(logger(if app.get('debug') then 'dev' else null))

lessMiddleware(app)
# jsMiddleware(app)

app.use(express.static(app.get('paths.staticDest')))

if app.get('env') is 'development'
	app.get(/\.less$/, (req, res) ->
		if fs.exists(req.url)
			fs.createReadStream(req.url).pipe(res)
		else
			fs.createReadStream(path.join(process.cwd(), req.url)).pipe(res)
	)

app.get('*/', (req, res) ->
	console.log req.url
	res.render('layouts/default', {
		title: app.get('page.title')
		partials:
			content: '../pages/' + (req.url.substr(1) or 'index')
	})
)

app.listen 3000, ->
	console.log("Server listening on port 3000")
