const sqlite3 = require('sqlite3')
const { open } = require('sqlite') //OPEN para pegar somente a função open do pacote sqlite

module.exports = () =>
  open({
    filename: './src/db/askme.sqlite',
    driver: sqlite3.Database
  })
