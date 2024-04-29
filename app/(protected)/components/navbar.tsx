"use client";
import Image from "next/image";
import SoundWaves from "public/img/sound-waves.svg";

import Container from "@/components/container";

import Link from "next/link";

import { UserButton } from "./user-button";
import { User } from "@supabase/supabase-js";
import Notifications from "./notifications";

interface Props {
  user: User | null;
}

export default function PodcastNav({ user }: Props) {
  return (
    <header className="border border-b bg-white w-full">
      <nav>
        <Container className="flex justify-between items-center py-0">
          <Link href="/" className="flex items-center select-none gap-1">
            <Image
              src={SoundWaves}
              alt="Kcast logo"
              width={60}
              height={60}
              quality={100}
            />
          </Link>
          <div className="flex items-center gap-4 justify-center">
            <Notifications />
            <UserButton user={user} />
          </div>
        </Container>
      </nav>
    </header>
  );
}
