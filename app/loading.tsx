import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner width={40} height={40} />
    </div>
  );
}
