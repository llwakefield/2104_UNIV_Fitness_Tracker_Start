// inside of createUser({ username, password})
const bcrypt = require('bcrypt');
const client = require('./client')

async function createUser({username, password}){
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password]);
        delete user.password;
        return user;
    } catch(error){
        throw(error)
    }
}

async function getUser({username, password}){
    try {
        const { rows: [user] } = await client.query(`
            SELECT id, username
            FROM users
            WHERE username=$1 AND password=$2;
        `, [username, password]);
        // delete user.password;
        console.log(user)
        return user;
    } catch(error){
        throw(error);
    }
}

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1;
        `, [id]);
        delete user.password;
        return user;
    } catch(error){
        throw error;
    }
}

async function getUserByUserName(username) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);
        return user;
    } catch(error) {
        throw(error)
    }
}

// const SALT_COUNT = 10;

// bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword) {
//   createUser({
//     username,
//     password: hashedPassword // not the plaintext
//   });
// });

// // inside of getUser({username, password})
// const user = await getUserByUserName(username);
// const hashedPassword = user.password;

// bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
//   if (passwordsMatch) {
//     // return the user object (without the password)
//   } else {
//     throw SomeError;
//   }
// });

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUserName
}