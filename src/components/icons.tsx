import Image from "next/image";
import BASESLOGO from "../../public/BasesLogo.png";
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
} from "lucide-react";

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image src={BASESLOGO} className={className} alt="BASES Logo" />
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
};
