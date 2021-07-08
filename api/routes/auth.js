const router = require('express').Router()
const { models } = require('mongoose')
const User = require('../models/User')
//REGISTER
router.post('/register', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})
//LOGIN
router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    console.log("__________1", email);
    const user = await User.findByCredentials(email, password)
    console.log("__________4", user);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = router;