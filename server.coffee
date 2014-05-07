debug = true

path    = require 'path'
cons    = require 'consolidate'
express = require 'express'
logger  = require 'morgan'

app     = express()

middlewares = {}
middlewares.less = require 'less-middleware'

app.set('paths.staticSrc', path.join(__dirname, 'static', 'src'))
app.set('paths.staticSrc.less', path.join(app.get('paths.staticSrc'), 'less'))
app.set('paths.staticDest', path.join(__dirname, 'static', 'dest'))
app.set('page.title', 'NextGen Boilerplate')

app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(logger(if debug then 'dev' else null))

app.use(middlewares.less(app.get('paths.staticSrc.less'), {
	dest: app.get('paths.staticDest')
	debug: debug
}, {}, {
	compress: !debug
	sourceMap: debug
	yuicompress: !debug
}))

app.use(express.static(app.get('paths.staticDest')))

app.get('/', (req, res) ->
	res.render('layouts/default', {
		title: app.get('page.title')
		partials:
			content: '../pages/index'
	})
)

app.listen 3000, ->
	console.log("Server listening on port 3000")
