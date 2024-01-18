const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: "./src/entry.js",
    mode: "development",
    devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "HomeApp",
            remotes: { 
                "TableApp": "TableApp@http://localhost:3001/remoteEntry.js",            
            },
            shared: {  // and shared
                ...dependencies,  // other dependencies
                react: { // react
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": { // react-dom
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        fallback:{
            "net":false,
            "tls":false,
            "browser":false
        }
    },
    target: "web",
};