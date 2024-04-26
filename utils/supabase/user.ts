import { redirect } from "next/navigation";
import { createClient } from "./server";
export const getUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return data.user;
};
