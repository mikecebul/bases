import Image from "next/image";
import {
  Menu,
  X,
  ArrowRight,
  Glasses,
  FlaskConical,
  Users,
  Tally4,
  WineOff,
  Car,
  Phone,
  Navigation,
  Printer,
  Mail,
  Pencil,
  SprayCan,
  Brain,
  CircleOff,
  Facebook,
  CheckCircle,
  UserPlus,
  User,
  UserX,
  Check,
  ChevronsUpDown,
  LucideIcon,
  PlusCircle,
  Baby,
  PersonStanding,
} from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image
      src="/BasesLogo.png"
      width={1024}
      height={252}
      className={className}
      alt="BASES Logo"
    />
  ),
  carf: ({ className }: { className: string }) => (
    <Image
      src="/CARF_GoldSeal.png"
      width={500}
      height={500}
      className={className}
      alt="CARF Certification"
    />
  ),
  openMenu: Menu,
  closeMenu: X,
  arrowRight: ArrowRight,
  glasses: Glasses,
  flask: FlaskConical,
  group: Users,
  jail: Tally4,
  class: WineOff,
  car: Car,
  phone: Phone,
  navigation: Navigation,
  print: Printer,
  mail: Mail,
  pencil: Pencil,
  spray: SprayCan,
  brain: Brain,
  zero: CircleOff,
  facebook: Facebook,
  checkCirlce: CheckCircle,
  adduser: UserPlus,
  user: User,
  delete: UserX,
  check: Check,
  chevronsUpDown: ChevronsUpDown,
  plusCircle: PlusCircle,
  baby: Baby,
  kid: PersonStanding,
};

type LucideIconsType = {
  component: LucideIcon;
  label: string;
  value: string;
};

export const lucideIcons: LucideIconsType[] = [
  { component: User, label: "Fall Back", value: "fallback" },
  { component: Menu, label: "Menu", value: "openMenu" },
  { component: X, label: "X", value: "closeMenu" },
  { component: ArrowRight, label: "Arrow Right", value: "arrowRight" },
  { component: Glasses, label: "Glasses", value: "glasses" },
  { component: FlaskConical, label: "Flask", value: "flask" },
  { component: Users, label: "Group", value: "group" },
  { component: Tally4, label: "Jail", value: "jail" },
  { component: WineOff, label: "Wine Off", value: "class" },
  { component: Car, label: "Car", value: "car" },
  { component: Phone, label: "Phone", value: "phone" },
  { component: Navigation, label: "Navigation", value: "navigation" },
  { component: Printer, label: "Printer", value: "print" },
  { component: Mail, label: "Mail", value: "mail" },
  { component: Pencil, label: "Pencil", value: "pencil" },
  { component: SprayCan, label: "Spray Can", value: "spray" },
  { component: Brain, label: "Brain", value: "brain" },
  { component: CircleOff, label: "Circle Off", value: "zero" },
  { component: Facebook, label: "Facebook", value: "facebook" },
  { component: CheckCircle, label: "Check Circle", value: "checkCirlce" },
  { component: UserPlus, label: "Add User", value: "adduser" },
  { component: User, label: "User", value: "user" },
  { component: UserX, label: "Delete User", value: "delete" },
  { component: Check, label: "Check", value: "check" },
  { component: ChevronsUpDown, label: "Up Down", value: "chevronsUpDown" },
  { component: PlusCircle, label: "Plus Circle", value: "plusCircle" },
];

export const iconMapping = lucideIcons.reduce<Record<string, LucideIcon>>(
  (acc, icon) => {
    acc[icon.value] = icon.component;
    return acc;
  },
  {}
);

export const renderIcon = (iconValue: string, small?: "small"): ReactNode => {
  const IconComponent = iconMapping[iconValue];
  const iconSize = small ? "w-4 h-4" : "w-6 h-6"; // Adjust the icon size
  const containerSize = small ? "w-6 h-6" : "w-10 h-10"; // Adjust the container size

  if (!IconComponent) {
    return (
      <div
        className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}
      >
        <User className={`${iconSize} text-white`} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}
    >
      <IconComponent className={`${iconSize} text-white`} aria-hidden="true" />
    </div>
  );
};
