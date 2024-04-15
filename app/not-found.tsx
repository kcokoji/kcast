import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="py-8 space-y-4  flex items-center justify-center flex-col h-screen">
        <h1 className="text-2xl lg:text-4xl font-bold">404</h1>
        <p className="text-xl text-gray-400">
          Could not find requested resource
        </p>
        <Button size="lg" asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}
