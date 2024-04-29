"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React from "react";

export default function CreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Podcast</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-base lg:text-xl">
            Create Podcasts
          </DialogTitle>
          <DialogDescription>
            Create a new podcast or import an existing one.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2">
          <Link
            className="group flex h-full flex-col items-center text-center justify-start rounded-md border border-gray-200 bg-white p-6 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            href="/new-podcast/create"
          >
            <h3 className="text-base lg:text-lg font-medium">
              Create New Podcast
            </h3>
            <p className="mt-2 lg:text-sm text-gray-500 dark:text-gray-400">
              Create a new podcast from scratch.
            </p>
          </Link>
          <Link
            className="group flex h-full flex-col items-center text-center justify-start rounded-md border border-gray-200 bg-white p-6 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            href="/new-podcast/import"
          >
            <h3 className="text-lg font-medium">Import Podcast</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Import an existing podcast.
            </p>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
