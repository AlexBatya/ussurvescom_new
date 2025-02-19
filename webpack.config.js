const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // или 'production' в зависимости от потребностей
  entry: './src/index.tsx',
  output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
  },
  resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/, // Обработка CSS файлов
				use: ['style-loader', 'css-loader'], // Загрузчики для CSS
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
							publicPath: 'images/',
						},
					},
				],
			},
		],
  },
  plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: "./src/assets/img/logo 2.ico"
		}),
  ],
  devServer: {
		host: "localhost",
		static: {
			directory: path.join(__dirname, 'build'),
		},
		client: false,
		hot: false, // Отключает горячую перезагрузку
		liveReload: false, // Отключает живую перезагрузку
		historyApiFallback: true,
		compress: true,
		port: 9000,
  },
};

