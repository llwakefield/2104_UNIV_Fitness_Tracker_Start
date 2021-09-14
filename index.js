// create the express server here
const express = require('express')
const cors = require('cors')
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const { client } = require("./db");

const server = express();

const { PORT = 3000 } = process.env;

server.use(morgan("dev"));

server.use(bodyParser.json());

server.use(express.json());

server.use(express.urlencoded({extended:true}))

server.use(cors());

server.use("/api", require("./api"));

// server.use((error, req, res, next) => {
//   res.status(404).send(error)
// })

// server.use((error, req, res, next) => {
//   res.status(500).send(error)
// })

server.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
  client.connect();
})