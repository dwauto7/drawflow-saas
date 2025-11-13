// Fix(src/vite-env.d.ts): Manually define Vite environment variables types.
// The original `/// <reference types="vite/client" />` was causing an error because the type definition file could not be found.
// This is likely a TypeScript configuration issue. This manual definition provides the necessary types for `import.meta.env`
// to fix related errors in `src/lib/supabaseClient.ts` and the error in this file.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
