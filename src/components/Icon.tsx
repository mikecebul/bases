import { lucideIcons } from "./icons";
import { User as DefaultIcon } from "lucide-react";

type IconName = (typeof lucideIcons)[number]["value"];
type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
};

const findIconComponent = (name: IconName) => {
  const icon = lucideIcons.find((icon) => icon.value === name);
  return icon ? icon.component : null;
};

const Icon = ({ name, className = "", size, color }: IconProps) => {
  const IconComponent = findIconComponent(name) || DefaultIcon;

  return <IconComponent className={className} size={size} color={color} />;
};

export default Icon;
