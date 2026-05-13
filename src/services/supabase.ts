/**
 * Capa de servicios — cliente Supabase (pendiente de configuración).
 *
 * Pasos sugeridos:
 * 1. `npm install @supabase/supabase-js`
 * 2. Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 * 3. Crear `src/services/supabase/browser.ts` y `server.ts` según necesites RSC o cliente.
 *
 * No importes aquí `@supabase/supabase-js` hasta instalar el paquete para evitar errores de build.
 */
export const isSupabaseConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
