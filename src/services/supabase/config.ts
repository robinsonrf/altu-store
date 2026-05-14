function readTrimmedEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const raw = process.env[name];
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    readTrimmedEnv("NEXT_PUBLIC_SUPABASE_URL") && readTrimmedEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}

export function getSupabaseEnv() {
  const url = readTrimmedEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readTrimmedEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    throw new Error(
      "Faltan variables de entorno de Supabase. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local (reinicia el servidor de desarrollo tras cambiarlas)."
    );
  }

  return {
    url,
    anonKey,
  };
}
