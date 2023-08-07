import Image from "next/image";
import Carf from "../../public/CARF_GoldSeal.png";
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
  navigtion: Navigation,
  print: Printer,
  mail: Mail,
  pencil: Pencil,
  spray: SprayCan,
  brain: Brain,
  zero: CircleOff,
  facebook: Facebook,
};
