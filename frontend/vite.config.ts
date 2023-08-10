import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    open: true,
    proxy: {
      // 文字列のショートハンド: http://localhost:5173/books -> http://localhost:8080/books
      '/books': 'http://localhost:8080/',
    }
  },
  plugins: [react()],
})