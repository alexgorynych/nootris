const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
    },
    output: {
        filename: "[name].bundle.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            STYLES: path.resolve(__dirname, "src/styles"),
            ICONS: path.resolve(__dirname, "src/icons"),
            IMGS: path.resolve(__dirname, "src/images"),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        port: 5500,
        liveReload: isDev,
        hot: isDev,
        open: isDev,
        historyApiFallback: true,
    },
    devtool: isDev ? "source-map" : false,
    module: {
        rules: [
            { test: /\.html$/, loader: "html-loader" },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: { presets: ["@babel/preset-env"] },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env"]],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(webp|png|jpg|svg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.[contenthash].css",
        }),
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
    ],
};
