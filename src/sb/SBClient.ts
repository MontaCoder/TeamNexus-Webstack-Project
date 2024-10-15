import { createBrowserClient } from "@supabase/ssr";

export const sbBrowserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);