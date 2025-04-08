import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// ✅ Replace with your actual GitHub repo name
const repoName = 'intex-frontend'

export default defineConfig({
    base: `/${repoName}/`, // GitHub Pages base path
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: 'CineNiche',
                short_name: 'CineNiche',
                description: 'Curated classics, indie gold, and global gems.',
                theme_color: '#503047',
                background_color: '#191919',
                display: 'standalone',
                start_url: `/${repoName}/`, // so it starts at correct base
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    }
                ]
            }
        })
    ]
})