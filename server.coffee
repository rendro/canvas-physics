debug     = false
path      = require 'path'
cons      = require 'consolidate'
express   = require 'express'
logger    = require 'morgan'
less      = require 'less-middleware'
enchilada = require 'enchilada'
coffeeify = require 'coffeeify'
es6ify    = require 'es6ify'

app = express()

app.set('paths.staticSrc', path.join(__dirname, 'static', 'src'))
app.set('paths.staticSrc.less', path.join(app.get('paths.staticSrc'), 'less'))
app.set('paths.staticSrc.js', path.join(app.get('paths.staticSrc'), 'js'))
app.set('paths.staticDest', path.join(__dirname, 'static', 'dest'))
app.set('page.title', 'NextGen Boilerplate')

app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

if app.get('env') is 'development'
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


app.use(logger(if debug then 'dev' else null))

app.use(less(app.get('paths.staticSrc.less'), {
	dest: app.get('paths.staticDest')
	debug: debug
}, {}, {
	compress: !debug
	sourceMap: debug
	yuicompress: !debug
}))

# allow let keyword
es6ify.traceurOverrides.blockBinding = true

app.use(enchilada({
	cache: !debug,
	compress: !debug,
	debug: debug,
	src: app.get('paths.staticSrc.js'),
	transforms: [coffeeify, es6ify]
}))

app.use(express.static(app.get('paths.staticDest')))

app.get('*', (req, res) ->
	res.render('layouts/default', {
		title: app.get('page.title')
		partials:
			content: '../pages/' + (req.url.substr(1) or 'index')
	})
)

app.listen 3000, ->
	console.log("Server listening on port 3000")
