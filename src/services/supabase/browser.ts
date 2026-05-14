"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/services/supabase/config";
import {
  altuSupabaseDebugBrowserClientOnce,
  altuSupabaseDebugEnvOnce,
} from "@/services/supabase/debug";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;
  altuSupabaseDebugEnvOnce();
  const { url, anonKey } = getSupabaseEnv();
  altuSupabaseDebugBrowserClientOnce();
  browserClient = createBrowserClient(url, anonKey);
  return browserClient;
}
