'use strict'

const fs = require('fs')

function home (req, res) {
  fs.readFile('./views/index.html', (err, html) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write(err.message)
      res.end()
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(html)
      res.end()
    }
  })
}

module.exports = home
