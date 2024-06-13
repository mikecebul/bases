import { icons } from "lucide-react";
import { LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
}
const Icon = ({ name, color = "white", size = 14 }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return <div>Icon not found</div>;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <LucideIcon color={color} size={size} aria-hidden="true" />;
    </div>
  );
};

export default Icon;
