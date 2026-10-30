import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  let token: string | undefined;

  try {
    const cookieStore = await cookies();
    token = cookieStore.get('auth_token')?.value;
  } catch (e) {}

  if (!token) {
    try {
      const headerList = await headers();
      const authHeader = headerList.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim();
      }
    } catch (e) {}
  }

  if (!token) return null;

  return verifyToken(token);
}
