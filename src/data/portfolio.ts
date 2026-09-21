export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  details: string[];
}
export interface Project {
  id: string;
  title: string;
  tag: string;
  branch: string;
  description: string;
  technologies: string[];
  workflow: string;
  number: string;
}
export interface TechGroup {
  title: string;
  technologies: string[];
}
export interface Education {
  date: string;
  title: string;
  institution: string;
}
export interface BeyondCodeItem {
  id: string;
  title: string;
  description: string;
  icon: "activity" | "goal" | "cpu";
}

export const experiences: Experience[] = [
  {
    id: "experience-0",
    title: "Frontend Developer / IT Consultant",
    company: "Systemi S.r.l. · cliente enterprise settore bancario",
    date: "08.2025 → NOW",
    details: [
      "Sviluppo frontend di web application enterprise con React.",
      "Migrazione di una web application da Angular a React.",
      "Supporto React in un progetto Salesforce, con gestione autonoma della sezione applicativa React.",
      "Utilizzo strutturato di AI e Codex per coding, test, debugging, refactoring e sperimentazione di soluzioni tecniche.",
    ],
  },
  {
    id: "experience-1",
    title: "Progetti personali & studio",
    company: "Frontend / AI-assisted Development",
    date: "06.2025 → 08.2025",
    details: [
      "Web app sperimentali nate per risolvere problemi concreti legati ad hobby e attività sportive.",
      "Analisi del problema, UX/UI mobile-first, modellazione dati, implementazione e iterazione end-to-end.",
      "React, TypeScript, Vite, servizi BaaS/realtime e utilizzo intensivo dell'AI durante il ciclo di sviluppo.",
    ],
  },
  {
    id: "experience-2",
    title: "Frontend / Web Developer",
    company: "Zerob S.r.l.",
    date: "01.2020 → 05.2025",
    details: [
      "ERP web app, dashboard industriali real-time con React/MQTT e portali di statistiche sportive.",
      "Consulenza automotive con React, LitElement, Node.js e MongoDB.",
      "Progetti e-commerce internazionali su VTEX con React, TypeScript, Node.js e GraphQL.",
    ],
  },
  {
    id: "experience-3",
    title: "Web Designer",
    company: "ToriNet · freelance",
    date: "01.2018 → 11.2019",
    details: [
      "Siti web per piccole attività: progettazione, sviluppo, SEO, pubblicazione e gestione del rapporto con il cliente.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "project-0",
    title: "Event Management Platform",
    tag: "SPORT / EVENT TECH",
    branch: "feat/realtime",
    description:
      "Web app per gestire un evento sportivo con ruoli differenti, scoring, display dedicati, logiche di gioco e aggiornamenti realtime.",
    technologies: ["React", "TypeScript", "Supabase", "Realtime"],
    workflow: "problem → architecture → product",
    number: "01",
  },
  {
    id: "project-1",
    title: "Tournament Management",
    tag: "SPORT / MANAGEMENT",
    branch: "feat/tournaments",
    description:
      "Strumento per digitalizzare tornei, classifiche e operazioni quotidiane, progettato partendo dai flussi reali di utilizzo.",
    technologies: ["React", "TypeScript", "Vite", "Data"],
    workflow: "workflow → UI → automation",
    number: "02",
  },
  {
    id: "project-2",
    title: "Coaching Field Tools",
    tag: "COACHING / FIELD TOOLS",
    branch: "feat/mobile-first",
    description:
      "Esperimenti mobile-first per aiutare un allenatore a gestire sessioni, giocatori, valutazioni e informazioni direttamente sul campo.",
    technologies: ["React", "Mobile-first", "UX", "AI-assisted"],
    workflow: "need → prototype → iterate",
    number: "03",
  },
];

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "SCSS",
      "Tailwind",
      "Framer Motion",
      "LitElement",
    ],
  },
  {
    title: "State & Data",
    technologies: [
      "Redux Toolkit",
      "Context API",
      "TanStack Query",
      "REST",
      "GraphQL",
      "MQTT",
    ],
  },
  {
    title: "Backend & tooling",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Supabase",
      "Vite",
      "Git",
      "Jest / RTL",
      "Storybook",
    ],
  },
  {
    title: "AI workflow",
    technologies: [
      "Codex",
      "Prototyping",
      "Code review",
      "Testing",
      "Debugging",
      "Refactoring",
    ],
  },
];

