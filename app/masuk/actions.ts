"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 🚀 Sign In Action
export const signInAction = async (formData: FormData) => {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }


  revalidatePath('/', 'layout')
  redirect(`/admin`)
};

// 🚀 Sign Out Action
export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // ✅ Redirect after signing out
  return redirect("/masuk");
};
