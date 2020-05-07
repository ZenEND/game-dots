const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");

module.exports = {
	entry: "./src/index.tsx",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		plugins: [new TsConfigPathsPlugin(/* { tsconfig, compiler } */)],
	},
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "bundle.min.js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},

	// devServer: {
	// 	contentBase: "./dist",
	// 	port: 3000,
	// 	historyApiFallback: true,
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
