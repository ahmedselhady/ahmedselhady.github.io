// gitprofile.config.ts
import {
  faUpwork,
  faMicrosoft
} from "@fortawesome/free-brands-svg-icons";

const CONFIG = {
  github: {
    username: 'ahmedselhady', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: false, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['arifszn/gitprofile', 'arifszn/pandora'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'Personal Projects, Freelance, and Consultancy',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {          
          title: 'Engineering: TCEngine Document Intelligence Platform',
          description:
            'Built and supervised the development of the document intelligence platform for Trade Collaboration Engine. The multi-module platform included pdf parsing, sequence extraction and classification, and Generative AI integration. The platform helped providing outstanding performances for many clients.',
          imageUrl:
            'https://media.licdn.com/dms/image/v2/D560BAQFefQdjE3uVJQ/company-logo_200_200/company-logo_200_200/0/1680638060537/trade_collaboration_engine_logo?e=2147483647&v=beta&t=Lx3cVXegkgs6WZ-W6mdzxAiCtfm57YyXXJ7M-NDXlNg',
          link: 'https://tcengine.com/',
        },
        {


          title: 'Consultancy: Al Daryiah Generative AI',
          description:
            'Provided system architecture design to build an interactive generative AI solution.',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/At-Turaif_District_of_Diriyah%2C_Saudi_Arabia.jpg/1200px-At-Turaif_District_of_Diriyah%2C_Saudi_Arabia.jpg',
          link: '#',
        },
        {
          title: 'Freelance: Knowledge Graph building from PDFs',
          description:
            'Extraction and refinement of Knowledge graph according to a given schema. OpenIE is used to do initial extractions, then Mistral-7b-v0.3 is employed to refine extractions and schema. The final graph is retrieved and utilized in retreival augmented generation (RAG) for question answering.',
          imageUrl:
            'https://github.com/ahmedselhady/ahmedselhady.github.io/blob/main/src/assets/img/daryiah.jpeg',
          link: '#',
        },
        {
          title: 'Typical Company: Intelligent Scheduling System for Irrigation Pipelines',
          description:
            'Web-based application to schedule irrigation jobs for farming enterprises. The application is consumed through Typical Engineering Solutions company, managing farming solutions for multiple enterprises in Saudi Aribia, Egypt, and Others.',
          imageUrl:
            'https://github.com/ahmedselhady/ahmedselhady.github.io/blob/main/src/assets/img/typical_scheduler.jpeg',
          link: '#',
        },
      ],
    },
  },
  seo: {
    title: 'Profile of Ahmed Salem Mohamed Elhady Mohamed',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'aselhady',
    twitter: 'ahsalem511',
    scholar:'9gk2mKsAAAAJ&hl',
    researchGate: '',
    facebook: '',
    instagram: 'ahmed.bin.salem',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: '',
    phone: '',
    email: 'ahelhady511@gmail.com',
  },
  resume: {
    fileUrl:
      'https://drive.google.com/file/d/1LsvIF-ihB7OG1sUz6ViusiCIeb-EKZLZ/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Generative AI',
    'DL/ML',
    'LLMs',
    'pytorch',
    'tensorflow',
    'React.js',
    'Node.js',
    'Neo4J',
    'PostgresSql'
  ],
  experiences: [
    {
      company: 'Upwork',
      position: 'Freelancer: AI Engineer -  Top Rated',
      from: 'MAR 2024',
      to: 'PRESENT',
      companyLink: 'https://www.upwork.com/freelancers/~01d886eb5ee56e5f02?mp_source=share',
      companyIcon: faUpwork
    },
    {
      company: 'Microsoft',
      position: 'Applied Data Scientist II',
      from: 'AUG 2023',
      to: 'MAR 2024',
      companyLink: 'https://www.youtube.com/watch?v=KWcDW1gTobQ',
      companyIcon: faMicrosoft

    },
    {
      company: 'Agolo',
      position: 'NLP- Applied Data Scientist II',
      from: 'JAN 2023',
      to: 'JUL 2023',
      companyLink: 'https://www.agolo.com/',
    },
    {
      company: 'Agolo',
      position: 'NLP- Applied Data Scientist',
      from: 'JUL 2020',
      to: 'DEC 2022',
      companyLink: 'https://www.agolo.com/',
    },
  ],
  Teaching: [
    {
      company: 'Cairo University, Faculty of Engineering - Computer Engineering',
      position: 'Graduate Teaching Assistant',
      from: 'OCT 2020',
      to: 'JAN 2022',
      companyLink: 'https://cmp.eng.cu.edu.eg/en/',
    },
    {
      company: 'Cairo University, Faculty of Engineering - Computer Engineering',
      position: 'Graduate Teaching Assistant',
      from: 'OCT 2020',
      to: 'JAN 2022',
      companyLink: 'https://cmp.eng.cu.edu.eg/en/',
    },
  ],
  educations: [
    {
      institution: 'University of the Basque Country (UPV/EHU), Language Analysis and Processing Department',
      degree: 'Ph.D.',
      from: '2024',
      to: '2028',
      grade: '',
      thesis: ""
    },
    {
      institution: 'University of Science and Technology (UST) at Zewail City',
      degree: 'MSc in Computer Information and Mathematics',
      from: '2022',
      to: '2024',
      grade: 'GPA: 4.0/4.0',
      thesis: "Thesis: Improving Factual Accuracy in Multi-document Summarization of Clinical Documents"
    },
    {
      institution: 'Cairo University, Faculty of Computer Engineering',
      degree: 'BSc in Computer and Communications Engineering',
      from: '2015',
      to: '2020',
      grade: 'GPA: 3.94/4.0',
      thesis: ""
    },
  ],
  publications: [
    {
      title: 'Improving Factuality in Clinical Abstractive Multi-Document Summarization by Guided Continued Pre-training',
      conferenceName: '',
      journalName: 'NAACL 2024',
      prefix_auth: "",
      myself: "Ahmed Elhady,",
      post_authors: 'Khaled Mostafa Elsayed, Eneko Agirre, Mikel Artetxe',
      link: 'https://aclanthology.org/2024.naacl-short.66.pdf',
      description:
        'Factual accuracy is an important property of neural abstractive summarization models, especially in fact-critical domains such as the clinical literature. In this work, we introduce a guided continued pre-training stage for encoder-decoder models that improves their understanding of the factual attributes of documents, which is followed by supervised finetuning on summarization. Our approach extends the pre-training recipe of BART to incorporate 3 additional objectives based on PICO spans, which capture the population, intervention, comparison and outcomes related to a clinical study. Experiments on multidocument summarization in the clinical domain demonstrate that our approach is competitive with prior work, improving the quality and factuality of the summaries and achieving the best published results in factual accuracy on the MSLR task.',
    },
    
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'arifszn', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'autumn',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with ❤️`,

  enablePWA: true,
};

export default CONFIG;
