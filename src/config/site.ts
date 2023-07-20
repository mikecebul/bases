import { Icons } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  Hero: {
    name: "BASES",
    description: "An outpatient facility for SUD serving northern Michigan.",
  },
  LandingPageLinks: [
    {
      title: "Home",
      href: "#",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Services",
      href: "#services",
    },
    {
      title: "Team",
      href: "#team",
    },
  ],
  AboutPageLinks: [
    {
      title: "Our Facility",
      href: "/about/our-facility",
      description: "Welcome to the new BASES building.",
    },
    {
      title: "Our Staff",
      href: "/about/our-staff",
      description: "Get to know our staff members.",
    },
    {
      title: "Our Board",
      href: "/about/our-board",
      description:
        "Get to know the board members our our non-profit organization.",
    },
    {
      title: "FAQ",
      href: "/about/faq",
      description:
        "Get some answers to some of our most frequently asked questions.",
    },
  ],
  ServicesPageLinks: [
    {
      title: "Individual Counseling",
      href: "/services/individual-counseling",
      description: "One on one counseling with a certified counselor",
    },
    {
      title: "Naloxone Nasal Kits",
      href: "/services/naloxone",
      description: "We have free Narcan available at our facility",
    },
    {
      title: "Drug Testing",
      href: "/services/drug-testing",
      description:
        "We offer several types of drug testing with the highest availablity in the area.",
    },
    {
      title: "Batterer Intervention",
      href: "/batterer-intervention",
      description:
        "We offer a men's HEAL group for those needing counseling after domestic violence altercations.",
    },
    {
      title: "Assessments",
      href: "/services/assessments",
      description: "We offer comprehensive Substance Use Disorder Assessments.",
    },
    {
      title: "Recovery Coaching",
      href: "/services/recovery-coaching",
      description: "We have a team of certified Peer Recovery Coaches.",
    },
    {
      title: "Substance Use Disorder Group",
      href: "/services/sud-group",
      description:
        "Our groups specialize in DBT skills training to enhance relapse prevention.",
    },
    {
      title: "Jail Group",
      href: "/servicesjail-group",
      description:
        "Bases staff offer weekly jail groups for men and Women in the Charlvoix County Jail.",
    },
    {
      title: "Alcohol Highway Education Class",
      href: "/services/alcohol-highway-education-class",
      description:
        "This class is often a requirement for those who recieve their first OWI.",
    },
    {
      title: "Drivers License Appeal",
      href: "/services/drivers-license-appeal",
      description:
        "Get help appealing to regain your drivers license from the State of Michigan.",
    },
  ],
  LocalServicesPageLinks: [
    {
      title: "Transportation",
      href: "/transportation",
      description: "Community resources for transportion.",
    },
    {
      title: "Food",
      href: "/food",
      description: "Community resources for Food.",
    },
    {
      title: "Housing",
      href: "/housing",
      description: "Community resources for housing.",
    },
    {
      title: "Insurance",
      href: "/insurance",
      description: "Community resources for insurance.",
    },
    {
      title: "Employment",
      href: "/employment",
      description: "Community resources for employment.",
    },
    {
      title: "Healthcare",
      href: "/healthcare",
      description: "Community resources for healthcare.",
    },
    {
      title: "Household Items",
      href: "/household-items",
      description: "Community resources for household items.",
    },
    {
      title: "Treatment",
      href: "/treatment",
      description: "Community resources for SUD and mental health treatment.",
    },
  ],
  Services: [
    {
      name: "Detailed Substance Use Disorder Assessments",
      description:
        "We provide comprehensive substance use disorder assessments for adults and adolescents to map out the most effective treatment plan.",
      icon: Icons.glasses,
    },
    {
      name: "Substance Use Disorder Therapy",
      description:
        "We offer individual and group therapy sessions for adults utilizing DBT, CBT, and relapse prevention therapies.",
      icon: Icons.group,
    },
    {
      name: "Correctional Facility Group Therapy",
      description:
        "We facilitate CBT/DBT groups for men (Mondays) and for women (Wednesdays) at the Charlevoix County Jail.",
      icon: Icons.jail,
    },
    {
      name: "Drug Testing",
      description:
        "We offer several types of drug testing with the highest availablity in the area.",

      icon: Icons.flask,
    },
    {
      name: "Alcohol Highway Safety Education Class",
      description:
        "Our Alcohol Highway Safety Education Classes are designed for first-time OWI/OUI offenders, providing crucial knowledge and insight.",
      icon: Icons.class,
    },
    {
      name: "Driver’s License Appeal Assistance",
      description:
        "We provide substance use disorder evaluations for driver’s license appeal hearings. This service is offered at a $250 charge and includes a drug test, driving record analysis, evaluation, and completion of 10+ page forms.",
      icon: Icons.car,
    },
  ],
  staff: [
    {
      name: "D Scott Kelly",
      role: "Executive Director, Counselor",
      qualifications: "MA, CAADC, MAC, CCS",
      imageUrl: "/profiles/DScottKelly_Profile.webp",
    },
    {
      name: "Celia Partida-Kelly",
      role: "Program Director, Counselor",
      qualifications: "MA, LPC, CAADC, CTP, EMDR",
      imageUrl: "/profiles/CeliaKelly_Profile.webp",
    },
    {
      name: "Leah Mayotte",
      role: "Clinical Supervisor, Counselor",
      qualifications: "MA, LPC, CAADC, CCS, CTP, EMDR",
      imageUrl: "/profiles/LeahMayotte_Profile.webp",
    },
    {
      name: "Michael Cebulski",
      role: "Counselor, Recovery Coach",
      qualifications: "CADC-DP, CPRC",
      imageUrl: "/profiles/MikeCebulski_Profile.webp",
    },
    {
      name: "Melanie Moran",
      role: "Recovery Coach",
      qualifications: "CPRC",
      imageUrl: "/profiles/MelanieMoran_Profile.webp",
    },
    {
      name: "Leland Barta",
      role: "Office Manager",
      qualifications: "",
      imageUrl: "/profiles/LeeBarta_Profile.webp",
    },
  ],
  boardMembers: [
    {
      name: "Gwen White-Erickson",
      role: "Board President",
      imageUrl: "/profiles/board/GwenWhite.png",
    },
    {
      name: "Eric Eide",
      role: "Board Vice-President",
      imageUrl: "/profiles/board/EricEide.png",
    },
    {
      name: "Debbie Neidhamer",
      role: "Board Secretary",
      imageUrl: "/profiles/board/DebbieNeidhamer.png",
    },
    {
      name: "Bill Fleck",
      role: "Board Treasurer",
      imageUrl: "/profiles/board/BillFleck.jpg",
    },
    {
      name: "Scott Gilland",
      role: "Board Member",
      imageUrl: "/profiles/board/ScottGilland.webp",
    },
    {
      name: "Marsy Burns",
      role: "Board Member",
      imageUrl: "/profiles/board/MarsyBurns.webp",
    },
    {
      name: "Jim Alger Jr.",
      role: "Board Member",
      imageUrl: "/profiles/board/JimAlger.jpg",
    },
  ],
};
