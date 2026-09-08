export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
    }
  }
}
