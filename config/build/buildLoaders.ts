import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BuildOptions} from './types/config';
import webpack from 'webpack';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => resPath.includes('.module.'),
						localIdentName: isDev
							? '[name]__[local]--[hash:base64:5]'
							: '[hash:base64:5]',
					},
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: isDev,
				},
			},
		],
	};

	return [typescriptLoader, sassLoader];
}
