import { defineConfig } from "vite"

// vite.config.js

export default {
    // config options
    server: {
        proxy: {
            '/get-towns': 'http://localhost:8080',
            '/create-town': 'http://localhost:8080'
        }
    },
}