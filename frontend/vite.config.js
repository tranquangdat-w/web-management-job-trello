import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  // for absolute import
  resolve: {
    // change ~ to /src in import for short import and clean code
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})

