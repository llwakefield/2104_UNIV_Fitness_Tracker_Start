const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
            SELECT *
            FROM routines;
        `);
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT *
            FROM routines
            WHERE id=$1;
        `,
      [id]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
    try {
        const { rows: routines } = await client.query(`
            SELECT routines.*, users.username AS "creatorName"
            FROM routines
            JOIN users ON routines."creatorId" = users.id;
        `);
        for (const routine of routines){
            const { rows: activities } = await client.query(`
                SELECT activities.*, routine_activities.*
                FROM activities
                JOIN routine_activities ON activities.id = routine_activities."activityId"
                WHERE routine_activities."routineId" = $1;
            `, [routine.id]);
            routine.activities = activities;
        }
        return routines;
    } catch(error) {
        throw (error);
    }
}

async function getAllPublicRoutines() {
    try {
        const { rows: routines } = await client.query(`
            SELECT routines.*, users.username AS "creatorName"
            FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE routines."isPublic" = true;
        `);
        for (const routine of routines){
            const { rows: activities } = await client.query(`
                SELECT activities.*, routine_activities.*
                FROM activities
                JOIN routine_activities ON activities.id = routine_activities."activityId"
                WHERE routine_activities."routineId" = $1;
            `, [routine.id]);
            routine.activities = activities;
        }
        return routines;
    } catch(error) {
        throw (error);
    }
}

async function getAllRoutinesByUser({username}) {
    try {
        const { rows: routines } = await client.query(`
            SELECT routines.*, users.username AS "creatorName"
            FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE users.username = $1;
        `, [username]);
        for (const routine of routines){
            const { rows: activities } = await client.query(`
                SELECT activities.*, routine_activities.*
                FROM activities
                JOIN routine_activities ON activities.id = routine_activities."activityId"
                WHERE routine_activities."routineId" = $1;
            `, [routine.id]);
            routine.activities = activities;
        }
        return routines;
    } catch(error) {
        throw (error);
    }
}

async function getPublicRoutinesByUser({username}) {
    try {
        const { rows: routines } = await client.query(`
            SELECT routines.*, users.username AS "creatorName"
            FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE users.username = $1 AND routines."isPublic" = true;
        `, [username]);
        for (const routine of routines){
            const { rows: activities } = await client.query(`
                SELECT activities.*, routine_activities.*
                FROM activities
                JOIN routine_activities ON activities.id = routine_activities."activityId"
                WHERE routine_activities."routineId" = $1;
            `, [routine.id]);
            routine.activities = activities;
        }
        return routines;
    } catch(error) {
        throw (error);
    }
}

async function getPublicRoutinesByActivity({id}) {
    try {
        const { rows: routines } = await client.query(`
            SELECT routines.*, users.username AS "creatorName"
            FROM routines
            JOIN users ON routines."creatorId" = users.id
            WHERE routines."isPublic" = true;
        `);
        for (const routine of routines){
            const { rows: activities } = await client.query(`
                SELECT activities.*, routine_activities.*
                FROM activities
                JOIN routine_activities ON activities.id = routine_activities."activityId"
                WHERE routine_activities."activityId" = $1;
            `, [id]);
            routine.activities = activities;
        }
        return routines;
    } catch(error) {
        throw (error);
    }
}

async function updateRoutine({id, isPublic=false, name, goal}) {
    try {
        const { rows: [routine] } = await client.query(`
            UPDATE routines
            SET "isPublic"=$2, name=$3, goal=$4
            WHERE id=$1
            RETURNING *;
        `, [id, isPublic, name, goal]);
        return routine;
    } catch(error) {
        throw(error);
    }
}

async function destroyRoutine(id) {
    try {
        const { rows: [routine] } = await client.query(`
            DELETE FROM routines
            WHERE id=$1
            RETURNING *;
        `, [id]);
        await client.query(`
            DELETE FROM routine_activities
            WHERE "routineId"=$1;
        `, [id]);
        return routine;
    } catch(error) {
        throw(error);
    }
}


module.exports = {
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
};
