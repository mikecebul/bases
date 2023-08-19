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
import { lucideIcons, Icons, renderIcon } from "@/components/icons";


export function IconComboBox({ icon, setIcon }: {icon: string, setIcon: (name: "icon", value: string) => void}) {
  const [open, setOpen] = useState(false);
  const selectedIcon = lucideIcons.find((item) => item.value === icon);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {!!selectedIcon ? renderIcon(icon, "small") : "Select Icon..."}
          {selectedIcon && selectedIcon.label}
          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Icon..." />
          <CommandEmpty>No Icon found.</CommandEmpty>
          <CommandGroup>
            {lucideIcons.map((item) => {
              const IconComponent = item.component;
              return (
                <CommandItem
                value={item.label}
                  key={item.value}
                  onSelect={() => {
                    setIcon("icon", item.value);
                    // setIcon(icon.value === value ? "" : icon.value);
                    setOpen(false);
                  }}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.value === icon ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
