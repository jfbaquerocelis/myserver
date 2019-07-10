'use strict'

class Router {
  constructor() {
    this.stack = {
      GET: {},
      POST: {}
    }
  }

  init(request, response) {
    let handler = this.stack[request.method][request.url]

    if (typeof handler === 'function') {
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

      if (typeof path !== 'string' || !path.startsWith('/')) {
        console.error(new TypeError('The path is not correct'))
      } else if (typeof handler !== 'function') {
        console.error(new TypeError('The handler is not a function'))
      } else {
        this.stack['GET'][path] = handler
      }
    } else {
      console.error(new TypeError('The parameters are not corrects'))
    }
  }

  post(...args) {
    if (args.length === 2) {
      let [path, handler] = args

      if (typeof path !== 'string' && !path.startsWith('/')) {
        console.error(new TypeError('The path is not correct'))
      } else if (typeof handler !== 'function') {
        console.error(new TypeError('The handler is not a function'))
      } else {
        this.stack['POST'][path] = handler
      }
    } else {
      console.error(new TypeError('The parameters are not corrects'))
    }
  }
}

module.exports = Router
