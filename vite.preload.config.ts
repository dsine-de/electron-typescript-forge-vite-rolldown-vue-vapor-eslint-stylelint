import type {UserConfig} from 'vite';

export default {
	build: {
		target: 'esnext',
		rolldownOptions: {external: 'electron/renderer'}
	}
} satisfies UserConfig;
