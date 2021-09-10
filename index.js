// create the express server here
const express = require('express')
const cors = require('cors')
const server = express();
const morgan = require("morgan");
const { PORT = 3000 } = process.env;


const { client } = require("./db");
client.connect();

server.use(morgan("dev"));

server.use(express.json());

server.use(express.urlencoded({extended:true}))

server.use(cors());

server.use("/api", require("./api"));

server.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})