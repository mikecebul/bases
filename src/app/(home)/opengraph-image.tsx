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
      <div tw="flex flex-col p-4 text-left">
        <img
          src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/BASES_Flowers.png`}
          alt="Sign outside the BASES office."
          width={1200}
          height={630}
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div tw="flex flex-col pt-4">
          <p
            tw="text-base font-semibold leading-7"
            style={{ color: "hsl(237, 80%, 38%)" }}
          >
            www.BASESmi.org
          </p>
          <h2 tw="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Substance Use and Mental Health Counseling
          </h2>
          <p
            tw="mt-6 text-base lg:text-lg lg:leading-8"
            style={{ color: "hsl(237, 80%, 38%)" }}
          >
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
