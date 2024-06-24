import Image from "next/image";
import { ImageResponse } from "next/og";

export const alt = "About BASES";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OGImage() {
  return new ImageResponse(
    (
      <div className="flex flex-col p-4 text-left">
        <Image
          src="/BASES_Flowers.png"
          alt="Sign outside the BASES office."
          width={1920}
          height={1080}
          className="object-cover"
        />
        <div className="flex flex-col pt-4">
          <p className="text-base font-semibold leading-7 text-brand">
            www.BASESmi.org
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Substance Use and Mental Health Counseling
          </h2>
          <p className="mt-6 text-md lg:text-lg lg:leading-8 text-muted-foreground">
            We bridge the gap to recovery, offering flexible and personalized
            services both in-person and via telehealth.
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
