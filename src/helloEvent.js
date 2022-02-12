const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

module.exports = {
  hello: async function (context) {
    // session
    const session = context.session;

    // update state
    const chat = context.event.text;
    context.setState({
      chat,
      count: 1
    });

    // save to mongo
    client.connect().then(async (client) => {
      var chat = client.db("bot").collection("chats");
      await chat.insertOne({
        _state: session._state,
        lastActivity: session.lastActivity,
        platform: session.platform,
        user: session.user,
      });
      client.close();
    });
    await context.sendText(`Hi! What's your name?`);
  },
};
