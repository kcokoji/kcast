"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FormWrapper from "./form-wrapper";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function Verification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  if (!email) {
    router.push("/");
  }

  const resend = () => {
    console.log("here");

    const supabase = createClient();
    if (!email) {
      toast.error("Email is not available");
    }

    try {
      supabase.auth.resend({
        type: "signup",
        email: email!,
      });
      toast.success("Email sent");
    } catch (err) {
      toast.error("Oops,Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <FormWrapper title="Thanks for registering!">
        <div className=" p-3 rounded-md flex items-center gap-x-2 text-xl text-center">
          <p>
            We have sent a verification link to
            <span className="font-semibold inline">{email}</span>
            Click the link in the email to verify your account and setup your
            profile.
          </p>
        </div>
        <div className="flex justify-center items-center">
          Didn&apos;t get the email?
          <Button onClick={() => resend()} variant="link">
            Click to resend
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}
