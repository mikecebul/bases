"use client";

import { UploadButton } from "@/lib/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../icons";

type UploadProfilePictureProps = {
  imageUrl: string | undefined;
  setImageUrl: (url: string) => void;
};

export default function UploadProfilePicture({
  imageUrl,
  setImageUrl,
}: UploadProfilePictureProps) {
  return (
    <div className="flex items-end justify-start pb-8 gap-x-48">
      <div className="flex flex-col items-center gap-4 justify-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={imageUrl} alt="profile of team member." />
          <AvatarFallback className="">
            <Icons.user className="w-16 h-16 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            const url = res?.[0].url;
            if (url) {
              setImageUrl(url);
            }
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
