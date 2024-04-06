"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
interface Props {
  title: string;
}
export default function H1({ title }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      exit={{ y: "100%", opacity: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="max-w-3xl text-center lg:text-start bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
    >
      {title}
    </motion.h1>
  );
}
