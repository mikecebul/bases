import Image from "next/image";
import BASESLOGO from "../../public/BasesLogo.png";
import { Menu, X } from "lucide-react";

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image src={BASESLOGO} className={className} alt="BASES Logo" />
  ),
  openMenu: Menu,
  closeMenu: X,
};
