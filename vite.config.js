import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteImagemin from 'vite-plugin-imagemin'
import viteCompression from 'vite-plugin-compression'
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "url";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
	envDir: './environments',
	envPrefix: 'ENV_',
	plugins: [
		vue(),
		nodePolyfills({protocolImports: true}),
		viteImagemin(),
		viteCompression(),
		VueI18nPlugin({
			runtimeOnly: true,
			strictMessage: false,
			include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**')
		})
	],
	server: {
		port: 6868,
		strictPort: true
	},
	drop: ["console", "debugger"],
	build: {
		rollupOptions: {
			plugins: [inject({Buffer: ['buffer', 'Buffer'], process: 'process'})]
		}
	},
})
