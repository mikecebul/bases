import { icons } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideProps } from "lucide-react";
import { object } from "zod";

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const IconSelect = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];
  // const iconNames = object.keys(icons) as (keyof typeof icons)[]
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an Icon" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="overflow-y-auto max-h-[30rem]">
          {/* {iconNames.map((icon) => (
            <SelectItem key={icon} value={icon}>
              <div className="flex items-center">
                <p>{icon}</p>
                <LucideIcon name={icon} />
              </div>
            </SelectItem>
          ))} */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IconSelect;
