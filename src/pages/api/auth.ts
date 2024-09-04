import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Verificar el tipo de contenido de la solicitud
        const contentType = request.headers.get('Content-Type');
        if (contentType !== 'application/json') {
            return new Response(
                JSON.stringify({ error: 'Invalid content type' }),
                {
                    status: 415,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Intentar leer el cuerpo de la solicitud
        const requestBody = await request.json(); // Leer el cuerpo como JSON
        const { username, password } = requestBody;

        // Verificar que username y password estén presentes
        if (!username || !password) {
            return new Response(
                JSON.stringify({ error: 'Username and password are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Verificar las credenciales (esto es solo un ejemplo simplificado)
        if (username === 'testuser' && password === 'password123') {
            const SECRET_AUTH_KEY = import.meta.env.SECRET_AUTH_KEY; // Clave secreta para firmar el JWT
            if (!SECRET_AUTH_KEY) {
                return new Response(
                    JSON.stringify({ error: 'Server configuration error' }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
            const token = jwt.sign({ username }, SECRET_AUTH_KEY, { expiresIn: '1h' }); // Crear el token JWT

            return new Response(JSON.stringify({ token }), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(
                JSON.stringify({ error: 'Invalid credentials' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch (error) {
        console.error('Error processing authentication request:', error);
        return new Response(
            JSON.stringify({ error: 'Error processing request' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
