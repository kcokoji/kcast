"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  isInView: boolean;
  className?: string;
}

export default function P({ title, isInView, className }: HeaderProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 100 }}
      animate={isInView && { opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={cn(
        "max-w-3xl text-muted-foreground text-center  text-base leading-relaxed md:text-xl md:leading-relaxed",
        className,
      )}
    >
      {title}
    </motion.p>
  );
}
