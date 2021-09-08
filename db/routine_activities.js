const client = require("./client");

async function addActivityToRoutine({routineId, activityId, count, duration}) {
    try{
        const { rows: [routine_activity]} = await client.query(`
            INSERT INTO routine_activities ("routineId", "activityId", count, duration)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [routineId, activityId, count, duration]);
        return routine_activity;
    } catch(error) {
        throw(error);
    }
}

async function getRoutineActivitiesByRoutine({id}) {
    try {
        const { rows: routine_activities } = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE "routineId"=$1
        `, [id]);
        return routine_activities;
    } catch(error){
        throw(error);
    }
}

async function getRoutineActivityById(id) {
    try {
        const { rows: [routine_activity] } = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE id=$1;
        `, [id]);
        return routine_activity;
    } catch(error) {
        throw(error);
    } 
}

// async function updateRoutineActivity({id, count, duration}) {
//     const setString = 

//     try {
//         const { rows: [routine] } = await client.query(`

//         `)
//     }
// }

async function destroyRoutineActivity({id}) {
    try {
        await client.query(`
            DELETE FROM routine_activities
            WHERE id=$1;
        `, [id]);
    } catch(error) {
        throw(error);
    }
}



module.exports = {
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    getRoutineActivityById,
    destroyRoutineActivity,
}