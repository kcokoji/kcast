"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div>
      <h1
        className=" text-2xl font-bold md:text-4xl tracking-tight"
        // initial={{ y: "100%", opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // exit={{ y: "100%", opacity: 0 }}
        // transition={{
        //   delay: 0.2,
        //   duration: 0.8,
        //   ease: "easeInOut",
        // }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
