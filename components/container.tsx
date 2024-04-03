import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={cn(" px-5 md:px-20 py-20", className)}>{children}</div>
  );
}
