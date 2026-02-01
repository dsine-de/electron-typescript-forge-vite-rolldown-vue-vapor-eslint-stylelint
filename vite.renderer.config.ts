import vue from '@vitejs/plugin-vue';
import type {UserConfig} from 'vite';
import checker from 'vite-plugin-checker';
import vueDevTools from 'vite-plugin-vue-devtools';

export default {
	build: {target: 'esnext'},
	plugins: [
		vue(),
		vueDevTools(),
		checker({
			vueTsc: true,
			eslint: {
				lintCommand: 'eslint .',
				useFlatConfig: true,
				watchPath: [
					'./ts',
					'./vue'
				]
			},
			stylelint: {
				lintCommand: 'stylelint css/**/*.css',
				watchPath: './css'
			},
			overlay: {initialIsOpen: false}
		})
	]
} satisfies UserConfig;
