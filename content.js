// Photo paths are relative to the website. Set photo to null to hide the portrait.
export const profile = {
  name: "Ahmed Salem Mohamed Elhady",
  shortName: "Ahmed Elhady",
  affiliation: "HiTZ Lab · University of the Basque Country (UPV/EHU)",
  bio: "I’m Salem, a PhD researcher advised by Mikel Artetxe and Eneko Agirre. Before my PhD, I worked as an applied data scientist at Microsoft’s Bing Trust & Safety Alignment team and at Implicit-ai (formerly Agolo).",
  currentWork: "I study how large language models reason across languages and how to improve their multilingual capabilities.",
  interests: ["Multilingual LLMs", "Reasoning", "Cross-lingual Transfer", "Multilingual Reasoning"],
  photo: "portrait.jpg",
  linkedin: "https://www.linkedin.com/in/aselhady/",
};

export const experience = [
  { period: "2026", role: "Research Intern", organization: "Cohere Labs", kind: "Work" },
  { period: "2024–Present", role: "PhD Research Student", organization: "HiTZ Lab · UPV/EHU", kind: "Education", place: "Basque Country, Spain" },
  { period: "2022–2024", role: "Applied Data Scientist", organization: "Microsoft · Bing Trust & Safety", kind: "Work" },
  { period: "2020–2022", role: "Applied Data Scientist", organization: "Implicit-ai (Agolo)", kind: "Work" },
  { period: "Through 2020", role: "BSc in Computer Engineering", organization: "Cairo University", kind: "Education", place: "Egypt" },
];

export const noteTopics = [
  {
    id: "ai-and-software",
    label: "AI and Software",
    notes: [
      { title: "The tokenization tax", text: "Subword tokenization can create a hidden computational and financial cost for speakers of languages that use non-Latin scripts." },
      { title: "Cross-lingual transfer", text: "What can a model learn in one language and carry into another? That question is at the center of cross-lingual transfer." },
    ],
  },
  {
    id: "contemplations",
    label: "Contemplations",
    notes: [
      { title: "By the beach", text: "Away from my desk, you’ll often find me biking by the beach. When it’s raining, I’m probably at home catching up on a series." },
      { title: "What I see", text: "Photography is one way I capture the beauty I see in the world when words aren’t what I reach for." },
    ],
  },
  {
    id: "new-to-fatherhood",
    label: "New to Fatherhood",
    notes: [
      { title: "Cooking together", text: "I’ve been learning to cook with my daughter. It’s become a hobby and one of my favorite ways to spend time together." },
    ],
  },
];
