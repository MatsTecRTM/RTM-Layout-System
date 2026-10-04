import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'], tsconfigPath: 'tsconfig.app.json', insertTypesEntry: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RTMLayoutSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'es' : 'umd'}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        /^@emotion\//,
        /^@mui\//,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  }
})
