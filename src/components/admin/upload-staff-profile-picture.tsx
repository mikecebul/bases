"use client";

import { UploadButton } from "@/lib/uploadthing";
import { StaffMember, BoardMember } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../icons";

type UploadProfilePictureProps = {
  person: StaffMember;
};

export default function UploadStaffProfilePicture({
  person,
}: UploadProfilePictureProps) {
  const [imageUrl, setImageUrl] = useState(person.imageUrl);

  const updateImageWithURL = async ({ url }: { url: string | undefined }) => {
    if (!url) return;
    try {
      const response = await fetch("/api/staff/update-profile-picture", {
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
    <div className="flex flex-col items-start py-16">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={imageUrl || undefined} alt="profile of staff member." />
          <AvatarFallback className="">
            <Icons.user className="w-16 h-16 rounded-full" />
          </AvatarFallback>
        </Avatar>
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
