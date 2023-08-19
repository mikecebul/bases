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

type IconComboBoxProps = {
  onChange?: (...event: any[]) => void;
  onBlur?: any;
  value: string;
  setIcon: (icon: string) => void;
  name?: string;
  ref?: any;
};
export function IconComboBox({ setIcon, value }: IconComboBoxProps) {
  const [open, setOpen] = useState(false);
  const selectedIcon = lucideIcons.find((icon) => icon.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {!!value ? renderIcon(value, "small") : "Select Icon..."}
          {selectedIcon && selectedIcon.label}
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
                    setIcon(icon.value === value ? "" : icon.value);
                    setOpen(false);
                  }}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === icon.value ? "opacity-100" : "opacity-0"
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
