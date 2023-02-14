import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import * as path from 'path';

const vitConfig: VitestUserConfigInterface = {
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  test: {
    // vitest config, with helpful vitest typing :)
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'istanbul' // or 'c8'
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(vitConfig)
