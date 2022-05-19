const express = require('express')
const path = require('path') //Criar para ser chamado
const route = require('./route')
const server = express()

server.set('view engine', 'ejs') //Seta uma view engine obrigatório

server.set('views', path.join(__dirname, 'views')) //Cria o caminho da view

server.use(route)

server.listen(3000, () => {
  console.log('Rodando ...')
})
