import type {UserConfig} from 'vite';

export default {
	build: {
		target: 'esnext',
		lib: {
			formats: ['es'],
			entry: 'ts/node/main.ts',
			fileName: 'main'
		},
		rolldownOptions: {platform: 'node'}
	},
	plugins: [{
		name: 'restart',
		closeBundle() {
			process.stdin.emit('data', 'rs');
		}
	}]
} satisfies UserConfig;
