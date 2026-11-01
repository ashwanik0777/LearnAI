// Shared JWT secret loader (used by both proxy.ts and session.ts).
// There is intentionally no fallback: a hardcoded default would let anyone
// who can read the source forge admin tokens.
let cachedSecret: Uint8Array | null = null;

export function getJwtSecret(): Uint8Array {
  if (cachedSecret) return cachedSecret;

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set to a random string of at least 32 characters");
  }

  cachedSecret = new TextEncoder().encode(secret);
  return cachedSecret;
}

export const JWT_ALGORITHM = "HS256";
