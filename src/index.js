const { router, text } = require("bottender/router");
const { Plugin: {HelloEvent, MainEvent} } = require("../lib");

module.exports = async function App() {
  return router([
    text(/^(hello|hi)$/i, HelloEvent),
    text("*", MainEvent)
  ]);
};
