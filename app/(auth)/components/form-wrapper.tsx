import Image from "next/image";
import SoundWaves from "public/img/sound-waves.svg";
import Link from "next/link";
import GoogleButton from "./google-button";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  socialButton?: boolean;
  loading?: boolean | undefined;
}

export default function FormWrapper({
  title,
  description,
  children,
  socialButton,
  loading,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div className="mb-6 flex items-center justify-center flex-col gap-2">
        <Button size="icon" variant="ghost" asChild>
          <Link href="/" className="select-none gap-1 w-fit">
            <Image
              src={SoundWaves}
              alt="Kcast logo"
              width={40}
              height={40}
              quality={100}
            />
          </Link>
        </Button>
        <h1 className=" bg-clip-text text-balance text-[#0A0A0A] text-2xl font-semibold leading-tight sm:text-3xl sm:leading-tight md:leading-tight">
          {title}
        </h1>
        {description && (
          <h2 className="text-muted-foreground">{description}</h2>
        )}
      </div>
      <div className="mb-8">
        {socialButton && (
          <div>
            <div className="">
              <GoogleButton loading={loading} />
            </div>

            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
