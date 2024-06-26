"use client";

import { UserIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { LogoutButton } from "@/app/(auth)/components/logout-button";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { CogIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

interface Props {
  user: User | null;
}

export const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url || ""} />
          <AvatarFallback className="bg-primary">
            <UserIcon className="text-white p-2 w-full h-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-64" align="end">
        <DropdownMenuLabel className="tracking-wide font-medium text-muted-foreground">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/podcasts">
          <DropdownMenuItem className=" justify-between text-base font-medium">
            My Podcasts
            <MicrophoneIcon className="h-4 w-4" />
          </DropdownMenuItem>
        </Link>
        <Link href="/account">
          <DropdownMenuItem className=" justify-between text-base font-medium">
            Account Settings
            <CogIcon className="h-4 w-4" />
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem className=" justify-between text-base font-medium">
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
