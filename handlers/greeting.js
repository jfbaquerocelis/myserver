'use strict'

const qs = require('querystring')

function gretting (req, res) {
  let body = []

  req.on('data', chunk => {
    body.push(chunk)
  })
  req.on('end', () => {
    body = Buffer.concat(body).toString()
    let response = qs.parse(body)

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`Hola ${response.name}, bienvenido a nuestro servidor :)`)
  })
}

module.exports = gretting
