"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRightCircleIcon,
  BanknotesIcon,
  Bars2Icon,
  ChevronDownIcon,
  CogIcon,
  FolderIcon,
  HomeIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();

  const navigation = [
    {
      name: "Dashboard",
      href: `/podcasts/${params.podcastId}`,
      icon: <HomeIcon className="h-5 w-5" />,
      active: pathname === `/podcasts/${params.podcastId}`,
    },
    {
      name: "Episodes",
      href: `/podcasts/${params.podcastId}/episodes`,
      icon: <MicrophoneIcon className="h-5 w-5" />,
      active: pathname.startsWith(`/podcasts/${params.podcastId}/episodes`),
    },
    {
      name: "Media manager",
      href: `/podcasts/${params.podcastId}/media-manager`,
      icon: <FolderIcon className="h-5 w-5" />,
      active: pathname === `/podcasts/${params.podcastId}/media-manager`,
    },
    {
      name: "Analytics",
      href: `/podcasts/${params.podcastId}/analytics`,
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
      active: pathname === `/podcasts/${params.podcastId}/analytics`,
    },

    {
      name: "Settings",
      href: `/podcasts/${params.podcastId}/settings`,
      icon: <CogIcon className="h-5 w-5" />,
      active: pathname === `/podcasts/${params.podcastId}/settings`,
    },
  ];

  return (
    <header className="bg-white inset-x-0 top-0 z-50 sticky  lg:border-b">
      <div className=" flex items-center justify-center p-2 lg:px-8 gap-1  overflow-x-scroll lg:overflow-x-hidden scroll-smooth whitespace-nowrap">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.active ? "default" : "ghost"}
            asChild
          >
            <Link
              className="flex justify-center items-center gap-1"
              href={item.href}
            >
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="link" className="hidden">
            <ChevronDownIcon className="h-6 w-6" />
            <p>Menu</p>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className=" sm:max-w-md">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 "
            >
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <XMarkIcon className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </SheetClose>
              <Image
                src="/img/sound-waves.svg"
                alt="Kcast logo"
                width={40}
                height={40}
              />
              <h1 className="sr-only">Kcast</h1>
            </Link>

            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                asChild
              >
                <Link
                  className="flex justify-center items-center gap-1"
                  href={item.href}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
