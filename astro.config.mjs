// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
    site: 'https://liblue-whale.github.io',
    base: '/place',
    integrations: [react()],
    redirects: {
        '/Articles': '/articles',
    },
});