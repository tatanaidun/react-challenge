const path = require("path");
const webpack = require("webpack");
const dotenv =
  process.env.NODE_ENV == "production"
    ? require("dotenv").config({
        path: path.join(__dirname, ".env.production"),
      })
    : require("dotenv").config({
        path: path.join(__dirname, ".env.development"),
      });

const HtmlWebpackPlugin = require("html-webpack-plugin");

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader"],
  },
];

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/",
    },
    module: { rules },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public/index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env.PORT": JSON.stringify(process.env.PORT),
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
  };
};
