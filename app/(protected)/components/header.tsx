"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <motion.h1
      className=" text-2xl font-bold md:text-4xl tracking-tight"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {title}
    </motion.h1>
  );
}
