// generateToken.js
import jwt from 'jsonwebtoken';

const token = jwt.sign({ user: 'authorizedUser' }, 'your_secret_key', { expiresIn: '1h' });
console.log('Generated Token:', token);
