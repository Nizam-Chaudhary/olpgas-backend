import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	{
		rules: {
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					caughtErrors: 'all',
					ignoreRestSiblings: false,
					reportUsedIgnorePattern: false,
					argsIgnorePattern: 'next',
				},
			],
		},
	},
]
