const router = require('express').Router()
const { models } = require('mongoose')
const User = require('../models/User')
const auth = require('../middleware/auth')

//CHECK_LOGIN
//AUTH
router.get('/', auth, async (req, res) => {
  const { user } = req
  try {
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

//REGISTER

router.post('/register', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ success: true, message: 'Register success', user, token })
  } catch (error) {
    res.status(400).send(error)
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.status(200).json({ success: true, user, token })//send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
});

//MY PROFILE
//AUTH

router.get('/profile', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user)
});

//LOGOUT
//AUTH

router.post('/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

//LOGOUT ALL
//AUTH

router.post('/logout-all', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;