const bcrypt = require('bcryptjs')

const users = []

module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    console.log(req.body)
    const { username, password } = req.body
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].passwordHash)
        if (existing) {
          res.status(200).send(users[i])

        }
      }
    }
    res.status(400).send("User not found.")
  },
  register: (req, res) => {
    // console.log('Registering User')
    // console.log(req.body)

    const { username, email, fristName, lastName, password } = req.body

    const salt = bcrypt.genSaltSync(5)
    const passwordHash = bcrypt.hashSync(password, salt)

    let user = { username, email, fristName, lastName, passwordHash }

    users.push(user)
    res.status(200).send(req.body)


  }
}