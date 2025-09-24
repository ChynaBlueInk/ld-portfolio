// app/professionals/_mock.ts

export type Service = {
  title: string;
  description?: string;
};

export type PortfolioItem = {
  title: string;
  type?: string;           // e.g., "eLearning", "Case Study"
  description?: string;
  link: string;            // URL
};

export type ExperienceItem = {
  company: string;
  role: string;
  start?: string;          // "2022-01" (YYYY-MM)
  end?: string;            // "2023-10" or "Present"
  period?: string;         // pre-formatted fallback, e.g., "2021–Present"
  description?: string;
};

export type Testimonial = {
  text: string;
  author: string;
  role?: string;
};

export type Contact = {
  email?: string;
  linkedin?: string;
  website?: string;
};

export type Professional = {
  id: string;
  // name can be derived from first/last; keeping both so we can align with your form
  name: string;
  firstName?: string;
  lastName?: string;

  title?: string;
  location?: string;
  region?: string;

  image?: string;
  coverImage?: string;

  bio?: string;

  yearsExperience?: number;
  availability?: string;    // "10–15 hrs/week"
  rate?: string;            // "$70–$90/hr"

  skills?: string[];
  services?: string[];      // for list chips
  servicesDetailed?: Service[]; // for detail page cards

  tools?: string[];
  languages?: string[];
  certifications?: string[];

  portfolio?: PortfolioItem[];
  experience?: ExperienceItem[];
  testimonials?: Testimonial[];

  contact?: Contact;
};

