const express = require("express");
const { createUser } = require("../db");
const usersRouter = express.Router();
require('../db');

usersRouter.post('/register', async (req, res, next) => {
    try{
        await createUser(req.body)
    } catch(error) {
        next(error)
    }
})



module.exports = usersRouter;