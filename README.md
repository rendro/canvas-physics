# Experimental Front End Boilerplate

This is an experimental frontend boilerplate to play around with future technologies and specs that are drafts. Instead of slow polyfills the approach is to implement compilers and transpiles to transform the source files down to the current state of the art. In a perfect candyland like world at some near point in the future these middlewares can be removed and the browsers implement all the features. Because of this, take this kind advice: **Please do not use in production!!**

## The turbo powered steam engine

* [node.js](http://nodejs.org/) because JavaScript kicks ass!
* [Express 4](http://expressjs.com/) application
* Livereload server
* Super fast middlewares that recompile on file change and serve the compiled result out of memory to avoid slow IO

## Current middlewares

### JavaScript

* Use the commonJS modules
* [browserify](http://browserify.org/) to bundle the JavaScript
* ES6 syntax with the [traceur-compiler](https://github.com/google/traceur-compiler): This adds about 1400 lines of polyfill code

### LESS

* Well not a real future syntax but it is nice anyways
* autoprefixer to get rid of those prefixes in your nice source
* normalize.css via npm
* inline source maps for easy debugging

### [Myth](http://www.myth.io/)

* Write future CSS with vars and crazy shit like that
* includes autoprefixer as well

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

If you want to run the server on a different port:

```
$ PORT=12345 npm start
```
