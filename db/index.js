// require and re-export all files in this db directory (users, activities...)
const client = require("./client");
const { createUser, getUser, getUserById } = require("./users");



module.exports = {
    createUser,
    getUser,
    getUserById,
}

