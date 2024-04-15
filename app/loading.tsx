import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader className="h-8 w-8 lg:h-9 lg:w-9 text-primary animate-spin" />
    </div>
  );
}
