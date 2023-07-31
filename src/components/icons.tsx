import Image from "next/image";
import BASESLOGO from "../../public/BasesLogo.png";
import Carf from "../../public/carf_accredited-90x90.png";
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
} from "lucide-react";

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image src={BASESLOGO} className={className} alt="BASES Logo" />
  ),
  carf: ({ className }: { className: string }) => (
    <Image src={Carf} className={className} alt="CARF Certification" />
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
};
