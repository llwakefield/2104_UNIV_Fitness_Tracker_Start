const express = require("express");
const { getAllPublicRoutines, getUserById, createRoutine, updateRoutine, getRoutineById, destroyRoutine, addActivityToRoutine } = require("../db");
const { requireUser } = require("./utils");
const routinesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", async (req, res, next) => {
  const { name, goal, isPublic } = req.body;

  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next({
      message: "You must be logged in to continue",
    });
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        const user = await getUserById(id);
        if (user) {
          const routine = await createRoutine({
            creatorId: id,
            isPublic: isPublic,
            name: name,
            goal: goal,
          });
          res.send(routine);
        }
      }
    } catch (error) {
      next(error);
    }
  }
});

routinesRouter.patch("/:routineId", async (req, res, next) => {
    const { routineId } = req.params;
    const { name, goal, isPublic } = req.body;
    const routineObj = {id: routineId, isPublic: isPublic, name: name, goal: goal}

    try {
        const { id } = await requireUser(req, res, next);
        const routineToUpdate = await getRoutineById(routineId);
        if(routineToUpdate.creatorId === id) {
            const routine = await updateRoutine(routineObj);
            res.send(routine);
        }
        
    } catch(error) {
        next(error);
    }
})

routinesRouter.delete("/:routineId", async (req, res, next) => {
    const { routineId } = req.params;
    try {
        const { id } = await requireUser(req, res, next);
        const routineToDelete = await getRoutineById(routineId);
        if(routineToDelete.creatorId === id) {
            const routine = await destroyRoutine(routineId);
            res.send(routine);
        }
    } catch(error) {
        next(error);
    }
})

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
    const { routineId } = req.params;
    const { activityId, count, duration } = req.body;
    const routineActivityObj = { routineId, activityId, count, duration };
    try {
        const routineActivity = await addActivityToRoutine(routineActivityObj);
        console.log(routineActivity);
        res.send(routineActivity);
    } catch(error) {
        next(error)
    }
})

module.exports = routinesRouter;
