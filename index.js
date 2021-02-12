const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const router = express.Router();
const port = process.env.PORT || 8081;
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const { request } = require("express");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
var PROTO_PATH = __dirname + "/user.proto";

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var user_proto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new user_proto.User(
  process.env.TARGET,
  grpc.credentials.createInsecure()
);

app.post("/user", (req, res) => {
  console.log(req.method + ":" + req.hostname);

  client.createUser(
    { name: req.body.user, email: req.body.email },
    function (err, response) {
      res.send(response.message);
    }
  );
});

app.put("/user", (req, res) => {
  console.log(req.method + ":" + req.hostname);

  client.updateUser(
    { _id: req.body._id, friends: req.body.friends, lists: req.body.lists },
    function (err, response) {
      res.send(response.message);
    }
  );
});

app.get("/user/:email", (req, res) => {
  console.log(req.method + ":" + req.hostname);

  client.getUser(
    { name: "", email: req.params.email },
    function (err, response) {
      res.send(response.message);
    }
  );
});

app.get("/user", (req, res) => {
  console.log(req.method + ":" + req.hostname);

  client.getAllUsers({}, function (err, response) {
    res.send(response.message);
  });
});

app.delete("/user", (req, res) => {
  console.log(req.method + ":" + req.hostname);

  client.deleteUser(
    { name: "", email: req.body.email },
    function (err, response) {
      res.send(response.message);
    }
  );
});

app.listen(port, () => {
  console.log(`App listening on ${port}!`);
});
