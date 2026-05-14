import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/services/supabase/config";

/**
 * Cliente anónimo para lecturas públicas del catálogo (tabla `products`).
 * No usa `cookies()`: válido en `generateStaticParams`, `next build` y cualquier RSC.
 * Para flujos que dependan de sesión/cookies, usa `getSupabaseServerClient`.
 */
let catalogClient: SupabaseClient | null = null;

export function getSupabaseCatalogClient(): SupabaseClient {
  if (catalogClient) return catalogClient;
  const { url, anonKey } = getSupabaseEnv();
  catalogClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return catalogClient;
}
