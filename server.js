'use strict'

// Importamos el módulo http
const http = require('http')
// Importamos el módulo fs(File System)
const fs = require('fs')
// Importamos la librería querystring para transformar la información que llega del formulario
const qs = require('querystring')

// Instanciamos el servidor HTTP
let server = http.createServer()

// Escuchamos el evento 'request'
server.on('request', function (req, res) {
  // Capturamos el método y la ruta de la solicitud
  let { method, url } = req

  if (method === 'GET' && url === '/') {
    // Vamos a leer a través del método readFile del módulo fs el archivo index.html para servirlo al cliente
    fs.readFile('index.html', (err, html) => {
      // Vamos a validar si hubo algún error al momento de leer el archivo
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write(err.message)
        res.end()
      } else {
        // Si no hubo algún error, procedemos a responder el contenido del archivo index.html
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('Hola a todos :)')
        res.end()
      }
    })
  } else if (method === 'POST' && url === '/greeting') {
    // Creamos un arreglo para guardar cada pieza que viene por parte del cliente
    let body = []
    // Recibimos el evento 'data' que nos permite recibir cada pieza de información
    req.on('data', chunk => {
      // Guardamos cada pieza
      body.push(chunk)
    })
    req.on('end', () => {
      // A través del método .concat() del objeto Buffer vamos a transformar la información en un string
      body = Buffer.concat(body).toString()
      // Obtenemos el objeto a partir del query string
      let response = qs.parse(body)

      // Respondemos al cliente
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(`Hola ${response.name}, bienvenido a nuestro servidor :)`)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write(`Cannot ${method} ${url}`)
    res.end()
  }
})

// Le decimos al servidor en que puerto va a escuchar
server.listen(3000, () => {
  console.log('My first server running on http://localhost:3000')
})
