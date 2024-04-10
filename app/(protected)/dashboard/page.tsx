import { LogoutButton } from "@/app/(auth)/components/logout-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function DashboardPage() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  // console.log(user);

  return (
    <div>
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
}
