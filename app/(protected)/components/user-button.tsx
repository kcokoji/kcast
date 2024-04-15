"use client";

import {
  UserIcon,
  Package2Icon,
  LogOutIcon,
  MenuSquareIcon,
  LayoutDashboard,
} from "lucide-react";

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

interface Props {
  user: User;
}

export const UserButton = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url || ""} />
          <AvatarFallback className="bg-primary">
            <UserIcon className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/profile">
          <DropdownMenuItem>
            <UserIcon className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/menus">
          <DropdownMenuItem>
            <MenuSquareIcon className="h-4 w-4 mr-2" />
            Menu
          </DropdownMenuItem>
        </Link>
        <Link href="/orders">
          <DropdownMenuItem>
            <Package2Icon className="h-4 w-4 mr-2" />
            Orders
          </DropdownMenuItem>
        </Link>

        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
