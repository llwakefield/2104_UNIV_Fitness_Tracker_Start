const express = require("express");
const { createUser, getUserByUserName, getUser } = require("../db");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialError",
      message: "Username and password are required fields.",
    });
  }
  if (password.length < 8) {
    res.status(401);
    next({
      name: "PasswordLengthError",
      message: "Password must be at least 8 characters long.",
    });
  }
  try {
    const _user = await getUserByUserName(username);
    console.log(_user);
    if (_user) {
        // res.status(401).send({error: "error"});
        next({
        name: "ExistingUsernameError",
        message: "Username already exists. Please try again.",
      });
    } else {
        const user = await createUser(req.body);
        res.send({ user: user, message: "You have successfully registered" });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
          message: "Username and password are required fields.",
        });
      }
    try {
        const user = await getUser(req.body);
        if(user) {
            const token = jwt.sign({id: user.id, username: username}, JWT_SECRET);
            res.send({
            message: "you're loggin in!", token: token
            });
        } else {
            next({
                message: "Username or password is incorrect"
            })
        }
    } catch(error) {
        next(error);
    }
})

module.exports = usersRouter;
