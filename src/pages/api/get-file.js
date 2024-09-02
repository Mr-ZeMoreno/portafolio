// src/pages/api/get-file.ts

import { getFile, getAudioUrl } from '../../lib/s3Client.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define la ruta al archivo .env dos niveles arriba
config({ path: path.resolve(__dirname, "../../../.env") });

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
        return new Response(JSON.stringify({ error: 'No fileName provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const audioUrl = getAudioUrl(BUCKET_NAME, fileName);
        return new Response(JSON.stringify({ url: audioUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener el archivo' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
