import { Icons } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  Hero: {
    title: "Substance Use and Mental Health Counseling",
    subtitle:
      "We bridge the gap to recovery, offering flexible and personalized services both in-person and via telehealth.",
  },
  NavLinks: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Team",
      href: "/team",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
  ],
  Footer: {
    Privacy: {
      title: "Privacy Practices",
      href: "/Privacy_Practices.pdf",
    },
    Contact: [
      {
        icon: Icons.navigation,
        title: "101 M-66 N | Charlevoix, MI",
        href: "https://goo.gl/maps/X956fmf511Fef9Pr7",
      },
      {
        icon: Icons.phone,
        title: "(231) 547-1144",
        href: "tel:2315471144",
      },
      {
        icon: Icons.mail,
        title: "info@basesrecoverycenter.org",
        href: "mailto:info@basesrecoverycenter.org",
      },
      {
        icon: Icons.print,
        title: "(231) 547-4970",
        href: null,
      },
    ],
    Social: [
      {
        icon: Icons.facebook,
        title: "Public Group",
        href: "https://www.facebook.com/groups/2161896330714628/",
      },
    ],
  },
  Services: [
    {
      name: "Detailed Substance Use and Mental Health Assessments",
      description:
        "Our team delivers comprehensive assessments for substance use disorders, mental health, and trauma for adults and adolescents, helping to formulate the most effective personalized treatment plan.",
      icon: Icons.glasses,
    },
    {
      name: "Individual and Group Counseling",
      description:
        "We offer individual and group counseling sessions addressing substance use, mental health, and trauma. Our therapies include DBT (Dialectical Behavior Therapy), CBT (Cognitive Behavior Therapy), and EMDR (Eye Movement Desensitization and Reprocessing).",
      icon: Icons.brain,
    },
    {
      name: "Batterer Intervention",
      href: "/services/batterer-intervention",
      description:
        "We offer a men's HEAL (Helping Explore Accountable Lifestyles) group for those needing counseling after domestic violence altercations. It is a 39 session commitment with a cost of $25 per session.",
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
        "We offer several types of drug testing with the highest availablity in the area. Our standard 10 panel costs $25 and EtGs cost $35.",

      icon: Icons.flask,
    },
    {
      name: "Alcohol Highway Safety Education Class",
      description:
        "Our Alcohol Highway Safety Education Classes are designed for first-time OWI/OUI offenders, providing crucial knowledge and insight.",
      icon: Icons.class,
    },
    {
      name: "Zero Tolerance Education Class",
      description:
        "Our Alcohol Highway Safety Education Classes are designed for first-time OWI/OUI offenders, providing crucial knowledge and insight.",
      icon: Icons.zero,
    },
    {
      name: "Driver’s License Appeal Assistance",
      description:
        "For a $250 fee, this service includes a drug test, analysis of your driving record, an evaluation, and completion of the necessary 10+ page forms for driver's license appeal hearings.",
      icon: Icons.car,
    },
    {
      name: "Naloxone Nasal Kits",
      href: "/services/naloxone",
      description:
        "BASES has free naloxone nasal kits (opioid overdose reversal drug). If you or a family member have opioid concerns, you should have one of these life saving kits on hand.",
      icon: Icons.spray,
    },
  ],
  FrontPageServices: [
    {
      name: "Detailed Substance Use and Mental Health Assessments",
      description:
        "Our team delivers comprehensive assessments for substance use disorders, mental health, and trauma for adults and adolescents, helping to formulate the most effective personalized treatment plan.",
      icon: Icons.glasses,
    },
    {
      name: "Individual and Group Counseling",
      description:
        "We offer individual and group counseling sessions addressing substance use, mental health, and trauma. Our therapies include DBT (Dialectical Behavior Therapy), CBT (Cognitive Behavior Therapy), and EMDR (Eye Movement Desensitization and Reprocessing).",
      icon: Icons.group,
    },
    {
      name: "Drug Testing",
      description:
        "We offer several types of drug testing with the highest availablity in the area. Our standard 10 panel costs $25 and EtGs cost $35.",

      icon: Icons.flask,
    },
  ],
  team: {
    staff: [
      {
        name: "D Scott Kelly",
        role: "Executive Director, Counselor",
        qualifications: "MA, CAADC, MAC, CCS",
        imageUrl: "/profiles/DScottKelly_Profile.webp",
        id: "1",
        bio: [
          "Co-founder of BASES, Scott is a native of Charlevoix and graduated from Charlevoix High School in 1982. He attended Ferris State University where he also played baseball for four years. Two days after his first year of college, Scott voluntarily checked himself into an alcoholism treatment program at age 18. When he finished college at Ferris three years later, he earned a bachelor's degree in social work, graduated with honors, and was named Male Athlete of the Year in 1986 and Conference Baseball Player of the Year. He has worked as a substance abuse counselor in a long-term residential program, a prevention specialist and a student assistance coordinator.",
          "In organizing BASES, Scott combined his passions of substance abuse counseling and baseball to come up with the name in hopes of filling the gaps in services for young people. Scott completed his master's degree in counseling at Central Michigan University in 1997. He is a certified advanced alcohol and drug counselor (CAADC), certified clinical supervisor (CCS), master addictions counselor (MAC), trained in Dialectical Behavior Therapy (DBT), licensed bachelor social worker (LBSW), certified relapse prevention specialist (CRPS), certified peer recovery coach (CPRC), and has been clean and sober since 1984. Scott and his wife, Celia, live in Charlevoix and have three children and three grandchildren.",
          "Scott was elected to the Ferris State University Athletic Hall of Fame in September of 2007, the Manistee Saints Semi-Pro Baseball Hall of Fame in 2009, and the Michigan Amateur Softball Association Hall of Fame in January of 2015.",
        ],
      },
      {
        name: "Celia Partida-Kelly",
        role: "Program Director, Counselor",
        qualifications: "MA, LPC, CAADC, CTP, EMDR",
        imageUrl: "/profiles/CeliaKelly_Profile.webp",
        id: "2",
        bio: [
          "Co-founder of BASES, Celia began her career in the substance abuse field doing prevention programs with Head Start in 1988. She then accepted a position as a Prevention Specialist with Chip Counseling Center and later became the Prevention Coordinator for Antrim, Charlevoix, Cheboygan and Emmet counties.",
          "Celia's passion to assist young people led her to the creation of BASES in 1993 where she has designed and implemented numerous training programs with local students, teachers and community members. Celia's reputation as an energetic and enthusiastic trainer drew the attention of Hazelden, international leader in substance abuse treatment and education, where she shared her skills and expertise on a national level as a trainer.",
          "Celia has her master's degree in counseling through Central Michigan University and has a bachelor's of arts degree in social sciences from Thomas Edison College. She is a licensed professional counselor (LPC), certified advanced alcohol and drug counselor (CAADC), master addiction counselor (MAC), certified clinical supervisor (CCS), trained in Dialectical Behavior Therapy (DBT), trained in Eye Movement Desensitization and Reprocessing (EMDR) therapy for trauma, certified trauma practitioner (CTP), and has been involved in her own recovery from addiction since 1986. Celia lives in Charlevoix with her husband, Scott, and they have three children and three grandchildren.",
        ],
      },
      {
        name: "Leah Mayotte",
        role: "Clinical Supervisor, Counselor",
        qualifications: "MA, LPC, CAADC, CCS, CTP, EMDR",
        imageUrl: "/profiles/LeahMayotte_Profile.webp",
        id: "3",
        bio: [
          "Leah has been working in the substance abuse and mental health field since 2007 in a variety of settings. Leah comes by this line of work naturally as both of her parents are counselors and in long-term recovery. She provides quality services and creates an environment where clients feel safe to communicate their thoughts and feelings.",
        ],
        philosophy: [
          "Leah’s approach to counseling is interactive in style with an emphasis on action and the empathic response model. She uses techniques that empower her clients to challenge internal thinking processes to motivate positive change. Leah’s treatment philosophy includes a person-centered and solution focused approach. She likes to meet the client where they are and help them gain various tools and skills they need to address their concerns. Leah utilizes Dialectical Behavior Therapy (DBT) and Cognitive Behavior Therapy (CBT) techniques. Her main specialties include substance abuse and addiction, trauma, and mood disorders. She works with ages 12 and up.",
        ],
        education: [
          "Leah has a master’s degree in Counselor Education: Clinical Mental Health Counseling from Western Michigan University. She is a Licensed Professional Counselor (LPC), Certified Advanced Alcohol and Drug Counselor (CAADC), Eye Movement Desensitization Reprocessing (EMDR) certified therapist, Certified Trauma Practitioner (CTP), and Certified Clinical Supervisor (CCS). Leah has worked as a Clinical Therapist in Charlevoix working with adolescents, adults, and families. She has also spent time as a Clinical Manager in Grand Rapids for a men’s residential treatment facility. She has experience with individual, group, couples, and family counseling.",
        ],
        specializations: [
          "Substance abuse and addiction",
          "Trauma / EMDR",
          "Anxiety",
          "Depression",
          "Grief and Loss",
          "Relationship Issues",
          "Self-esteem Issues",
          "Family Issues",
          "Traumatic Brain Injury / Auto Accident",
        ],
      },
      {
        name: "Michael Cebulski",
        role: "Counselor, Recovery Coach",
        qualifications: "CADC, CPRC",
        imageUrl: "/profiles/MikeCebulski_Profile.webp",
        id: "4",
        bio: [
          "Mike has been an employee of BASES since June of 2019. Mike has both MDHHS Certified Peer Recovery Coach (CPRC) & CCAR Peer Recovery Coach certifications. He has an active certified alcohol drug counselor development plan (CADC-DP), trained in Dialectical Behavioral Therapy (DBT), screening, brief intervention and referral to treatment (SBIRT), certified Smart Recovery facilitator, has been clean and sober since 2016, and is active in the recovery community in northwest lower Michigan.",
        ],
      },
      {
        name: "Melanie Moran",
        role: "Recovery Coach",
        qualifications: "CPRC",
        imageUrl: "/profiles/MelanieMoran_Profile.webp",
        id: "5",
        bio: [
          "Melanie has both MDHHS Certified Peer Recovery Coach (CPRC) & CCAR Peer Recovery Coach certifications with additional advocacy training. She has 28.5 years experience as a certified nurses assistant and activity assistant. Melanie graduated from Charlevoix High School in 1982, established her recovery in 2020, and is an active member in the local recovery community.",
        ],
      },
      {
        name: "Leland Barta",
        role: "Office Manager",
        qualifications: "",
        imageUrl: "/profiles/LeeBarta_Profile.webp",
        id: "6",
        bio: [
          "Lee has been an employee of BASES since August of 2017. He completed his Bachelor of Science Degree from Central Michigan with emphasis in education. Lee worked in banking for more than 25 years and the last 14 years as office manager for a local firm. He has been a local sports official for the past 35 years. Lee lives in Charlevoix with his wife Sue, and they have three children and one granddaughter.",
        ],
      },
    ],
    boardMembers: [
      {
        name: "Gwen White-Erickson",
        slug: "gwen-white-erickson",
        role: "Board President",
        imageUrl: "/profiles/board/GwenWhite.png",
        bio: [
          "Gwen is a retired Detective/Sergeant Michigan State Police, Petoskey Post. She worked 32 years with the Michigan State Police. During that time, she frequently saw the devestating and tragic effects of alcohol and drug addiction on individuals, families and communities. Gwen resides with her husband Vern in Boyne City.",
        ],
      },
      {
        name: "Eric Eide",
        slug: "eric-eide",
        role: "Board Vice-President",
        imageUrl: "/profiles/board/EricEide.png",
        bio: [
          "Eric spent 35 years with the Fresno Police Department having served in a variety of positions in an increasingly challenging city environment. Most of his positions had a common theme of dealing with people making poor decisions while under the influence of alcohol and or drugs and the various responses to their crimes. Several of the programs received state and national recognition for success and innovative solutions. Eric has lived in Charlevoix since retirement in 2010 with his wife Janet, also a retired officer. They assist the community through efforts in the Lions Club, Elks Club, Power Squadron, Retired Senior Volunteer Program. BASES provides a chance to use a lifetime of law enforcement experience to help some of our youth.",
        ],
      },
      {
        name: "Debbie Neidhamer",
        slug: "debbie-neidhamer",
        role: "Board Secretary",
        imageUrl: "/profiles/board/DebbieNeidhamer.png",
        bio: [
          "Debbie is a retired Home Economics Teacher from Boyne City High School, having served the community for over 30 years. Now residing in Boyne City, she is actively involved in numerous local initiatives. Debbie has been a part of BASES since 1996. Together with her husband, Tom, they are proud parents and grandparents.",
        ],
      },
      {
        name: "Bill Fleck",
        slug: "bill-fleck",
        role: "Board Treasurer",
        imageUrl: "/profiles/board/BillFleck.jpg",
        bio: [
          "Bill is a retired teacher who taught high school English for 5 years and then worked for IRS in civil enforcement for 30 years, retiring in 2003. He has degrees in English and Psychology and a permanent Michigan teaching certificate. He and his wife, Birute, who worked 30 years for Michigan Department of Corrections, have lived in Charlevoix area (near Castle Farms) since 2003. Bill is involved with the local US Power Squadron, Charlevoix Lions and is treasurer of his condo association.",
        ],
      },
      {
        name: "Scott Gilland",
        slug: "scott-gilland",
        role: "Board Member",
        imageUrl: "/profiles/board/ScottGilland.webp",
        bio: [
          "Scott is a retired staff engineer from Ford Motor Company where he managed new color development for North America and Europe. He is the past treasurer and secretary of the Viking Club. He is a current member of the Charlevoix Lions Club and Serenity House Alano Club of Charlevoix.",
        ],
      },
      {
        name: "Marsy Burns",
        slug: "marsy-burns",
        role: "Board Member",
        imageUrl: "/profiles/board/MarsyBurns.webp",
        bio: [
          "Marsy is a retired English teacher, teaching 10 years at the high school level in Algonac before moving to Charlevoix in 1980. The remainder of her teaching career was at the middle school level at St. Francis Xavier in Petoskey for 20 years before retiring. She has three boys and two granddaughters. She does some tutoring but her passion has become quilting. She operates a long arm quilting business, is involved in her own recovery and a member of the Charlevoix Alano Club board of directors.",
        ],
      },
      {
        name: "Jim Alger Jr.",
        slug: "jim-alger-jr",
        role: "Board Member",
        imageUrl: "/profiles/board/JimAlger.jpg",
        bio: [
          "Jim is a native of Charlevoix and retired information technology (IT) project and program manager. Jim spent 14 years of his professional career designing Child Welfare systems for the Michigan Department of Health and Human Services. He also served as a project manager for the Michigan Department of Education for the past 7 years. Along with his IT career, Jim coached High School football for seventeen years in DeWitt, Michigan. Jim and his wife Carol reside in Charlevoix, have three grown children and six grandchildren.",
        ],
      },
    ],
  },
  AHSE: [
    {
      title: 'Beyond "Be Responsible"',
      description:
        "Beyond “Be Responsible” is an introductory level educational presentation from the Office of Health and Wellness Promotion at Indiana University-Purdue University Indianapolis (IUPUI)",
      href: "https://youtube.com/embed/268JVesOhSY",
    },
    {
      title: "BeyondDUI/DWI: Make This One Your Last One",
      description:
        "Preview video from Reelizations Media catalog for Addiction Treatment & Behavioral Health.",
      href: "https://youtube.com/embed/XopdUea_pJM",
    },
    {
      title: "This Place",
      description:
        "This award-winning, 15-minute film dramatically captures today&apos;s youth drinking culture. This film shows the alcohol-saturated environment kids are exposed to and the impact of underage drinking. It also offers an important glimpse into communities that are taking action to reduce alcohol problems. (c) 2006.",
      href: "https://youtube.com/embed/E8VPZRT2wPA",
    },
    {
      title: "A Stone’s Throw",
      description:
        "Winner of multiple international film awards, this five-minute film sensitively addresses adult behaviors toward alcohol and their impact on our kids, our communities and ourselves. The film gently urges us to reflect on our attitudes toward alcohol and empowers us to take individual and collective action – without preaching or using hard statistical data. (c) 1994.",
      href: "https://youtube.com/embed/0EcCH7kJYGE",
    },
    {
      title: "Lift It Up",
      description:
        "This riveting seven-minute film draws a straight line between alcohol and violence, it tackles the controversial issue of the role alcohol plays in assault, murder, child abuse, rape, emotional trauma and physical violence. Starting softly – through poetry – the film unmasks the immensity of the issue, then cranks up the volume to get to the heart of it, and concludes with an inspirational challenge for all of us. (c) 1996",
      href: "https://youtube.com/embed/4WrWKWeF2Gg",
    },
  ],
};
