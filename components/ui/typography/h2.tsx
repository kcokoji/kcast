"use client";
import { motion } from "framer-motion";
interface Props {
  title: string;
}
export default function H2({ title }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="max-w-3xl text-center  bg-gradient-to-br from-white to-gray-400 bg-clip-text text-2xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
    >
      {title}
    </motion.h1>
  );
}
