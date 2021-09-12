const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

async function requireUser(req, res, next) {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    if (!auth) {
      next({
        message: "You must be logged in to continue",
      });
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          const user = await getUserById(id);
          if (user) {
            return user;
          }
        }
      } catch(error) {
          next(error);
      }
    }
};
  
  
  module.exports = {
    requireUser,
  };