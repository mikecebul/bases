import { Icons } from '@/components/Icons'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  Hero: {
    title: 'Substance Use and Mental Health Counseling',
    subtitle:
      'We bridge the gap to recovery, offering flexible and personalized services both in-person and via telehealth.',
  },
  NavLinks: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Services',
      href: '/services',
    },
    {
      title: 'Team',
      href: '/team',
    },
    {
      title: 'About Us',
      href: '/about-us',
    },
    {
      title: 'Resources',
      href: '/resources.pdf',
    },
  ],
  footer: {
    Contact: [
      {
        icon: Icons.navigation,
        title: '855 Ardmore Ave | Akron, OH',
        href: 'https://maps.app.goo.gl/9MhXRHjzJxfdT3cf9',
      },
      {
        icon: Icons.phone,
        title: '(123) 456-7890',
        href: 'tel:1234567890',
      },
      {
        icon: Icons.mail,
        title: 'contact@mocksite.com',
        href: 'mailto:contact@mocksite.com',
      },
      {
        icon: Icons.print,
        title: '(123) 456-7899',
        href: null,
      },
    ],
    Social: [
      {
        icon: Icons.facebook,
        title: 'Public Group',
        href: 'https://www.facebook.com/groups/2161896330714628/',
      },
    ],
  },
  Services: [
    {
      name: 'Detailed Substance Use and Mental Health Assessments',
      description:
        'Our team delivers comprehensive assessments for substance use disorders, mental health, and trauma for adults and adolescents, helping to formulate the most effective personalized treatment plan.',
      icon: 'Glasses',
    },
    {
      name: 'Individual and Group Counseling',
      description:
        'We offer individual and group counseling sessions addressing substance use, mental health, and trauma. Our therapies include DBT (Dialectical Behavior Therapy), CBT (Cognitive Behavior Therapy), and EMDR (Eye Movement Desensitization and Reprocessing).',
      icon: 'Brain',
    },
    {
      name: 'Batterer Intervention',
      href: '/services/batterer-intervention',
      description:
        "We offer a men's HEAL (Helping Explore Accountable Lifestyles) group for those needing counseling after domestic violence altercations. It is a 39 session commitment with a cost of $25 per session.",
      icon: 'Users',
    },
    {
      name: 'Correctional Facility Group Therapy',
      description:
        'We facilitate CBT/DBT groups for men (Mondays) and for women (Wednesdays) at the Charlevoix County Jail.',
      icon: 'Tally4',
    },
    {
      name: 'Drug Testing',
      description:
        'We offer several types of drug testing available during business hours, along with weekend appointments for an additional $20 charge. Our standard 10 panel costs $25 and EtGs cost $35.',

      icon: 'FlaskConical',
    },
    {
      name: 'Alcohol Highway Safety Education Class',
      description:
        'Our Alcohol Highway Safety Education Classes are designed for first-time OWI/OUI offenders, providing crucial knowledge and insight.',
      icon: 'CircleOff',
    },
    {
      name: 'Driver’s License Appeal Assistance',
      description:
        "For a $250 fee, this service includes a drug test, analysis of your driving record, an evaluation, and completion of the necessary 10+ page forms for driver's license appeal hearings.",
      icon: 'Car',
    },
    {
      name: 'Naloxone Nasal Kits',
      href: '/services/naloxone',
      description:
        'BASES has free naloxone nasal kits (opioid overdose reversal drug). If you or a family member have opioid concerns, you should have one of these life saving kits on hand.',
      icon: 'SprayCan',
    },
  ],
  FrontPageServices: [
    {
      name: 'Detailed Substance Use and Mental Health Assessments',
      description:
        'Our team delivers comprehensive assessments for substance use disorders, mental health, and trauma for adults and adolescents, helping to formulate the most effective personalized treatment plan.',
      icon: Icons.glasses,
    },
    {
      name: 'Individual and Group Counseling',
      description:
        'We offer individual and group counseling sessions addressing substance use, mental health, and trauma. Our therapies include DBT (Dialectical Behavior Therapy), CBT (Cognitive Behavior Therapy), and EMDR (Eye Movement Desensitization and Reprocessing).',
      icon: Icons.group,
    },
    {
      name: 'Drug Testing',
      description:
        'We offer several types of drug testing available during business hours, along with weekend appointments for an additional $20 charge. Our standard 10 panel costs $25 and EtGs cost $35.',
      icon: Icons.flask,
    },
  ],
  wellChildVisitTools: [
    {
      title: 'Early Childhood Tools',
      description:
        'Tailored for infants and toddlers, this questionnaire focuses on early developmental milestones and health priorities, ensuring a thorough early childhood health evaluation.',
      href: 'https://www.aap.org/en/practice-management/bright-futures/bright-futures-materials-and-tools/bright-futures-tool-and-resource-kit/bright-futures-early-childhood-tools',
      icon: Icons.baby,
      image: '/child_development/early_child_development.jpeg',
    },
    {
      title: 'Middle Childhood Tools',
      description:
        'Designed for school-aged children, this tool assesses developmental progress and social well-being, preparing for comprehensive health supervision aligned with Bright Futures Guidelines.',
      href: 'https://www.aap.org/en/practice-management/bright-futures/bright-futures-materials-and-tools/bright-futures-tool-and-resource-kit/bright-futures-middle-childhood-tools/',
      icon: Icons.kid,
      image: '/child_development/middle_child_development.jpeg',
    },
    {
      title: 'Adolescence Childhood Tools',
      description:
        'Focused on the unique needs of teenagers, this questionnaire covers physical, emotional, and social development, facilitating meaningful discussions for adolescent health care.',
      href: 'https://www.aap.org/en/practice-management/bright-futures/bright-futures-materials-and-tools/bright-futures-tool-and-resource-kit/bright-futures-adolescence-tools',
      icon: Icons.user,
      image: '/child_development/adolescence_child_development.jpeg',
    },
  ],
  team: [
    {
      memberType: 'staff',
      name: 'D Scott Kelly',
      role: 'Executive Director, Counselor',
      qualifications: 'MA, CAADC, MAC, CCS',
      imageUrl: '/seed/team/DScottKelly_Profile.webp',
      bio: [
        '## Biography',
        "Co-founder of BASES, Scott is a native of Charlevoix and graduated from Charlevoix High School in 1982. He attended Ferris State University where he also played baseball for four years. Two days after his first year of college, Scott voluntarily checked himself into an alcoholism treatment program at age 18. When he finished college at Ferris three years later, he earned a bachelor's degree in social work, graduated with honors, and was named Male Athlete of the Year in 1986 and Conference Baseball Player of the Year. He has worked as a substance abuse counselor in a long-term residential program, a prevention specialist and a student assistance coordinator.",
        "In organizing BASES, Scott combined his passions of substance abuse counseling and baseball to come up with the name in hopes of filling the gaps in services for young people. Scott completed his master's degree in counseling at Central Michigan University in 1997. He is a certified advanced alcohol and drug counselor (CAADC), certified clinical supervisor (CCS), master addictions counselor (MAC), trained in Dialectical Behavior Therapy (DBT), licensed bachelor social worker (LBSW), certified relapse prevention specialist (CRPS), certified peer recovery coach (CPRC), and has been clean and sober since 1984. Scott and his wife, Celia, live in Charlevoix and have three children and three grandchildren.",
        'Scott was elected to the Ferris State University Athletic Hall of Fame in September of 2007, the Manistee Saints Semi-Pro Baseball Hall of Fame in 2009, and the Michigan Amateur Softball Association Hall of Fame in January of 2015.',
      ].join('\n\n'),
    },
    {
      memberType: 'staff',
      name: 'Celia Partida-Kelly',
      role: 'Program Director, Counselor',
      qualifications: 'MA, LPC, CAADC, CTP, EMDR',
      imageUrl: '/seed/team/CeliaKelly_Profile.webp',
      bio: [
        '## Biography',
        'Co-founder of BASES, Celia began her career in the substance abuse field doing prevention programs with Head Start in 1988. She then accepted a position as a Prevention Specialist with Chip Counseling Center and later became the Prevention Coordinator for Antrim, Charlevoix, Cheboygan and Emmet counties.',
        "Celia's passion to assist young people led her to the creation of BASES in 1993 where she has designed and implemented numerous training programs with local students, teachers and community members. Celia's reputation as an energetic and enthusiastic trainer drew the attention of Hazelden, international leader in substance abuse treatment and education, where she shared her skills and expertise on a national level as a trainer.",
        "Celia has her master's degree in counseling through Central Michigan University and has a bachelor's of arts degree in social sciences from Thomas Edison College. She is a licensed professional counselor (LPC), certified advanced alcohol and drug counselor (CAADC), master addiction counselor (MAC), certified clinical supervisor (CCS), trained in Dialectical Behavior Therapy (DBT), trained in Eye Movement Desensitization and Reprocessing (EMDR) therapy for trauma, certified trauma practitioner (CTP), and has been involved in her own recovery from addiction since 1986. Celia lives in Charlevoix with her husband, Scott, and they have three children and three grandchildren.",
      ].join('\n\n'),
    },
    {
      memberType: 'staff',
      name: 'Leah Mayotte',
      role: 'Clinical Supervisor, Counselor',
      qualifications: 'MA, LPC, CAADC, CCS, CTP, EMDR',
      imageUrl: '/seed/team/LeahMayotte_Profile.webp',
      bio: [
        '## Biography',
        'Leah has been working in the substance abuse and mental health field since 2007 in a variety of settings. Leah comes by this line of work naturally as both of her parents are counselors and in long-term recovery. She provides quality services and creates an environment where clients feel safe to communicate their thoughts and feelings.',
        '## Philosophy',
        'Leah’s approach to counseling is interactive in style with an emphasis on action and the empathic response model. She uses techniques that empower her clients to challenge internal thinking processes to motivate positive change. Leah’s treatment philosophy includes a person-centered and solution-focused approach. She likes to meet the client where they are and help them gain various tools and skills they need to address their concerns. Leah utilizes Dialectical Behavior Therapy (DBT) and Cognitive Behavior Therapy (CBT) techniques. Her main specialties include substance abuse and addiction, trauma, and mood disorders. She works with ages 12 and up.',
        '## Education',
        'Leah has a master’s degree in Counselor Education: Clinical Mental Health Counseling from Western Michigan University. She is a Licensed Professional Counselor (LPC), Certified Advanced Alcohol and Drug Counselor (CAADC), Eye Movement Desensitization Reprocessing (EMDR) certified therapist, Certified Trauma Practitioner (CTP), and Certified Clinical Supervisor (CCS). Leah has worked as a Clinical Therapist in Charlevoix working with adolescents, adults, and families. She has also spent time as a Clinical Manager in Grand Rapids for a men’s residential treatment facility. She has experience with individual, group, couples, and family counseling.',
        '## Specializations',
        '- Substance abuse and addiction',
        '- Trauma / EMDR',
        '- Anxiety',
        '- Depression',
        '- Grief and Loss',
        '- Relationship Issues',
        '- Self-esteem Issues',
        '- Family Issues',
        '- Traumatic Brain Injury / Auto Accident',
      ].join('\n\n'),
    },
    {
      memberType: 'staff',
      name: 'Michael Cebulski',
      role: 'Counselor, Recovery Coach',
      qualifications: 'CADC, CPRC',
      imageUrl: '/seed/team/MikeCebulski_Profile.webp',
      bio: [
        '## Biography',
        'Mike has been an employee of BASES since June of 2019. Mike has both MDHHS Certified Peer Recovery Coach (CPRC) & CCAR Peer Recovery Coach certifications. He has an active certified alcohol drug counselor development plan (CADC-DP), trained in Dialectical Behavioral Therapy (DBT), screening, brief intervention and referral to treatment (SBIRT), certified Smart Recovery facilitator, has been clean and sober since 2016, and is active in the recovery community in northwest lower Michigan.',
      ].join('\n\n'),
    },
    {
      memberType: 'staff',
      name: 'Leland Barta',
      role: 'Office Manager',
      qualifications: '',
      imageUrl: '/seed/team/LeeBarta_Profile.webp',
      bio: [
        '## Biography',
        'Lee has been an employee of BASES since August of 2017. He completed his Bachelor of Science Degree from Central Michigan with emphasis in education. Lee worked in banking for more than 25 years and the last 14 years as office manager for a local firm. He has been a local sports official for the past 35 years. Lee lives in Charlevoix with his wife Sue, and they have three children and one granddaughter.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Gwen White-Erickson',
      slug: 'gwen-white-erickson',
      role: 'Board President',
      imageUrl: '/seed/team/GwenWhite.png',
      bio: [
        '## Biography',
        'Gwen is a retired Detective/Sergeant Michigan State Police, Petoskey Post. She worked 32 years with the Michigan State Police. During that time, she frequently saw the devestating and tragic effects of alcohol and drug addiction on individuals, families and communities. Gwen resides with her husband Vern in Boyne City.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Eric Eide',
      slug: 'eric-eide',
      role: 'Board Vice-President',
      imageUrl: '/seed/team/EricEide.png',
      bio: [
        '## Biography',
        'Eric spent 35 years with the Fresno Police Department having served in a variety of positions in an increasingly challenging city environment. Most of his positions had a common theme of dealing with people making poor decisions while under the influence of alcohol and or drugs and the various responses to their crimes. Several of the programs received state and national recognition for success and innovative solutions. Eric has lived in Charlevoix since retirement in 2010 with his wife Janet, also a retired officer. They assist the community through efforts in the Lions Club, Elks Club, Power Squadron, Retired Senior Volunteer Program. BASES provides a chance to use a lifetime of law enforcement experience to help some of our youth.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Debbie Neidhamer',
      slug: 'debbie-neidhamer',
      role: 'Board Secretary',
      imageUrl: '/seed/team/DebbieNeidhamer.png',
      bio: [
        '## Biography',
        'Debbie is a retired Home Economics Teacher from Boyne City High School, having served the community for over 30 years. Now residing in Boyne City, she is actively involved in numerous local initiatives. Debbie has been a part of BASES since 1996. Together with her husband, Tom, they are proud parents and grandparents.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Bill Fleck',
      slug: 'bill-fleck',
      role: 'Board Treasurer',
      imageUrl: '/seed/team/BillFleck.jpg',
      bio: [
        '## Biography',
        'Bill is a retired teacher who taught high school English for 5 years and then worked for IRS in civil enforcement for 30 years, retiring in 2003. He has degrees in English and Psychology and a permanent Michigan teaching certificate. He and his wife, Birute, who worked 30 years for Michigan Department of Corrections, have lived in Charlevoix area (near Castle Farms) since 2003. Bill is involved with the local US Power Squadron, Charlevoix Lions and is treasurer of his condo association.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Scott Gilland',
      slug: 'scott-gilland',
      role: 'Board Member',
      imageUrl: '/seed/team/ScottGilland.webp',
      bio: [
        '## Biography',
        'Scott is a retired staff engineer from Ford Motor Company where he managed new color development for North America and Europe. He is the past treasurer and secretary of the Viking Club. He is a current member of the Charlevoix Lions Club and Serenity House Alano Club of Charlevoix.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Marsy Burns',
      slug: 'marsy-burns',
      role: 'Board Member',
      imageUrl: '/seed/team/MarsyBurns.webp',
      bio: [
        '## Biography',
        'Marsy is a retired English teacher, teaching 10 years at the high school level in Algonac before moving to Charlevoix in 1980. The remainder of her teaching career was at the middle school level at St. Francis Xavier in Petoskey for 20 years before retiring. She has three boys and two granddaughters. She does some tutoring but her passion has become quilting. She operates a long arm quilting business, is involved in her own recovery and a member of the Charlevoix Alano Club board of directors.',
      ].join('\n\n'),
    },
    {
      memberType: 'board',
      name: 'Jim Alger Jr.',
      slug: 'jim-alger-jr',
      role: 'Board Member',
      imageUrl: '/seed/team/JimAlger.jpg',
      bio: [
        '## Biography',
        'Jim is a native of Charlevoix and retired information technology (IT) project and program manager. Jim spent 14 years of his professional career designing Child Welfare systems for the Michigan Department of Health and Human Services. He also served as a project manager for the Michigan Department of Education for the past 7 years. Along with his IT career, Jim coached High School football for seventeen years in DeWitt, Michigan. Jim and his wife Carol reside in Charlevoix, have three grown children and six grandchildren.',
      ].join('\n\n'),
    },
  ],
  ADHD: [
    {
      title: 'Easing ADHD without meds',
      description:
        'Psychologists are using research-backed behavioral interventions that effectively treat children with ADHD.',
      href: 'https://www.apa.org/monitor/2013/02/easing-adhd',
    },
  ],
  AHSE: [
    {
      title: 'Beyond "Be Responsible"',
      description:
        'Beyond “Be Responsible” is an introductory level educational presentation from the Office of Health and Wellness Promotion at Indiana University-Purdue University Indianapolis (IUPUI)',
      href: 'https://youtube.com/embed/268JVesOhSY',
    },
    {
      title: 'BeyondDUI/DWI: Make This One Your Last One',
      description:
        'Preview video from Reelizations Media catalog for Addiction Treatment & Behavioral Health.',
      href: 'https://youtube.com/embed/XopdUea_pJM',
    },
    {
      title: 'This Place',
      description:
        'This award-winning, 15-minute film dramatically captures today&apos;s youth drinking culture. This film shows the alcohol-saturated environment kids are exposed to and the impact of underage drinking. It also offers an important glimpse into communities that are taking action to reduce alcohol problems. (c) 2006.',
      href: 'https://youtube.com/embed/E8VPZRT2wPA',
    },
    {
      title: 'A Stone’s Throw',
      description:
        'Winner of multiple international film awards, this five-minute film sensitively addresses adult behaviors toward alcohol and their impact on our kids, our communities and ourselves. The film gently urges us to reflect on our attitudes toward alcohol and empowers us to take individual and collective action – without preaching or using hard statistical data. (c) 1994.',
      href: 'https://youtube.com/embed/0EcCH7kJYGE',
    },
    {
      title: 'Lift It Up',
      description:
        'This riveting seven-minute film draws a straight line between alcohol and violence, it tackles the controversial issue of the role alcohol plays in assault, murder, child abuse, rape, emotional trauma and physical violence. Starting softly – through poetry – the film unmasks the immensity of the issue, then cranks up the volume to get to the heart of it, and concludes with an inspirational challenge for all of us. (c) 1996',
      href: 'https://youtube.com/embed/4WrWKWeF2Gg',
    },
  ],
  HEAL: [
    {
      title: '#StopThisTraffic',
      description:
        'Some things in this world should not exist. The sexual exploitation of children is one of those things. #StopThisTraffic surfaces some of the stories and statistics of children exploited in West Michigan alone.',
      href: 'https://www.youtube.com/embed/U0j8fOdFuJI',
    },
    {
      title: 'Be A Man: Joe Ehrmann at TEDxBaltimore 2013',
      description:
        'Joe Ehrmann has been an educator, author, activist, pastor and coach for more than 25 years. He was a college All-American athlete who played professional football for 13 years. Among numerous awards, Joe has been named "The Most Important Coach in America" for his work to transform the culture of sports.',
      href: 'https://www.youtube.com/embed/jVI1Xutc_Ws',
    },
  ],
}
