import { Button } from "@/components/ui/button";
import {
  BanknotesIcon,
  Cog6ToothIcon,
  CogIcon,
  HomeIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
export default function Navbar() {
  const navigation = [
    {
      name: "Dashboard",
      href: "/podcasts",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Episodes",
      href: "/products",
      icon: <MicrophoneIcon className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/products",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    {
      name: "Monetization",
      href: "/products",
      icon: <BanknotesIcon className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/products",
      icon: <CogIcon className="h-5 w-5" />,
    },
  ];
  return (
    <header className="bg-white inset-x-0 top-0 z-50 sticky  lg:border-b">
      <div className="lg:flex hidden items-center justify-center p-2 lg:px-8">
        {navigation.map((item) => (
          <Button key={item.name} variant="ghost">
            <Link
              href={item.href}
              className="flex justify-center items-center gap-1"
            >
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </header>
  );
}
