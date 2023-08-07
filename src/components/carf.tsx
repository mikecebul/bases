import React from "react";
import { Icons } from "./icons";

export default function Carf() {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl gap-16 px-4 mx-auto my-16 sm:px-8 md:flex-row item-col">
      <Icons.carf className="w-48" />
      <p className="max-w-prose">
        BASES is proud to be accredited by CARF International Commission on
        Accreditation of Rehabilitation Facilities (CARF) International
        accreditation demonstrates a program’s quality, transparency and
        commitment to the satisfaction of the persons served. CARF International
        is an independent, non-profit accreditor of health and human services.
      </p>
    </div>
  );
}