export const education: Education[] = [
  {
    date: "2016 → 2017",
    title: "Tecnico grafico per multimedia e web design",
    institution: "Immaginazione e Lavoro · Torino",
  },
  {
    date: "2015",
    title: "Perito industriale capotecnico — Informatica",
    institution: "ITIS A. Avogadro · Torino",
  },
];

export const profile = {
  name: "Alex Pagliasso",
  role: "Frontend Developer",
  location: "Torino",
  email: "alexpagliasso@gmail.com",
  languages: "Italiano / Inglese",
  eyebrow: "// FRONTEND DEVELOPER · TORINO",
  lead: "Costruisco interfacce React e TypeScript, lavoro su prodotti enterprise e uso l'AI come parte concreta del mio workflow di sviluppo.",
  chips: [
    "React",
    "TypeScript",
    "Next.js",
    "AI-assisted dev",
    "Codex",
    "Node.js",
  ],
  aboutTitle: "Dal problema al prodotto.",
  about:
    "Mi occupo principalmente di frontend React e TypeScript. Negli anni ho lavorato su prodotti enterprise, e-commerce, dashboard real-time e migrazioni applicative. Nei progetti personali parto invece da problemi concreti che incontro nello sport e nelle attività quotidiane e provo a trasformarli in strumenti realmente utilizzabili.",
  stats: [
    {
      value: "8+",
      label: "anni nello sviluppo web",
    },
    {
      value: "React",
      label: "stack principale",
    },
    {
      value: "AI",
      label: "integrata nel workflow",
    },
  ],
};

export const beyondCode = {
  title: "Beyond Code",
  imageAlt:
    "Illustrazione pixel art dello spazio di Alex, tra programmazione, sport e tecnologia",
  placeholder: "Sport, curiosità e nuove idee.",
};

export const beyondCodeItems: BeyondCodeItem[] = [
  {
    id: "padel",
    title: "Padel",
    icon: "activity",
    description:
      "Pratico padel con continuità e partecipo a competizioni e tornei. È uno sport che mi appassiona per la combinazione di tecnica, strategia, lettura del gioco e collaborazione con il compagno.",
  },
  {
    id: "coaching",
    title: "Calcio & Coaching",
    icon: "goal",
    description:
      "Sono allenatore di calcio giovanile. Pianifico allenamenti, gestisco il gruppo e lavoro sullo sviluppo tecnico e personale dei giovani giocatori. Un'esperienza che porto anche nel lavoro: comunicazione, organizzazione, leadership e capacità di adattarsi alle persone e alle situazioni.",
  },
  {
    id: "technology",
    title: "Tecnologia & Curiosità",
    icon: "cpu",
    description:
      "La tecnologia per me non si ferma al lavoro. Mi piace sperimentare nuovi strumenti, AI e idee di prodotto, spesso partendo da problemi che incontro nello sport o nella vita quotidiana e trasformandoli in piccoli progetti e applicazioni.",
  },
];

export const terminalSteps = [
  {
    command: "whoami",
    highlight: "Frontend Developer",
    output: " · React / TypeScript · Torino",
  },
  {
    command: "current_stack",
    highlight: "",
    output: "React · TypeScript · Next.js · Supabase",
  },
  {
    command: "workflow --ai",
    highlight: "",
    output: "Codex · testing · debugging · refactoring · prototyping",
  },
  { command: "status", highlight: "building useful things_", output: "" },
];
