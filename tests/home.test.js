console.time('home test duration')

'use strict'

const { strict: assert } = require('assert')
const http = require('http')

let request = http.request({
  port: 3000,
  path: '/?test=hello'
}, response => {
  assert.equal(response.headers['content-type'], 'text/html', 'Debería responder contenido HTML')
  assert.equal(response.statusCode, 200, 'Debería responder código de estado 200')
})
request.end()

console.timeEnd('home test duration')
