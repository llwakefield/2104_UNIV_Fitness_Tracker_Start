const express = require("express");
const { createUser, getUserByUserName, getUser } = require("../db");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken")

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      message: "Username and password are required fields.",
    });
  }
  if (password.length < 8) {
    next({
      message: "Password must be at least 8 characters long.",
    });
  }
  try {
    const _user = await getUserByUserName(username);
    if (_user) {
      next({
        message: "Username already exists. Please try again.",
      });
    }
    const user = await createUser(req.body);
    console.log(user);
    res.send({ user, message: "You have successfully registered" });
  } catch (message) {
    next(message);
  }
});

usersRouter.post("/login", async(req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
          message: "Username and password are required fields.",
        });
      }
    try {
        const user = await getUser(req.body)
        if(user && user.password == password) {
            const token = jwt.sign(user, process.env.JWT_SECRET)
            res.send({
            user, message: "You have successfully logged in.", token
            })
        } 
       
    } catch(message) {
        next(message);
    }
})

module.exports = usersRouter;
