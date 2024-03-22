import { resolve, relative } from 'path';
import { defineConfig } from 'vite'
import bambuserBamUIPlugin from '@bambuser/vite-plugin-bam-ui';
import bambuserAppDevEnvPlugin from '@bambuser/vite-plugin-bam-app-dev-env';
import bambuserAppRuntimePlugin from '@bambuser/vite-plugin-bam-app-runtime';

export default defineConfig({
  plugins: [
    bambuserBamUIPlugin(),
    bambuserAppRuntimePlugin(),
    bambuserAppDevEnvPlugin()
  ],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: [
        resolve(process.cwd(), 'main.js'),
        resolve(process.cwd(), 'view/myCustomView/myCustomView.html'),
      ],
      output: {
        entryFileNames: (chunkInfo) => {
          return relative(process.cwd(), chunkInfo.facadeModuleId.replace('.html', '.js'));
        }
      },
    },
  },
  server: {
    port: '5173',
    open: '/devenv/',
  },
});
