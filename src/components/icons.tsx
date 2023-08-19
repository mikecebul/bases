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
} from "lucide-react";

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
};

export const lucideIcons = [
  { component: Menu, label: "Menu" },
  { component: X, label: "X" },
  { component: ArrowRight, label: "Arrow Right" },
  { component: Glasses, label: "Glasses" },
  { component: FlaskConical, label: "Flask" },
  { component: Users, label: "Group" },
  { component: Tally4, label: "Jail" },
  { component: WineOff, label: "Wine Off" },
  { component: Car, label: "Car" },
  { component: Phone, label: "Phone" },
  { component: Navigation, label: "Navigation" },
  { component: Printer, label: "Printer" },
  { component: Mail, label: "Mail" },
  { component: Pencil, label: "Pencil" },
  { component: SprayCan, label: "Spray Can" },
  { component: Brain, label: "Brain" },
  { component: CircleOff, label: "Circle Off" },
  { component: Facebook, label: "Facebook" },
  { component: CheckCircle, label: "Check Circle" },
  { component: UserPlus, label: "Add User" },
  { component: User, label: "User" },
  { component: UserX, label: "Delete User" },
  { component: Check, label: "Check" },
  { component: ChevronsUpDown, label: "Up Down" },
];
