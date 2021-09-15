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

async function updateRoutineActivity({id, count, duration}) {
    //  if both are true, then...; if one is true, then...; if the other is true, then...;
    try {
        if(count && duration) {
            const { rows: [routine] } = await client.query(`
                UPDATE routine_activities
                SET count=$2, duration=$3
                WHERE id=$1
                RETURNING *;
            `, [id, count, duration]);
            return routine;
        } else if(count) {
            const { rows: [routine] } = await client.query(`
                UPDATE routine_activities
                SET count=$2
                WHERE id=$1
                RETURNING *;
            `, [id, count]);
            return routine;
        } else if(duration) {
            const { rows: [routine] } = await client.query(`
            UPDATE routine_activities
            SET duration=$2
            WHERE id=$1
            RETURNING *;
            `, [id, duration]);
            return routine;
        }
    } catch(error) {
        throw(error);
    }
}

async function destroyRoutineActivity(id) {
    try {
        const {rows: [routine]} = await client.query(`
            DELETE FROM routine_activities
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return routine;
    } catch(error) {
        throw(error);
    }
}



module.exports = {
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    getRoutineActivityById,
    destroyRoutineActivity,
    updateRoutineActivity,
}