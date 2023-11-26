module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@': './src',
				},
			},
		],
		'react-native-reanimated/plugin',
		[
			'module:react-native-dotenv',
			{
				envName: 'APP_ENV',
				moduleName: '@env',
				path: '.env',
				safe: false,
				allowUndefined: true,
				verbose: false,
			},
		],
	],
};
