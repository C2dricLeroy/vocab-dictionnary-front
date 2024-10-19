import { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    return {
        name: "LexiLearn",
        short_name: "Lexi",
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff',
        theme_color: '#101E33',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            }
        ],
    };
}
