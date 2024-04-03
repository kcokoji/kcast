"use client";
import Image from "next/image";
import Logo from "public/img/logo.svg";
import SoundWaves from "public/img/sound-waves.svg";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowRightCircleIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Container from "./container";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <nav className="z-50 relative">
      <Container className=" flex justify-between items-center py-3  border-b border-gray-800">
        <Link href="/" className="flex items-center select-none gap-1">
          <Image
            src={SoundWaves}
            alt="Kcast logo"
            width={40}
            height={40}
            quality={100}
          />
          <h1 className="bg-gradient-to-br from-white to-gray-300 bg-clip-text text-xl font-semibold leading-tight text-transparent sm:text-2xl sm:leading-tight md:leading-tight">
            Kcast
          </h1>
        </Link>
        <div className="lg:flex items-center gap-2 hidden">
          <Button variant="secondary">
            Login
            <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            className="group transition-all hover:scale-105 duration-300 ease-in-out"
          >
            Sign up
            <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
          </Button>
        </div>
        <Button
          size="icon"
          variant="link"
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <XMarkIcon className="text-white h-8 w-8" />
          ) : (
            <Bars2Icon className="text-white h-8 w-8" />
          )}
        </Button>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed top-[60px] left-0 w-full h-fit  z-10 bg-white"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
            >
              <div className="text-black text-2xl">Hello</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}
