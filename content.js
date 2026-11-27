// Photo paths are relative to the website. Set photo to null to hide the portrait.
export const profile = {
  name: "Ahmed Salem Mohamed Elhady",
  shortName: "Ahmed Elhady",
  affiliation: "HiTZ Lab · University of the Basque Country (UPV/EHU)",
  bio: [
    [
      "I’m Salem, a final-year PhD researcher at UPV/EHU advised by ",
      { text: "Mikel Artetxe", url: "https://www.mikelartetxe.com/" },
      " and ",
      { text: "Eneko Agirre", url: "https://eagirre.github.io/" },
      ". I was an intern of technical staff at Cohere in the multilingual team working on agents.",
    ],
    ["I focus on the advancement of multilingual reasoning capabilities in LLMs via reinforcement learning and on-policy distillation."],
    ["Before my PhD, I worked as an applied data scientist at Microsoft’s Bing Trust & Safety Alignment team and at Implicit-ai (formerly Agolo) as an NLP/AI Engineer."],
  ],
  currentWork: "I study how large language models reason across languages and how to improve their multilingual capabilities.",
  interests: ["Multilingual Reasoning", "Reinforcement Learning", "On-Policy Distillation", "LLM Agents"],
  photo: "portrait.jpg",
  linkedin: "https://www.linkedin.com/in/aselhady/",
};

export const experience = [
  {
    period: "Mar 2024–Present", role: "Research Assistant", organization: "HiTZ Zentroa (UPV/EHU)", kind: "Work",
    place: "San Sebastián, Spain", logo: "upv-ehu.png",
    highlight: "Researching multilingual reasoning in LLMs through reinforcement learning and on-policy distillation.",
  },
  {
    period: "Jun 2026–Nov 2026", role: "Member of Technical Staff (Intern)", organization: "Cohere", kind: "Work",
    place: "Toronto, Canada", logo: "cohere.svg",
    highlight: "Worked on agents on Cohere’s multilingual team.",
  },
  {
    period: "Nov 2022–Mar 2024", role: "NLP Applied Data Scientist II", organization: "Microsoft", kind: "Work",
    logo: "microsoft.svg",
    highlight: "Worked on trust and safety alignment for Microsoft Bing.",
  },
  {
    period: "Jul 2020–Jul 2023", role: "NLP/ML Engineer", organization: "Implicit (formerly Agolo)", kind: "Work",
    logo: "implicit.png",
    highlight: "Built NLP systems for enterprise document summarization and search.",
  },
  {
    period: "Jan 2024–Mar 2028 (expected)", role: "PhD in Computer Science", organization: "EHU (UPV/EHU)", kind: "Education",
    logo: "upv-ehu.png",
    highlight: "Conducting doctoral research in the HiTZ-Ixa group.",
  },
  {
    period: "Feb 2022–Jun 2024", role: "MS in Artificial Intelligence", organization: "Zewail City of Science and Technology", kind: "Education",
    logo: "zewail-city.svg",
    highlight: "Graduated with a 4.0/4.0 GPA and received the Top Students Scholarship.",
  },
  {
    period: "Sep 2015–Sep 2020", role: "BSc in Computer Engineering", organization: "Cairo University", kind: "Education",
    logo: "cairo-university.png",
    highlight: "Graduated with honors, ranked second in the class, and earned a 3.94/4.0 GPA.",
  },
  {
    period: "2012–2015", role: "High School Diploma in Mathematics", organization: "Maadi Canal Schools", kind: "Education",
    highlight: "Graduated with a score of 98.5% and a 4.0/4.0 GPA.",
  },
];

// Update modified (YYYY-MM-DD) when editing a note.
export const noteTopics = [
  {
    id: "ai-and-software",
    label: "AI and Software",
    notes: [
      { modified: "2026-11-27", title: "The tokenization tax", text: "Subword tokenization can create a hidden computational and financial cost for speakers of languages that use non-Latin scripts." },
      { modified: "2026-11-27", title: "Cross-lingual transfer", text: "What can a model learn in one language and carry into another? That question is at the center of cross-lingual transfer." },
    ],
  },
  {
    id: "contemplations",
    label: "Religion",
    notes: [],
  },
  {
    id: "new-to-fatherhood",
    label: "New to Fatherhood",
    notes: [
      { modified: "2026-11-27", title: "Cooking together", text: "I’ve been learning to cook with my daughter. It’s become a hobby and one of my favorite ways to spend time together." },
    ],
  },
  {
    id: "misc",
    label: "Misc",
    notes: [
      { modified: "2026-11-27", title: "By the beach", text: "Away from my desk, you’ll often find me biking by the beach. When it’s raining, I’m probably at home catching up on a series." },
      { modified: "2026-11-27", title: "What I see", text: "Photography is one way I capture the beauty I see in the world when words aren’t what I reach for." },
    ],
  },
];
