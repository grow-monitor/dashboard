//https://github.com/netlify/netlify-lambda/issues/179#issuecomment-531468792webpack.functions.js
const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [nodeExternals()],
};
