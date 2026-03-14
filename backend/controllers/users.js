const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async(req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post("/", async (req, res) => {
  const { name, username, email, password } = req.body
  const users = await User.find({})
  const existingUser = users.find((u) => u.username === username || u.email === email)

  if (existingUser) {
    res.status(400).json({ error: "username already exists" })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const newUser = new User({
      name,
      username,
      email,
      passwordHash,
    })
  
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  }
})

module.exports = usersRouter