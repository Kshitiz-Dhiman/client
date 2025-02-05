import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react(), VitePWA({
        registerType: 'prompt',
        injectRegister: false,

        pwaAssets: {
            disabled: false,
            config: true,
        },

        manifest: {
            name: 'client',
            short_name: 'music-client',
            description: 'This is yt music foss',
            theme_color: '#ffffff',
        },

        workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
        },

        devOptions: {
            enabled: false,
            navigateFallback: 'index.html',
            suppressWarnings: true,
            type: 'module',
        },
    })],
})
