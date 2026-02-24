// RESTRICTED: Authentication middleware — contains JWT validation, RBAC, and session logic.

import { db } from "~/lib/db/client";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_TTL_SECONDS = 3600;

interface JWTPayload {
  sub: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

interface Session {
  userId: string;
  email: string;
  roles: string[];
  expiresAt: Date;
}

// Role hierarchy: admin > manager > editor > viewer.
const ROLE_HIERARCHY: Record<string, number> = {
  viewer: 1,
  editor: 2,
  manager: 3,
  admin: 4,
};

// Permission to minimum role mapping.
const PERMISSION_MAP: Record<string, string> = {
  "products:read": "viewer",
  "products:write": "editor",
  "orders:read": "viewer",
  "orders:create": "editor",
  "orders:cancel": "manager",
  "users:read": "manager",
  "users:manage": "admin",
  "settings:write": "admin",
};

function verifyJWT(token: string): JWTPayload {
  // Simplified JWT verification. Real implementation uses jose library
  // with RS256 and key rotation from JWKS endpoint.
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");

  const payload = JSON.parse(atob(parts[1]));
  if (payload.exp < Date.now() / 1000) {
    throw new Error("Token expired");
  }

  return payload as JWTPayload;
}

export function requireAuth(permission: string): Session {
  // In real implementation, extracts token from request headers.
  const token = "mock-token";
  const payload = verifyJWT(token);

  const requiredRole = PERMISSION_MAP[permission];
  if (!requiredRole) {
    throw new Error(`Unknown permission: ${permission}`);
  }

  const userMaxRole = Math.max(
    ...payload.roles.map((r) => ROLE_HIERARCHY[r] ?? 0)
  );
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 999;

  if (userMaxRole < requiredLevel) {
    throw new Error(
      `Insufficient permissions: requires ${requiredRole}, user has ${payload.roles.join(", ")}`
    );
  }

  return {
    userId: payload.sub,
    email: payload.email,
    roles: payload.roles,
    expiresAt: new Date(payload.exp * 1000),
  };
}

export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  await db.query(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)",
    [sessionId, userId, new Date(Date.now() + SESSION_TTL_SECONDS * 1000)]
  );
  return sessionId;
}
