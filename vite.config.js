import path from 'path';
import { defineConfig } from 'vite';

// import typescript2 from "rollup-plugin-typescript2"

export default defineConfig({
	// plugins: [{
	// 	...typescript2({
	// 		useTsconfigDeclarationDir: true
	// 	}), apply: 'build'
	// }],
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
			'~': path.resolve(__dirname, './source')
		}
	},
})