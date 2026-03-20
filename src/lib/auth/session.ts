/**
 * AUTENTICAÇÃO - Sistema simples com JWT
 * Admin protegido por senha + cookie de sessão
 */

import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'studio-amendola-noivas-secret-2026-saas'
);

// Em produção, use variáveis de ambiente!
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'amendola2026',
};

export const COOKIE_NAME = 'admin_session';

export async function signToken(payload: { username: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { username: string };
  } catch {
    return null;
  }
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export async function getSessionFromCookie(cookieValue: string | undefined): Promise<{ username: string } | null> {
  if (!cookieValue) return null;
  return verifyToken(cookieValue);
}
