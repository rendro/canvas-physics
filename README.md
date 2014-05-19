# Experimental Front End Boilerplate

This is an experimental frontend boilerplate to kickstart projects that are built with
the technologies of today and tomorrow.

**Please do not use in production!**

## Current technologies

* node.js application w/ express 4.x
* Livereload
* Custom middlewares that recompile on change and serve compiled sources out of memory (fast without IO)

## Middlewares

### JavaScript

* commonJS modules bundled with browserify
* support for ES6 syntax with es6ify and traceur (!polyfill)

### LESS

* autoprefixer
* normalize.css

## How to use?

First, you need to install all packages via npm:

```  
$ npm install
```

Start the server:

```
$ npm start
```

Then visit [http://localhost:3000](http://localhost:3000)
