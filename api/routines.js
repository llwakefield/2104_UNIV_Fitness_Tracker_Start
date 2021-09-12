const express = require("express");
const { getAllPublicRoutines, getUserById, createRoutine } = require("../db");
const routinesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

routinesRouter.get("/", async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);
    } catch(error) {
        next(error);
    }
})

routinesRouter.post("/", async (req, res, next) => {
    const { name, goal, isPublic } = req.body;

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
        if(id) {
        const user = await getUserById(id);
        if(user) {
            const routine = await createRoutine({creatorId: id, isPublic: isPublic, name: name, goal: goal});
            res.send(routine);
        }}
    } catch(error) {
        next(error)
    }
}
})


module.exports = routinesRouter