import { defineConfig } from 'vite'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import react from '@vitejs/plugin-react'

const vitestConfig: VitestUserConfigInterface = {
  plugins: [react()],
  test: {
    // vitest config, with helpful vitest typing :)
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  }
};

// https://vitejs.dev/config/
export default defineConfig(vitestConfig);
