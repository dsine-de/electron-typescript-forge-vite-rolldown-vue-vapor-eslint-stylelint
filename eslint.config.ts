import {includeIgnoreFile} from '@eslint/compat';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import {defineConfig} from 'eslint/config';
import globals from 'globals';
import {fileURLToPath} from 'node:url';
import ts from 'typescript-eslint';

export default defineConfig([
	includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
	js.configs.recommended,
	ts.configs.strictTypeChecked,
	ts.configs.stylisticTypeChecked,
	pluginVue.configs['flat/recommended'],
	stylistic.configs.customize({
		indent: 'tab',
		semi: true,
		jsx: false,
		blockSpacing: false,
		braceStyle: '1tbs',
		commaDangle: 'never',
		quoteProps: 'as-needed'
	}),
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				parser: ts.parser,
				extraFileExtensions: ['.vue']
			}
		},
		rules: {
			'@stylistic/quotes': ['error', 'single'],
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'vue/html-indent': ['warn', 'tab'],
			'vue/html-closing-bracket-spacing': ['warn', {selfClosingTag: 'never'}],
			'vue/mustache-interpolation-spacing': ['warn', 'never'],
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': ['warn', {allowEmptyLines: true}],
			'vue/max-attributes-per-line': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/comma-dangle': ['warn', 'never'],
			'@stylistic/arrow-parens': ['warn', 'as-needed'],
			'@stylistic/object-curly-spacing': ['warn', 'never'],
			'@stylistic/indent': ['warn', 'tab', {
				MemberExpression: 0,
				SwitchCase: 1
			}],
			'@stylistic/padded-blocks': ['error', 'never'],
			'@stylistic/no-extra-semi': 'warn',
			'@stylistic/no-floating-decimal': 'off',
			'@stylistic/operator-linebreak': ['warn', 'after', {
				overrides: {
					'?': 'before',
					':': 'before'
				}
			}],
			'@stylistic/multiline-ternary': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'never']
		}
	}
]);
