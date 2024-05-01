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

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { XIcon } from "lucide-react";

export default function Navbar() {
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
            <h1 className="bg-gradient-to-br from-white to-gray-300 bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-2xl sm:leading-tight md:leading-tight">
              Kcast
            </h1>
          </Link>
          <div className="lg:flex hidden">
            <div className="lg:flex items-center gap-2">
              <Button variant="secondary" asChild>
                <Link className="flex items-center gap-1.5" href="/login">
                  Login
                  <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                </Link>
              </Button>
              <Button
                className="group transition-all hover:scale-105 duration-300 ease-in-out"
                asChild
              >
                <Link className="flex items-center gap-1.5" href="/register">
                  Sign up
                  <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="link" className="lg:hidden">
                <span className="sr-only">Toggle menu</span>

                <Bars2Icon className=" h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className=" sm:max-w-md border-none bg-gray-950"
            >
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 "
                >
                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <XIcon className="h-6 w-6 text-border" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                  <Image
                    src={SoundWaves}
                    alt="Kcast logo"
                    width={40}
                    height={40}
                  />
                  <h1 className="sr-only">Kcast</h1>
                </Link>

                <div className="w-full pt-6 flex items-center flex-col gap-4">
                  <Button variant="secondary" size="lg" asChild>
                    <Link
                      className="flex items-center gap-1.5 w-full"
                      href="/login"
                    >
                      Login
                      <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    className="group transition-all hover:scale-105 duration-300 ease-in-out w-full"
                    asChild
                    size="lg"
                  >
                    <Link
                      className="flex items-center gap-1.5"
                      href="/register"
                    >
                      Sign up
                      <ArrowRightCircleIcon className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </Container>
      </nav>
    </header>
  );
}
