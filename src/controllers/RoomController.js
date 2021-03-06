const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password

    let roomId
    let isRoom = true
    while (isRoom) {
      //Gera o numero da sala randomico
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString()) //Quando é string ele não soma, ele vai concatenando
          : (roomId += Math.floor(Math.random() * 10).toString())
        //console.log(parseInt(roomId))
      }

      //Verifica se o numero criado já existe
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
      if (!isRoom) {
        //Grava a sala no banco
        await db.run(`INSERT INTO rooms(
        id,
        pass
      ) VALUES (
        ${parseInt(roomId)},
        ${pass}
      )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )

    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )

    let isNoQuestions
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions
    })
  },
  async enter(req, res) {
    const db = await Database()
    const roomId = req.body.roomId
    const pass = req.body.password
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if (verifyRoom == pass) {
      res.redirect(`/room/${roomId}`)
    } else {
      res.render('passincorrect', { roomId: roomId })
    }
  }
}
