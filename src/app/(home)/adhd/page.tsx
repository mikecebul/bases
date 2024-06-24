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
      <div className="mb-16 xl:mb-24 max-w-2xl">
        <p className="text-base font-semibold leading-7 text-brand">ADHD</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Resources for Family Education with ADHD
        </h1>
      </div>
      <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-16">
        {siteConfig.ADHD.map((item) => (
          <Link key={item.title} href={item.href} className="">
            <Card className="px-4 py-10">
              <CardContent>
                <Image
                  src="/adhd.jpg"
                  alt="Child yelling."
                  width={1920}
                  height={1080}
                  className="object-cover"
                />
              </CardContent>
              <CardHeader className="text-left px-6 py-0">
                {item.title}
              </CardHeader>
              <CardDescription className="text-left px-6">
                {item.description}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
