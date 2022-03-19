import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: '0.0.0.0'
	},
	build: {
		target: 'ES2020',
		sourcemap: true,
		outDir: 'lib',
		lib: {
			entry: path.resolve(__dirname, 'source/index.ts'),
			name: 'eccheuma-crusoris',
			formats: ['es'],
			fileName: (format) => `crusoris.${format}.js`
		},
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './source')
		}
	},
})