"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface BioPopoverProps {
  bio?: string[];
  education?: string[];
  philosophy?: string[];
  specializations?: string[];
}

export default function BioPopover({
  bio,
  education,
  philosophy,
  specializations,
}: BioPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">View</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="">
        {(!bio?.length ||
          !education?.length ||
          !philosophy?.length ||
          !specializations?.length) && <p>No bio yet.</p>}
        {bio?.map((paragraph, index) => (
          <p key={index} className="pb-4">
            {paragraph}
          </p>
        ))}
        {education?.map((paragraph, index) => (
          <p key={index} className="pb-4">
            {paragraph}
          </p>
        ))}
        {philosophy?.map((paragraph, index) => (
          <p key={index} className="pb-4">
            {paragraph}
          </p>
        ))}
        {specializations?.map((paragraph, index) => (
          <p key={index} className="pb-0">
            {paragraph}
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
}
