// src/pages/api/list-files.ts

import { listFiles } from '../../lib/s3Client.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define la ruta al archivo .env dos niveles arriba
config({ path: path.resolve(__dirname, "../../../.env") });

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
console.log(BUCKET_NAME)

export async function GET() {


    try {
        const files = await listFiles(BUCKET_NAME);
        return new Response(JSON.stringify(files), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al listar archivos:', error);
        return new Response(JSON.stringify({ error: 'Error al listar archivos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
