'use strict'

const http = require('http')
const Router = require('./utils/router')
const home = require('./handlers/home')
const greeting = require('./handlers/greeting')

let router = new Router()

let server = http.createServer(function (req, res) {
  router.init(req, res)
})

router.get('/', home)
router.post('/greeting', greeting)

server.listen(3000, () => {
  console.log('My first server running on http://localhost:3000')
})
