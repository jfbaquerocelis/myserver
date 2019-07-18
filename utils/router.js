'use strict'

const url = require('url')
const qs = require('querystring')

class Router {
  constructor() {
    let stack = {
      GET: {},
      POST: {}
    }

    this.setHandler = (method, path, handler) => {
      if (typeof path !== 'string' || !path.startsWith('/')) {
        console.error(new TypeError('The path is not correct'))
      } else if (typeof handler !== 'function') {
        console.error(new TypeError('The handler is not a function'))
      } else {
        stack[method][path] = handler
      }
    }
    this.getHandler = (method, path) => {
      return stack[method][path]
    }
    this.getStack = () => {
      return stack
    }
  }

  init(request, response) {
    let { query, pathname } = url.parse(request.url)
    let handler = this.getHandler(request.method, pathname)

    if (typeof handler === 'function') {
      request.query = qs.parse(query)
      return handler.apply(this, [request, response])
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.write(`Cannot ${request.method} ${request.url}`)
      response.end()
    }
  }

  get(...args) {
    if (args.length === 2) {
      let [path, handler] = args

      this.setHandler('GET', path, handler)
    } else {
      console.error(new TypeError('The parameters are not corrects'))
    }
  }

  post(...args) {
    if (args.length === 2) {
      let [path, handler] = args

      this.setHandler('POST', path, handler)
    } else {
      console.error(new TypeError('The parameters are not corrects'))
    }
  }
}

module.exports = Router
