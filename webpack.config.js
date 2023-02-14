const path = require("path");
module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.join(__dirname),
    filename: "bundle.js",
    publicPath: "/public",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
