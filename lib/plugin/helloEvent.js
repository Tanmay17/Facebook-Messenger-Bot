const { ChatModel } = require( '../model' );

module.exports = {
  hello: async function (context) {
    // session
    const session = context.session;
    
    // update state
    const chat = context.event.text;
    context.setState({
      chat,
      count: 1,
    });

    await ChatModel.insertMany([{
      _state: session._state,
      lastActivity: session.lastActivity,
      platform: session.platform,
      user: session.user,
    }]);

    await context.sendText(`Hi! What's your name?`);

  },
};
