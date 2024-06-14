import { lucideIcons } from "./icons";
import { User as DefaultIcon } from "lucide-react";

type IconName = (typeof lucideIcons)[number]["value"];

const findIconComponent = (name: IconName) => {
  const icon = lucideIcons.find((icon) => icon.value === name);
  return icon ? icon.component : null;
};

const Icon = ({ name }: { name: IconName }) => {
  const IconComponent = findIconComponent(name) || DefaultIcon;

  return <IconComponent />;
};

export default Icon;
