"use client";
import Image from "next/image";
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
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-950">
      <nav>
        <Container className="flex justify-between items-center py-3 border-b border-gray-800">
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
              <Link className="flex items-center gap-1.5" href="/login">
                Login
                <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="group transition-all hover:scale-105 duration-300 ease-in-out"
            >
              <Link className="flex items-center gap-1.5" href="/register">
                Sign up
                <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
              </Link>
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
              <XMarkIcon className="text-gray-50 h-8 w-8" />
            ) : (
              <Bars2Icon className="text-gray-50 h-8 w-8" />
            )}
          </Button>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="fixed top-[60px] w-full h-full z-10 bg-gray-950 overflow-hidden left-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
              >
                <Container className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full py-8 text-lg"
                  >
                    <Link className="flex items-center gap-1.5" href="/login">
                      Login
                      <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="group transition-all hover:scale-105 duration-300 ease-in-out w-full py-8 text-lg"
                  >
                    <Link
                      className="flex items-center gap-1.5"
                      href="/register"
                    >
                      Sign up
                      <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                    </Link>
                  </Button>
                </Container>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </nav>
    </header>
  );
}
