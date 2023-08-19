"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { lucideIcons, Icons } from "@/components/icons";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedIcon = lucideIcons.find((icon) => icon.label === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedIcon ? (
            <>
              <selectedIcon.component className="mr-2 h-4 w-4" />
              {selectedIcon.label}
            </>
          ) : (
            "Select Icon..."
          )}
          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Icon..." />
          <CommandEmpty>No Icon found.</CommandEmpty>
          <CommandGroup>
            {lucideIcons.map((icon, index) => {
              const IconComponent = icon.component;
              return (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setValue(icon.label === value ? "" : icon.label);
                    setOpen(false);
                  }}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === icon.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {icon.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
