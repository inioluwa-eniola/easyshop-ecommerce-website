const usersRouter = require("express").Router()

usersRouter.get("/", async(req, re) => {
  const users = await User.find({})
  res.status(201).json()
})



module.exports = usersRouter