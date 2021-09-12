const express = require("express");
const { requireUser } = require("./utils");
const routineActivitiesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
//     const { routineActivityId } = req.params;
//     const 
// })

module.exports = routineActivitiesRouter;