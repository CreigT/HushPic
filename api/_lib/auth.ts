import type { IncomingMessage } from 'node:http';
import { adminAuth } from './firebaseAdmin';

export async function requireUser(req: IncomingMessage) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) throw Object.assign(new Error('Authentication required.'), { statusCode: 401 });

  try {
    return await adminAuth().verifyIdToken(token, true);
  } catch {
    throw Object.assign(new Error('Invalid or expired session.'), { statusCode: 401 });
  }
}
