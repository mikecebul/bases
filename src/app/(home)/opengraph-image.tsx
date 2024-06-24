/* eslint-disable @next/next/no-img-element */
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
      <div tw="flex flex-col">
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
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
