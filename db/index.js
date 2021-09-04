// require and re-export all files in this db directory (users, activities...)
const client = require("./client");
const { createUser, getUser, getUserById } = require("./users");
const { getActivityById, getAllActivities, createActivity } = require("./activities");
const { createRoutine, getRoutinesWithoutActivities } = require("./routines");
const { addActivityToRoutine } = require("./routine_activities");



module.exports = {
    createUser,
    getUser,
    getUserById,
    getActivityById,
    getAllActivities,
    createActivity,
    createRoutine,
    getRoutinesWithoutActivities,
    addActivityToRoutine
}

