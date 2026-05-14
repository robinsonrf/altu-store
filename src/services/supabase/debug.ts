/**
 * Logs de diagnóstico para validar la conexión Next.js ↔ Supabase.
 * Activar en `.env.local`: ALTU_DEBUG_SUPABASE=1
 * (opcional en cliente: NEXT_PUBLIC_ALTU_DEBUG_SUPABASE=1)
 */

const serverFlag = process.env.ALTU_DEBUG_SUPABASE === "1";
const publicFlag = process.env.NEXT_PUBLIC_ALTU_DEBUG_SUPABASE === "1";

export function isAltuSupabaseDebugEnabled(): boolean {
  return serverFlag || publicFlag;
}

function safeUrlHost(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    return new URL(raw.trim()).hostname;
  } catch {
    return "(URL inválida)";
  }
}

export function getSupabaseEnvDebugSummary(): {
  hasUrl: boolean;
  hasAnonKey: boolean;
  urlHost: string | null;
  anonKeyLength: number;
  anonKeyPrefix: string;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const trimmedKey = key?.trim() ?? "";
  return {
    hasUrl: Boolean(url?.trim()),
    hasAnonKey: Boolean(trimmedKey),
    urlHost: safeUrlHost(url),
    anonKeyLength: trimmedKey.length,
    anonKeyPrefix: trimmedKey.slice(0, 14),
  };
}

export function altuSupabaseDebug(
  step: string,
  detail?: Record<string, unknown>
): void {
  if (!isAltuSupabaseDebugEnabled()) return;
  const payload = detail ? { ...detail } : {};
  console.info(`[ALTU Supabase] ${step}`, Object.keys(payload).length ? payload : "");
}

let envSnapshotLogged = false;

export function altuSupabaseDebugEnvOnce(): void {
  if (!isAltuSupabaseDebugEnabled() || envSnapshotLogged) return;
  envSnapshotLogged = true;
  altuSupabaseDebug("variables de entorno (snapshot)", getSupabaseEnvDebugSummary());
}

let serverClientLogged = false;

export function altuSupabaseDebugServerClientOnce(): void {
  if (!isAltuSupabaseDebugEnabled() || serverClientLogged) return;
  serverClientLogged = true;
  altuSupabaseDebug("createServerClient (SSR) inicializado");
}

let browserClientLogged = false;

export function altuSupabaseDebugBrowserClientOnce(): void {
  if (!isAltuSupabaseDebugEnabled() || browserClientLogged) return;
  browserClientLogged = true;
  altuSupabaseDebug("createBrowserClient inicializado");
}
