const express = require("express");
const { requireUser } = require("./utils");
const routineActivitiesRouter = express.Router();
const { getRoutineActivityById, getRoutineById, updateRoutineActivity, destroyRoutineActivity } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    try {
        const { id } = await requireUser(req, res, next);
        const { routineId } = await getRoutineActivityById(routineActivityId);
        const { creatorId } = await getRoutineById(routineId);
        if(creatorId === id) {
            const routineActivity = await updateRoutineActivity({id: routineId, count, duration});
            res.send(routineActivity);
        } else {
            next({message: "You can only update routines that you created."});
        }
    } catch(error) {
        next(error)
    }
})

routineActivitiesRouter.delete("/:routineActivityId", async (req, res, next) => {
    // Passes test for authentication. Only passes test for deletion if
    // authentication steps are removed. Console logs indicate that the 
    // passed-in user may not own the routine being impacted.
    const { routineActivityId } = req.params;
    try {
        const { id } = await requireUser(req, res, next);
        const { routineId } = await getRoutineActivityById(routineActivityId);
        const { creatorId } = await getRoutineById(routineId);
        if(creatorId === id) {
            console.log("you may proceed!")
            const routineActivity = await destroyRoutineActivity(routineActivityId);
            routineActivity.success = true;
            console.log(routineActivity);
            res.send(routineActivity);
        } else {
            next({message: "You can only remove activities from routines that you created."});
        }
    } catch(error) {
        next(error)
    }
})

module.exports = routineActivitiesRouter;