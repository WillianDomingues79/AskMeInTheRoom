const express = require('express')
const path = require('path') //Criar para ser chamado ali embaixo
const route = require('./route')
const server = express()

server.set('view engine', 'ejs') //Seta uma view engine obrigatório

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views')) //Pega o caminho da view

//Middleware usado para poder receber as coisas do Body e passar para o controller
server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(3000, () => {
  console.log('Rodando ...')
})
