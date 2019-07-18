console.time('greeting test duration')

'use strict'

const { strict: assert } = require('assert')
const http = require('http')
const qs = require('querystring')

let user = {
  name: 'John'
}
let body = qs.stringify(user)

let request = http.request({
  port: 3000,
  path: '/greeting',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body)
  }
}, response => {
  let body = []

  response.on('data', chunk => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()

    assert.equal(body, `Hola ${user.name}, bienvenido a nuestro servidor :)`, 'Debería dar la bienvenida')
    assert.equal(response.statusCode, 200, 'Debería responder código de estado 200')
  })
})
request.write(body)
request.end()

console.timeEnd('greeting test duration')
