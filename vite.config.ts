import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on GitHub Pages at /<repo-name>/ or a user site root.
  base: './',
})
