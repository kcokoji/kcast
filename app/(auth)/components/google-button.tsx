import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Google from "public/img/google.svg";

export default function GoogleButton() {
  return (
    <div className="">
      <div>
        <Button
          variant="secondary"
          size="lg"
          className=" inline-flex w-full  gap-x-3 rounded-lg p-3 text-base font-medium text-white shadow-sm "
        >
          <Image
            alt=""
            loading="lazy"
            width="18"
            height="18"
            decoding="async"
            src={Google}
            className="h-5 w-5"
          />
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}
