"use client";

import { UploadButton } from "@/lib/uploadthing";
import { BoardMember } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type UploadBoardProfilePictureProps = {
  person: BoardMember;
};

export default function UploadBoardProfilePicture({
  person,
}: UploadBoardProfilePictureProps) {
  const [imageUrl, setImageUrl] = useState(person.imageUrl);

  const updateImageWithURL = async ({ url }: { url: string | undefined }) => {
    if (!url) return;
    try {
      const response = await fetch("/api/board/update-profile-picture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          id: person.id,
        }),
      });

      setImageUrl(url);

      try {
        const invalidateRes = await fetch(
          `/api/revalidate?path=/team&secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}`
        );

        if (!invalidateRes.ok) {
          throw new Error("Error invalidating cache.");
        }
      } catch (err) {
        console.error(err);
      }

      if (!response.ok) {
        throw new Error("Error updating profile picture.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-end justify-start pb-8 gap-x-48">
      <div className="">
        <p className="font-semibold text-brand">Editing</p>
        <p className="text-xl font-semibold">{person.name}</p>
      </div>
      <div className="flex flex-col items-center gap-4 justifyu-center">
        <Image
          src={imageUrl}
          alt="profile of staff member."
          width={250}
          height={250}
          className="w-24 rounded-full"
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            const url = res?.[0].url;
            updateImageWithURL({ url });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
