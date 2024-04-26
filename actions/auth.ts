"use server";

import { redirect } from "next/navigation";
import {
  LoginSchema,
  RegisterSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas/auth";

import * as z from "zod";

import { createClient } from "@/utils/supabase/server";

import { getURL } from "@/utils/supabase/url";

const url = getURL();

export async function signIn(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) {
  const supabase = createClient();
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const user = validatedFields.data;

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    return { error: error.message };
  }
  if (callbackUrl) {
    redirect(callbackUrl);
  }
  redirect("/podcasts");
}

export async function newPassword(values: z.infer<typeof NewPasswordSchema>) {
  const supabase = createClient();
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { confirmPassword } = validatedFields.data;

  const { error } = await supabase.auth.updateUser({
    password: confirmPassword,
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/podcasts");
}

export async function reset(values: z.infer<typeof ResetPasswordSchema>) {
  try {
    const supabase = createClient();
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email } = validatedFields.data;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url}/api/auth/reset-password`,
    });

    if (error) {
      return { error: error.message };
    }
    return { success: `A link has been sent to your email ${email} ` };
  } catch (error) {
    console.error("Error in Reset:", error);
    return { error: "An unexpected error occurred during sending reset email" };
  }
}

// export async function updateName(values: z.infer<typeof UpdateNameSchema>) {
//   try {
//     const supabase = createClient();
//     const validatedFields = UpdateNameSchema.safeParse(values);

//     if (!validatedFields.success) {
//       return { error: "Invalid fields" };
//     }

//     const user = validatedFields.data;

//     const { error } = await supabase.auth.updateUser({
//       data: user,
//     });

//     if (error) {
//       return { error: error.message };
//     }
//     revalidatePath("/podcasts", "layout");
//     return { success: "Name Updated" };
//   } catch (error) {
//     console.error("Error in Update Name:", error);
//     return { error: "An unexpected error occurred during name update" };
//   }
// }
// export async function updateEmail(values: z.infer<typeof UpdateEmailSchema>) {
//   try {
//     const supabase = createClient();
//     const validatedFields = UpdateEmailSchema.safeParse(values);

//     if (!validatedFields.success) {
//       return { error: "Invalid fields" };
//     }

//     const user = validatedFields.data;

//     const { error } = await supabase.auth.updateUser({
//       email: user.email,
//     });

//     if (error) {
//       return { error: error.message };
//     }
//     revalidatePath("/podcasts", "layout");
//     return {
//       success: `A link has been sent to your email `,
//     };
//   } catch (error) {
//     console.error("Error in Update Email:", error);
//     return { error: "An unexpected error occurred during email update" };
//   }
// }

export async function register(values: z.infer<typeof RegisterSchema>) {
  const supabase = createClient();
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url}/api/auth/verification`,
      data: {
        name,
      },
    },
  });

  if (error) {
    console.log(error);

    return { error: error.message };
  }

  if (!(data.user?.identities && data.user?.identities.length > 0)) {
    return { error: "Already signed up, sign in instead?" };
  }

  redirect(`/verify?email=${data.user?.email}`);
}

export const logout = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  redirect("login");
};

export const google = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${url}api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }
  redirect(data.url);
};
export const verify = async (email: string | null) => {
  if (!email) {
    return { error: "Email is required" };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: email!,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: "Email sent" };
};
