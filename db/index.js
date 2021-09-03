// require and re-export all files in this db directory (users, activities...)
const client = require("./client");
const { createUser } = require("./users");



module.exports = {
    createUser
}

