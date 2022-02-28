const { ChatModel } = require("../model");
var moment = require("moment");

module.exports = {
  main: async function (context) {
    // session
    const session = context.session;
    // switch step
    switch (context.state.count) {
      case 1:
        // state
        var name = context.event.text;
        var count = context.state.count + 1;
        context.setState({
          count,
          name,
        });
        // save to mongo

        await ChatModel.insertMany([{
          _state: session._state,
          lastActivity: session.lastActivity,
          platform: session.platform,
          user: session.user,
        }]);
        // response chat
        await context.sendText(
          `Hello ${name}, when is your birthday? Please answer in YYYY-MM-DD format.`
        );
        break;

      case 2:
        // state
        var now = moment();
        var bday = context.event.text;
        var count = context.state.count + 1;
        context.setState({
          count,
          bday,
        });
        // save to mongo

        await ChatModel.insertMany([{
          _state: session._state,
          lastActivity: session.lastActivity,
          platform: session.platform,
          user: session.user,
        }]);
        // calculate day differences
        bday = moment(bday, "YYYY-MM-DD", true);

        if (bday.isValid()) {
          // response chat
          await context.sendText(
            `Your birthday is at ${bday.format(
              "LL"
            )}. Do you want to know how many days till your next birthday?`,
            {
              quickReplies: [
                {
                  contentType: "text",
                  title: "✅ Yes",
                  payload: "BIRTHDAY_YES",
                },
                {
                  contentType: "text",
                  title: "⛔ No",
                  payload: "BIRTHDAY_NO",
                },
              ],
            }
          );
          break;
        } else {
          // response chat
          var count = 0;
          context.setState({
            count,
          });
          await context.sendText(`Sorry, your birthday is not valid`);
          break;
        }

      case 3:
        // state
        var know;
        if (context.event.isPayload) {
          know = context.event.payload.split("_")[1];
        } else {
          know = context.event.text;
        }
        var bday = moment(context.state.bday).format("YYYY-MM-DD");
        var now = moment().format("YYYY-MM-DD");
        var count = 0;
        context.setState({
          know,
          count,
        });
        // save to mongo

        await ChatModel.insertMany([{
          _state: session._state,
          lastActivity: session.lastActivity,
          platform: session.platform,
          user: session.user,
        }]);
        // calculate how many days till next birthday
        bdayNow = bday.split("-");
        bdayNow = `${now.split("-")[0]}-${bdayNow[1]}-${bdayNow[2]}`;
        bdayNow = moment(bdayNow).format("YYYY-MM-DD");
        var dayleft;
        if (bdayNow > now) {
          dayleft = moment(bdayNow).diff(moment(now), "days");
        } else if (bdayNow < now) {
          bdayNow = moment(bdayNow).add(1, "year").format("YYYY-MM-DD");
          bdayNow = moment(bdayNow).format("YYYY-MM-DD");
          dayleft = moment(bdayNow).diff(moment(now), "days");
        } else {
          dayleft = 0;
        }
        // response chat
        if (know.toUpperCase().startsWith("Y")) {
          await context.sendText(
            `There are ${dayleft} days left until your next birthday`
          );
          break;
        } else {
          await context.sendText(`Goodbye 👋`);
          break;
        }
    }
  },
};
