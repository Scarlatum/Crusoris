import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const DIR = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		host: '0.0.0.0',
	},
	build: {
		target: 'ES6',
		sourcemap: true,
		outDir: 'lib',
		minify: 'terser',
		lib: {
			entry: path.resolve(DIR, 'source/index.ts'),
			name: 'eccheuma-crusoris',
			formats: ['es', 'cjs'],
			fileName: (format) => `crusoris.${format}.js`
		},
		terserOptions: {
			mangle: {
				keep_classnames: false,
				keep_fnames: false,
				properties: {
					builtins: true,
					reserved: [
						'attributeChangedCallback',
						'connectedCallback',
						'mode',
						'attachShadow'
					]
				},
			}
		}
	},
	css: {
		modules: {
			generateScopedName: (name) => `crusoris-${ name }`
		}
	},
	resolve: {
		alias: {
			'~': path.resolve(DIR, './source')
		}
	},
})