const checkoutRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")


checkoutRouter.get("/", async(req, res) => {
  res.json({ success: true })
})

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}

checkoutRouter.post("/", async (req, res, next) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET) 
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(400).json({ error: "userId missing or not valid" })
  }
  return res.status(201).json({ success: true, message: `${user.name} checked out successfully` })
})


module.exports = checkoutRouter