import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@api": resolve(__dirname, "src/api"),
            "@assets": resolve(__dirname, "src/assets"),
            "@layouts": resolve(__dirname, "src/layouts/"),
            "@components": resolve(__dirname, "src/components"),
            "@pages": resolve(__dirname, "src/pages"),
            "@utils": resolve(__dirname, "src/utils"),
            "@types": resolve(__dirname, "src/types"),
            "@hooks": resolve(__dirname, "src/hooks"),
        },
    },
});
