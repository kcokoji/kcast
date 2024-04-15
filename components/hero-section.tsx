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
import P from "./ui/typography/p";

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Container className="relative py-[7rem] grid grid-cols-1 lg:grid-cols-2 bg-gray-950 px-4 text-gray-200 gap-4">
      <div
        ref={ref}
        className="relative  flex flex-col lg:items-start items-center gap-6 py-10"
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
        <H1
          isInView={isInView}
          title=" Start your podcasting journey with us"
        />
        <P
          title="Amplify your message . Your stories, your platform Let's turn your ideas into impactful conversations."
          isInView={isInView}
          className="lg:text-start"
        />
        <motion.div
          className="mt-6"
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
        className="flex justify-center items-center"
      >
        {/* <AspectRatio ratio={1 / 1}> */}
        <Image
          src={heroImage}
          alt="Hero Image"
          width={700}
          height={700}
          className="rounded-md bg-muted-foreground/80 select-none"
          quality={100}
          priority
        />
        {/* </AspectRatio> */}
      </motion.div>
    </Container>
  );
};
