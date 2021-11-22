// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            favicon: "favicon.ico"
        }),
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
                type: "asset",
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";

        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = "development";
    }
    return config;
};