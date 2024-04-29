const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcrypt')
const express = require('express')
const loginRouter = express.Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    const passwordCorrect =
      user && (await bcrypt.compare(password, user.passwordHash))

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).send({ token, username: user.username, email: user.email })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = loginRouter
