import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import VitePluginInjectPreload from 'vite-plugin-inject-preload'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg(),
    VitePluginInjectPreload({
      files: [{ match: /[a-z-0-9]*.css$/ }],
    }),
    nodePolyfills({
      exclude: ['fs', 'buffer', 'process'],
      globals: {
        global: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2015',
    minify: 'terser',
    assetsInlineLimit: 17096,
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  resolve: {
    alias: [
      { find: /\@\app\//, replacement: '/src/' },
      { find: /\@\account\//, replacement: '/src/features/account/' },
      { find: /\@\wedding\//, replacement: '/src/features/wedding/' },
    ],
  },
  server: { port: 3000 },
  preview: { port: 3000 },
})
