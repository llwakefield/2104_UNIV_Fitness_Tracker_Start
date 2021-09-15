const express = require("express");
const { getAllActivities, createActivity, getUserById, updateActivity, getPublicRoutinesByActivity } = require("../db");
const activitiesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


activitiesRouter.get("/", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch(error) {
        next(error);
    }
})

activitiesRouter.post("/", async (req, res, next) => {
    const { name, description } = req.body;
    const prefix = "Bearer ";
    const auth = req.header("Authorization");

    if(!name || !description) {
        next({
            message: "Both a name and a description are required."
        });
    }
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
                const activity = await createActivity(req.body);
                res.send(activity);
            }}
        } catch(error) {
            next(error)
        }
    }
})

activitiesRouter.patch("/:activityId", async (req, res, next) => {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const reqObj = {id: activityId, name: name, description: description}
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
            const activity = await updateActivity(reqObj);
            res.send(activity);
        }}
    } catch(error) {
        next(error)
    }
}
})

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
    const { activityId } = req.params;
    try {
        const routines = await getPublicRoutinesByActivity({id: activityId});
        res.send(routines);
    } catch(error) {
        next(error);
    }

})

module.exports = activitiesRouter