import type { APIRoute } from 'astro';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

export const GET: APIRoute = async ({ request }) => {
    const API_KEY = import.meta.env.SECRET_API_KEY;
    const AUTH_SECRET = import.meta.env.SECRET_AUTH_KEY;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
        return new Response(
            JSON.stringify({ error: 'Authorization header is missing' }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica el token
        jwt.verify(token, AUTH_SECRET);
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        const response = await fetch(
            'https://api.mr-zemoreno.dev/get?fileName=01%20El%20Necio.m4a',
            {
                headers: {
                    'api-key': API_KEY,
                },
            }
        );

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return new Response(
                JSON.stringify({ error: 'Failed to fetch audio URL' }),
                {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const json = await response.json();
        return new Response(JSON.stringify(json), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error fetching audio URL:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch audio URL' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
