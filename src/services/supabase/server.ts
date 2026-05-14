import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/services/supabase/config";
import {
  altuSupabaseDebugEnvOnce,
  altuSupabaseDebugServerClientOnce,
} from "@/services/supabase/debug";

export async function getSupabaseServerClient(): Promise<SupabaseClient> {
  altuSupabaseDebugEnvOnce();
  const { url, anonKey } = getSupabaseEnv();
  altuSupabaseDebugServerClientOnce();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll puede ejecutarse desde RSC; en ese caso ignoramos escritura.
        }
      },
    },
  });
}
