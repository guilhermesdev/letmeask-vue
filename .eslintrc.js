module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/prettier',
		'prettier'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-unused-labels': 'off',
		'prettier/prettier': [
			'warn',
			{
				arrowParens: 'avoid',
				singleQuote: true,
				trailingComma: 'none',
				useTabs: true,
				width: 2
			}
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
};