// Helper for concise periods
const p = (s: string, e?: string) => `${s}–${e || "Present"}`;

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: "demo-1",
    name: "Alex Rivera",
    firstName: "Alex",
    lastName: "Rivera",
    title: "Instructional Designer",
    region: "APAC",
    location: "Wellington, NZ",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 7,
    availability: "10–15 hrs/week",
    rate: "$70–$90/hr",
    bio:
      "Designs blended learning, simulations, and scenario-based modules for enterprise rollouts. Focused on measurable outcomes and accessibility.",
    skills: ["Instructional Design", "Storyboarding", "Assessment Design", "Accessibility (WCAG)"],
    services: ["eLearning Course Creation", "Curriculum Design", "Facilitation Toolkits"],
    servicesDetailed: [
      { title: "eLearning Course Creation", description: "Storyline/Rise builds with branching, quizzes, and WCAG AA." },
      { title: "Curriculum Design", description: "Program blueprints, learning paths, and assessment strategy." },
      { title: "Facilitation Toolkits", description: "Slide decks, activities, and facilitator guides." },
    ],
    tools: ["Articulate 360", "Rise", "Vyond", "Miro", "Camtasia"],
    languages: ["English", "Portuguese (basic)"],
    certifications: ["CPLP (ATD)", "Inclusive Design Micro-credential"],
    portfolio: [
      { title: "Scenario Module: Retail Safety", type: "eLearning", description: "Branching scenarios with feedback", link: "https://example.com/retail-safety" },
      { title: "Blended Program Case Study", type: "Case Study", description: "90-day rollout with analytics", link: "https://example.com/case-study" },
    ],
    experience: [
      { company: "RetailCo", role: "Instructional Designer", period: p("2021"), description: "Built 20+ modules; 18% reduction in incidents." },
      { company: "HealthOrg", role: "ID Consultant", period: "2019–2021", description: "Onboarding & compliance program across regions." },
    ],
    testimonials: [
      { text: "Our incident rates dropped within a quarter.", author: "Sam K.", role: "Ops Manager" },
    ],
    contact: { email: "alex@example.com", linkedin: "https://linkedin.com/in/alex-rivera" },
  },

  {
    id: "demo-2",
    name: "Priya Shah",
    firstName: "Priya",
    lastName: "Shah",
    title: "L&D Strategist",
    region: "EMEA",
    location: "London, UK",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 12,
    availability: "Project-based",
    rate: "Contact for quote",
    bio:
      "Aligns capability frameworks with measurable learning outcomes. Partners with stakeholders to deliver scalable programs.",
    skills: ["Capability Mapping", "Learning Analytics", "Change Management", "Stakeholder Management"],
    services: ["L&D Strategy", "Program Architecture", "Measurement & Evaluation"],
    servicesDetailed: [
      { title: "L&D Strategy", description: "Vision, roadmap, governance, and capability alignment." },
      { title: "Program Architecture", description: "Cohort models, pathways, and role-based tracks." },
      { title: "Measurement & Evaluation", description: "Kirkpatrick models and dashboarding." },
    ],
    tools: ["Power BI", "Excel", "Notion", "Asana"],
    languages: ["English", "Hindi"],
    certifications: ["Kirkpatrick Evaluation (Bronze)", "Prosci ADKAR"],
    portfolio: [
      { title: "Capability Framework Template", type: "Template", description: "Reusable capability model", link: "https://example.com/framework" },
      { title: "Analytics Dashboard Demo", type: "Data Viz", description: "L&D KPI dashboard walkthrough", link: "https://example.com/analytics" },
    ],
    experience: [
      { company: "FinServe", role: "Head of L&D", period: "2020–2024", description: "Scaled multi-market academies." },
      { company: "Consulting (Various)", role: "L&D Consultant", period: "2016–2020" },
    ],
    testimonials: [
      { text: "Brought clarity to our scattered training efforts.", author: "D. Patel", role: "VP People" },
    ],
    contact: { email: "priya@example.com", website: "https://priyalnd.com" },
  },

  {
    id: "demo-3",
    name: "Chris Tan",
    firstName: "Chris",
    lastName: "Tan",
    title: "eLearning Developer",
    region: "Americas",
    location: "Vancouver, CA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 5,
    availability: "20 hrs/week",
    rate: "$60–$75/hr",
    bio:
      "Builds SCORM/xAPI content, rapid prototypes, and accessibility-first learning experiences. Fast iterations, clean UI.",
    skills: ["xAPI", "SCORM", "Responsive Design", "Media Production"],
    services: ["Module Development", "Media Editing", "LMS Upload & QA"],
    servicesDetailed: [
      { title: "Module Development", description: "Storyline/Captivate builds with robust interactions." },
      { title: "Media Editing", description: "Audio clean-up, subtitles, motion graphics basics." },
      { title: "LMS Upload & QA", description: "Packaging, tracking, QA in target LMS." },
    ],
    tools: ["Storyline", "Captivate", "Adobe Audition", "Figma"],
    languages: ["English", "Mandarin (conversational)"],
    certifications: ["xAPI Fundamentals", "Accessible Multimedia"],
    portfolio: [
      { title: "xAPI Demo Module", type: "eLearning", description: "Tin Can tracking events", link: "https://example.com/xapi" },
      { title: "Interactive Microlearning", type: "Microlearning", description: "Short form, mobile-first learning", link: "https://example.com/microlearning" },
    ],
    experience: [
      { company: "NorthEd", role: "eLearning Developer", period: "2022–Present" },
      { company: "MediaWorks", role: "Junior Dev", period: "2020–2022" },
    ],
    contact: { email: "chris@example.com" },
  },

  {
    id: "demo-4",
    name: "Maria Santos",
    firstName: "Maria",
    lastName: "Santos",
    title: "Facilitator & Coach",
    region: "APAC",
    location: "Dili, Timor-Leste",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 9,
    availability: "Workshops & sprints",
    rate: "$800/day onsite • $120/hr virtual",
    bio:
      "Designs and delivers high-energy workshops for leadership, communication, and remote teamwork. Culturally responsive facilitation.",
    skills: ["Facilitation", "Coaching", "Group Dynamics", "Session Design"],
    services: ["Virtual Workshops", "Train-the-Trainer", "Team Offsites"],
    servicesDetailed: [
      { title: "Virtual Workshops", description: "Interactive workshops on collaboration and feedback." },
      { title: "Train-the-Trainer", description: "Toolkits and practice-focused facilitation training." },
      { title: "Team Offsites", description: "Goal setting, rituals, and alignment." },
    ],
    tools: ["Zoom", "Mentimeter", "Mural", "Google Workspace"],
    languages: ["Tetun", "Portuguese", "English"],
    certifications: ["ICF ACC", "Facilitation Masterclass"],
    portfolio: [
      { title: "Team Collaboration Lab", type: "Workshop", description: "2-day facilitation lab", link: "https://example.com/collab-lab" },
      { title: "Virtual Facilitation Toolkit", type: "Toolkit", description: "Templates and activities", link: "https://example.com/toolkit" },
    ],
    experience: [
      { company: "Indigo Facilitation", role: "Lead Facilitator", period: "2021–Present" },
      { company: "Freelance", role: "Coach", period: "2016–2021" },
    ],
    testimonials: [
      { text: "The most engaging offsite we've had.", author: "K. Ramos", role: "Director" },
    ],
    contact: { email: "maria@example.tl" },
  },

  {
    id: "demo-5",
    name: "Jordan Lee",
    firstName: "Jordan",
    lastName: "Lee",
    title: "Learning Engineer (AI)",
    region: "APAC",
    location: "Auckland, NZ",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 6,
    availability: "Flexible",
    rate: "$85–$110/hr",
    bio:
      "Prototypes AI-powered learning tools, adaptive pathways, and data-informed feedback loops. Ensures safety and accuracy.",
    skills: ["Prompt Design", "A/B Testing", "Data Pipelines", "RAG Concepts"],
    services: ["AI Content Assist", "Learning Bots", "Analytics Experiments"],
    servicesDetailed: [
      { title: "AI Content Assist", description: "Structured prompts and templates for SMEs/trainers." },
      { title: "Learning Bots", description: "FAQ tutors, retrieval, and conversation design." },
      { title: "Analytics Experiments", description: "A/B tests with clean data collection." },
    ],
    tools: ["Python", "Next.js", "LangChain", "OpenAI API"],
    languages: ["English"],
    certifications: ["Responsible AI (short course)", "DataViz Essentials"],
    portfolio: [
      { title: "Adaptive Quiz Prototype", type: "Prototype", description: "Branching with difficulty scaling", link: "https://example.com/adaptive-quiz" },
      { title: "AI Coach Demo", type: "Demo", description: "Socratic assistant for onboarding", link: "https://example.com/coach" },
    ],
    experience: [
      { company: "LearnTech Labs", role: "Learning Engineer", period: "2023–Present" },
      { company: "EduData", role: "Analyst", period: "2019–2023" },
    ],
    contact: { email: "jordan@example.com" },
  },

  {
    id: "demo-6",
    name: "Nguyen Anh",
    firstName: "Nguyen",
    lastName: "Anh",
    title: "LMS Admin & Tech Ops",
    region: "EMEA",
    location: "Berlin, DE",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg",
    yearsExperience: 8,
    availability: "15–25 hrs/week",
    rate: "€60–€80/hr",
    bio:
      "Launches and maintains LMS instances, integrates SSO, and automates enrollments. Strong QA and documentation.",
    skills: ["LMS Config", "SSO/SAML", "Automations", "QA"],
    services: ["LMS Setup", "Migration", "Reporting & Compliance"],
    servicesDetailed: [
      { title: "LMS Setup", description: "Tenant config, roles, permissions, and branding." },
      { title: "Migration", description: "Content packaging, metadata, and history transfer." },
      { title: "Reporting & Compliance", description: "Dashboards, exports, and audits." },
    ],
    tools: ["Moodle", "LearnDash", "SCORM Cloud", "Zapier"],
    languages: ["English", "German", "Vietnamese"],
    certifications: ["ITIL Foundation", "Moodle Admin"],
    portfolio: [
      { title: "Moodle Migration Notes", type: "Guide", description: "End-to-end checklist", link: "https://example.com/migration" },
      { title: "Compliance Reporting Pack", type: "Pack", description: "Canned dashboards and queries", link: "https://example.com/reporting" },
    ],
    experience: [
      { company: "EduOps GmbH", role: "LMS Admin", period: "2021–Present" },
      { company: "Acme Uni", role: "Learning Tech", period: "2017–2021" },
    ],
    contact: { email: "nguyen@example.de" },
  },
];
