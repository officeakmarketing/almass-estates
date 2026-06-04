import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import brandConfig from './src/config/brand.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html
          .replace(/<title>(.*?)<\/title>/, `<title>${brandConfig.metadata.title}</title>`)
          .replace(/<meta name="description" content="(.*?)" \/>/g, `<meta name="description" content="${brandConfig.metadata.description}" />`)
          .replace(/<link[^>]*family=[^>]*>/, `<link href="${brandConfig.fonts.googleFontsUrl}" rel="stylesheet" />`);
      }
    }
  ],
})