const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = (env) => {
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "docs"),
            filename: "bundle.js",
            publicPath: "/",
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: "html-loader",
                    },
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                process: JSON.stringify({
                    env: {
                        ...env,
                        API: env.API,
                    },
                }),
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "styles/[name].css",
            }),
        ],
    };
};
