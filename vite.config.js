import path from 'path';
import { defineConfig } from 'vite';

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
			entry: path.resolve(__dirname, 'source/index.ts'),
			name: 'eccheuma-crusoris',
			formats: ['es', 'cjs'],
			fileName: (format) => `crusoris.${format}.js`
		},
		terserOptions: {
			compress: true,
			mangle: {
				properties: {
					builtins: true,
					reserved: [
						'mode',
						'connectedCallback',
						'attributeChangedCallback',
						'attachShadow',
					]
				}
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
			'~': path.resolve(__dirname, './source')
		}
	},
})