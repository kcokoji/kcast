import create from "public/img/create.svg";
import importSvg from "public/img/import.svg";
import Header from "../components/header";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";

export default function Component() {
  return (
    <Container className="flex flex-col items-center rounded  min-h-screen gap-4 py-10 text-center space-y-4 ">
      <div className="space-y-3">
        <Header title="  Welcome to Kcast Hosting" />
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          The easiest way to host your podcast. Start creating today.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 max-w-sm sm:max-w-2xl">
        <Link
          className="flex flex-col rounded-md items-center justify-center border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm gap-6 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/new-podcast/create"
        >
          <Image
            alt="Podcast Import image"
            className="aspect-square  overflow-hidden object-cover object-center"
            height={250}
            src={create}
            width={250}
          />
          <span className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
            Create New Podcast
          </span>
        </Link>
        <Link
          className="flex flex-col rounded-md items-center justify-center border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm gap-6 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="#"
        >
          <Image
            alt="Podcast Import image"
            className="aspect-square  overflow-hidden object-cover object-center"
            height={250}
            src={importSvg}
            width={250}
          />
          <span className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed dark:text-gray-400">
            Import Existing Podcast
          </span>
        </Link>
      </div>
    </Container>
  );
}
