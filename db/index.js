// require and re-export all files in this db directory (users, activities...)
const client = require("./client");
const { createUser, getUser, getUserById } = require("./users");
const {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
} = require("./activities");
const {
  createRoutine,
  getRoutinesWithoutActivities,
  getRoutineById,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require("./routines");
const {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  destroyRoutineActivity,
  updateRoutineActivity,
} = require("./routine_activities");

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
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  destroyRoutineActivity,
  updateRoutineActivity,
};
