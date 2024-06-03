import { icons } from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}
const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      color={color}
      size={size}
      aria-hidden="true"
    />
  );
};

export default Icon;
