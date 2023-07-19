import Image from "next/image";
import BASESLOGO from "../../public/BasesLogo.png";
import { Building } from "lucide-react";

export const Icons = {
  logo: ({className} :{className: string}) => (
    <Image
      src={BASESLOGO}
      className={className}
      alt="BASES Logo"
    />
  ),
  building: Building,
};
