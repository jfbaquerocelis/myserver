console.time('router test duration')

'use strict'

const assert = require('assert')
const Router = require('../utils/router')

let router = new Router()

assert.deepEqual(router.getStack(), { GET: {}, POST: {} }, 'Debería ser un objeto de métodos HTTP')

// Función
function handler (req, res) { res.end('Hola') }
// Agregamos un handler
router.setHandler('GET', '/', handler)

assert.deepEqual(router.getStack(), { GET: { '/': handler }, POST: {} }, 'Debería contener el handler GET agregado')
assert.deepEqual(router.getHandler('GET', '/'), handler, 'Debería ser la función handler')

console.timeEnd('router test duration')
