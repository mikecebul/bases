import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col px-4 py-16 lg:py-24 2xl:container md:px-8 2xl:px-0 xl:items-center xl:text-center">
      <div className="max-w-2xl mb-16 xl:mb-24">
        <p className="text-base font-semibold leading-7 text-brand">ADHD</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Resources for Family Education with ADHD
        </h1>
      </div>
      <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-16">
        {siteConfig.ADHD.map((item) => (
          <Link key={item.title} href={item.href} className="" target="_blank">
            <Card className="px-8 py-8 shadow bg-accent/60 hover:bg-accent">
              <CardContent className="w-full h-full p-0 m-0 overflow-hidden">
                <Image
                  src="/adhd.jpg"
                  alt="Child yelling."
                  width={1920}
                  height={1080}
                  className="transition-transform duration-300 ease-in-out rounded-md hover:scale-105"
                />
              </CardContent>
              <CardHeader className="p-0 pt-4 text-left">
                {item.title}
              </CardHeader>
              <CardDescription className="p-0 text-left">
                {item.description}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
