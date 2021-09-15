const client = require("./client");

async function getActivityById(id) {
    try{
        const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=$1;
    `, [id]);
    console.log(activity);
    return activity;
    }  catch(error){
        throw(error);
    }  
}

async function getAllActivities(){
    try{
        const { rows: activities } = await client.query(`
            SELECT *
            FROM activities;
        `);
        console.log(activities);
        return activities;
    } catch(error) {
        throw(error);
    }
}

async function createActivity ({name, description}){
    // const lowerCaseName = name.toLowerCase();
    try{
        const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES($1, $2)
            RETURNING *;
        `, [name, description]);
        return activity;
    } catch(error){
        throw(error);
    }
}

async function updateActivity({id, name, description}) {
    // const lowerCaseName = name.toLowerCase();
    try {
        const {rows: [activity] } = await client.query(`
            UPDATE activities
            SET name=$2, description=$3
            WHERE id=$1
            RETURNING *;
        `, [id, name, description]);
        return activity;

    } catch(error){
        throw(error);
    }
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity,
}