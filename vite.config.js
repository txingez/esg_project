import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import viteImagemin from 'vite-plugin-imagemin'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    envDir: './environments',
    envPrefix: 'ENV_',
    plugins: [
        vue(),
        viteImagemin(),
        viteCompression()
    ],
    server: {
        port: 6868,
        strictPort: true
    },
    drop: ["console", "debugger"]
})
