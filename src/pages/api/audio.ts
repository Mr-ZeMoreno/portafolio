import type { APIRoute } from 'astro';
import fetch from 'node-fetch';

export const GET: APIRoute = async ({ request }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    try {
        const response = await fetch(
            'https://api.mr-zemoreno.dev/get?fileName=01%20El%20Necio.m4a',
            {
                headers: {
                    'api-key': API_KEY,
                },
            }
        );
        const json = await response.json();
        return new Response(JSON.stringify(json), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching audio URL:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch audio URL' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
