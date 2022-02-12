const { router, text } = require("bottender/router");
const { hello } = require("./helloEvent");
const { main } = require("./mainEvent");

module.exports = async function App() {
  return router([
    text(/^(hello|hi)$/i, hello),
    text("*", main)
  ]);
};
