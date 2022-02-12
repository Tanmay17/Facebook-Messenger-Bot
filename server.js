const bodyParser = require("body-parser");
const express = require("express");
const { bottender } = require("bottender");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = bottender({
  dev: process.env.NODE_ENV !== "production",
});
const port = Number(process.env.PORT) || 3000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

  //GET /messages: show all chats
  server.get("/messages", (req, res) => {
    client.connect().then(async (client) => {
      var chat = client.db("bot").collection("chats");
      await chat.find().toArray((error, data) => {
          client.close();
          return res.send(data);
      });
    });
  });

  //GET /messages/{id}: show chat by id
  server.get("/messages/:id", (req, res) => {
    client.connect().then(async (client) => {
      var chat = client.db("bot").collection("chats");
      await chat
        .find({ _id: new mongo.ObjectID(req.params.id) })
        .toArray((error, data) => {
          res.send(data[0]);
          client.close();
        });
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
