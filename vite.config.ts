import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const comon = {
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        },
    }
    if (command === 'serve') {
        return {
            ...comon,
            // dev 独有配置
            server: {
                proxy: {
                    '/api': {
                        target: env.VITE_BACKEND_URL,
                        changeOrigin: true
                    }
                }
            }
        }
    } else {
        // command === 'build'
        return {
            ...comon
            // build 独有配置
        }
    }
})
