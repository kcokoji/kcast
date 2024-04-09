"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
interface Props {
  title: string;
}
export default function H2({ title }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      exit={{ y: "100%", opacity: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="max-w-3xl text-center  bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-6xl md:leading-tight"
    >
      {title}
    </motion.h2>
  );
}
