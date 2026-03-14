const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invalid username and password" });
    } else {
      // create a jwt token
      const userForToken = {
        username: username,
        id: user._id,
      };
    
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
      });
    
      res.status(200).json({ token, name: user.name });
    }
  } catch(error) {
    next(error)
    res.status(401)
  }

});

module.exports = loginRouter;
