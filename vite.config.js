import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // for absolute import
  resolve: {
    // change ~ to /src in import for short import and clean code
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})

