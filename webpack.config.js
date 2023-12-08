const webpack = require("webpack");
const path = require("path");
const { argv } = require("yargs");
const pkg = require("./package.json");

const libraryName = pkg.name;
const libraryVersion = pkg.version;

let outputFile, mode;

if (argv.env === "build") {
  mode = "production";
  outputFile = libraryName + "-" + libraryVersion + ".min.js";
} else {
  mode = "development";
  outputFile = libraryName + "-" + libraryVersion + ".js";
}

const config = {
  mode: mode,
  entry: path.resolve(__dirname, "src", "index.js"),
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"],
  },
};

module.exports = config;
