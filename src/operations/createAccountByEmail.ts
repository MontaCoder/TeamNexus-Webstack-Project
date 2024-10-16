'use server';

import { SBServerClient } from "@/sb/SBServer";

export async function createAccountByEmail({ email }: { email: string }) {
  try {
    const supabase = await SBServerClient();

    const response = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_CURRENT_ORIGIN,
      },
    });

    return JSON.stringify(response);
  } catch (error) {
    console.error('Error creating account by email:', error);
    throw new Error('Failed to create account. Please try again later.');
  }
}