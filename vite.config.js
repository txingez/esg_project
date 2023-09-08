import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    envDir: './environments',
    envPrefix: 'ENV_',
    plugins: [
        vue()
    ],
    server: {
        port: 6868,
        strictPort: true
    },
    drop: ["console", "debugger"]
})
