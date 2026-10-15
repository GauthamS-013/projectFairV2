require("dotenv").config(); //configuring dotenv module globally for accessing env variables and more
const express = require("express"); //importing express package
const cors = require("cors"); //importing cors
const router = require("./Routes/routes");
const passport = require("./Config/googleStrategy");
require("./Config/githubStrategy");

const server = express(); //crearing server instance

require("./Connection/conn"); //importing mongodb to connection module

server.use(cors()); //configuring cors middleware into created server

server.use(express.json()); //configuring json middleware into created server

server.use(passport.initialize());

server.use(router); //configuring router into server

server.use('/uploaded',express.static('uploads')) //serving uploaded files

const PORT = 3000 || process.env.PORT; //setting up port number

//turn on server listen mode
server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

server.get("/", (req, res) => {
  res.status(200).send("<h1>Server is Active !</h1>");
});