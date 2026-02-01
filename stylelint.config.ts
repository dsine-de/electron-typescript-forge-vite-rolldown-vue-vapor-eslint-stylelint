export default {
	plugins: ['@stylistic/stylelint-plugin'],
	extends: [
		'stylelint-config-standard',
		'@stylistic/stylelint-config',
		'stylelint-config-standard-vue'
	],
	rules: {'@stylistic/indentation': 'tab'}
};
