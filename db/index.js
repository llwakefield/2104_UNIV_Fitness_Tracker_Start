// require and re-export all files in this db directory (users, activities...)
const client = require("./client");
const { createUser, getUser, getUserById } = require("./users");
const { getActivityById, getAllActivities, createActivity, updateActivity } = require("./activities");
const { createRoutine, getRoutinesWithoutActivities, getRoutineById } = require("./routines");
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
    addActivityToRoutine,
    getRoutineById,
    updateActivity,
}

