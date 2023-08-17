"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface BioPopoverProps {
  bio: string[];
}

export default function BioPopover({ bio }: BioPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">View</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="">
        {bio.map((paragraph, index) => (
          <p key={index} className="pb-4">
            {paragraph}
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
}
