const express = require("express");
const {
  createUser,
  getUserByUserName,
  getUser,
  getUserById,
} = require("../db");
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
    next({
      name: "PasswordLengthError",
      message: "Password must be at least 8 characters long.",
    });
  };
  
  try {
    const existingUser = await getUserByUserName(username);
    console.log(existingUser);
    if (existingUser) {
      res.status(401).send({message: "Username already exists"});
    //   next({
    //     name: "ExistingUsernameError",
    //     message: "Username already exists. Please try again.",
    //   });
    } else {
      const user = await createUser(req.body);
      const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET);
      res.send({ user: user, message: "You have successfully registered", token: token });
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
    if (user) {
      const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET);
      res.send({
        message: "you're loggin in!",
        token: token,
      });
    } else {
      next({
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    if (!auth) {
      next({
          message: "You must be logged in to continue"
      });
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
    
  
        try {
        const { id } = jwt.verify(token, JWT_SECRET);
        console.log(id);
        if(id) {
        const user = await getUserById(id);
        res.send(user);
        } else {
            next({ message: "You must be logged in to continue"})
        }
        } catch (error) {
            next(error);
        }
    }
});

module.exports = usersRouter;
