"use client";
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  useInView,
} from "framer-motion";
import Container from "./container";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import heroImage from "public/img/hero-image.jpg";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import H1 from "./ui/typography/h1";
import { useRef } from "react";
import Link from "next/link";

const COLORS_TOP = ["#874d9d"];

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const color = useMotionValue(COLORS_TOP[0]);

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 2px 18px ${color}`;

  return (
    <Container className="relative py-32 grid grid-cols-1 lg:grid-cols-2 bg-gray-950 px-4 text-gray-200 gap-6">
      <div
        ref={ref}
        className="relative  flex flex-col lg:items-start items-center justify-center gap-2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView && { opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Badge variant="secondary" className="font-medium w-fit">
            Beta Launch Now Live! 🚀
          </Badge>
        </motion.div>
        <H1 title=" Start your podcasting journey with us" />
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={isInView && { opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="my-6 max-w-xl text-center lg:text-start text-base leading-relaxed tracking-wide md:text-lg md:leading-relaxed"
        >
          Unleash your voice. Inspire your audience
          <br /> Share your story.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView && { opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Button
            size="lg"
            className="group transition-all hover:scale-105 duration-300 ease-in-out"
            asChild
          >
            <Link className="flex items-center gap-1.5" href="/register">
              Get started for free
              <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView && { opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" rounded-md overflow-hidden bg-muted-foreground/80 select-none"
      >
        <AspectRatio ratio={1 / 1}>
          <Image
            src={heroImage}
            alt="Hero Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover"
            quality={100}
            priority
          />
        </AspectRatio>
      </motion.div>
    </Container>
  );
};
