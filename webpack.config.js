var path = require('path');
var SRC_DIR = path.join(__dirname, '/public/src');
var DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
            presets: ["env", "react"]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["eslint-loader"]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
            // query: {
            //   modules: true,
            //   localIdentName: '[name]__[local]___[hash:base64:5]'
            // }
          }
        ]
      }
    ]
  }
};