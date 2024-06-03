import { OurFileRouter } from "@/app/api/_uploadthing/core";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone } =
  generateComponents<OurFileRouter>();
