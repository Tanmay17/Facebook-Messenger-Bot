const { router, text } = require("bottender/router");
const { Plugin: { HelloEvent: { hello }, MainEvent: { main } } } = require("../lib");

module.exports = async function App() {

  return router([
    text(/^(hello|hi)$/i, hello),
    text("*", main)
  ]);

};
