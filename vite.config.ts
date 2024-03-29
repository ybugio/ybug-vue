import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ybug-vue',
            fileName: 'index',
        },
    },
    plugins: [
        dts(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/*.d.ts',
                    dest: ''
                }
            ]
        })
    ],
});