"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col">
      <div className="py-8 space-y-4 h-screen flex items-center flex-col">
        <h1 className="text-2xl">505</h1>
        <p className="text-xl text-gray-400">Something went wrong</p>
        <div className="flex justify-center items-center gap-2">
          <Button
            size="lg"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
