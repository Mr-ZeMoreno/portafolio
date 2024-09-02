import AWS from 'aws-sdk';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define la ruta al archivo .env dos niveles arriba
config({ path: path.resolve(__dirname, "../../.env") });

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function listFiles(bucketName) {
    const params = {
        Bucket: bucketName,
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        return data.Contents;
    } catch (error) {
        console.error('Error al listar archivos:', error);
        throw error;
    }
}

export async function getFile(bucketName, fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body;
    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        throw error;
    }
}

// Generar una URL presignada para el archivo de audio
export function getAudioUrl(bucketName, fileName, expiresIn = 60) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: expiresIn, // Tiempo en segundos que la URL será válida
    };

    try {
        const url = s3.getSignedUrl('getObject', params);
        return url;
    } catch (error) {
        console.error('Error al generar la URL presignada:', error);
        throw error;
    }
}