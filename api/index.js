const express = require("express");
// create an api router
const apiRouter = express.Router();
// attach other routers from files in this api directory (users, activities...)

apiRouter.get('/health', function (req, res, next) {
    res.send({message:'All is well'})
  });

// apiRouter.use('/activities', require("./activities"))
apiRouter.use('/users', require('./users'))

// export the api router
module.exports = apiRouter;
