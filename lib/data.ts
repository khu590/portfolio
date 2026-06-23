// lib/data.ts
// Single source of truth for all portfolio content.
// Edit this file to update the site — no need to touch components.

export const profile = {
  name: "Khushi Bijkal",
  role: "Data Analyst → AI/ML Engineer",
  tagline: "I turn messy production data into stable systems and clear decisions.",
  location: "Dublin, Ireland",
  email: "khushi.n.bijkal@gmail.com",
  phone: "+353 89 202 8094",
  github: "https://github.com/khu590",
  linkedin: "https://www.linkedin.com/in/khushi-bijkal/",
};

export const stats = [
  { value: "25+", label: "incidents resolved / week" },
  { value: "30%", label: "reduction in recurring issues" },
  { value: "8.5", label: "GPA · First Class Honours" },
  { value: "1:1", label: "MSc grade (expected)" },
];

export const skills = [
  {
    category: "Data & Analytics",
    color: "amber",
    items: ["PostgreSQL", "Python", "Power BI", "KPI Reporting", "Data Validation", "ETL Workflows"],
  },
  {
    category: "ML & AI",
    color: "purple",
    items: ["Scikit-learn", "TensorFlow / Keras", "CNNs / RNNs", "XAI", "ARIMA", "Statistical Modeling"],
  },
  {
    category: "Cloud & DevOps",
    color: "amber",
    items: ["AWS", "Azure", "Docker", "Git", "Linux", "Flask", "REST APIs"],
  },
  {
    category: "Data Engineering",
    color: "purple",
    items: ["PySpark", "Hadoop / HDFS", "MongoDB", "MySQL", "Database Mgmt"],
  },
  {
    category: "Production & Ops",
    color: "amber",
    items: ["Incident Management", "SLA Monitoring", "Root Cause Analysis", "ITIL V4"],
  },
  {
    category: "Standards",
    color: "purple",
    items: ["GDPR / Data Ethics", "HIPAA-aware", "Prompt Engineering", "Claude Code"],
  },
];

export const experience = [
  {
    type: "work" as const,
    role: "Analyst — DevOps & Production",
    company: "Société Générale",
    sub: "Global Solution Centre · Bengaluru, India",
    date: "Aug 2023 – Aug 2025",
    sortDate: "2023-08",
    badge: "Full-time · 2 yrs",
    current: false,
    highlights: [
      "Resolved 25+ production incidents and service requests weekly using SQL-based investigations, ensuring SLA compliance and minimal business disruption.",
      "Identified root causes of recurring application and batch failures through deep SQL analysis, materially improving system stability.",
      "Implemented operational best practices that contributed to a 30% reduction in recurring incidents.",
      "Translated business requirements into technical solutions across cross-functional teams, improving knowledge sharing and incident prevention.",
      "Supported automation of routine monitoring and reporting, reducing manual effort and improving triage response times.",
    ],
  },
  {
    type: "work" as const,
    role: "Full-Stack Engineering Intern",
    company: "Tequed Labs",
    sub: "Bengaluru, India",
    date: "Aug 2022 – Sep 2022",
    sortDate: "2022-08",
    badge: "Internship · 2 mo",
    current: false,
    highlights: [
      "Built RESTful APIs and backend services using Python, MySQL, and MongoDB to support scalable, secure data processing.",
      "Optimised SQL queries and database performance, reducing latency and improving data retrieval efficiency.",
      "Designed API integration flows enabling seamless communication between AI systems and external platforms.",
      "Debugged and tested backend services, improving application stability during release cycles.",
    ],
  },
];

export const project = {
  title: "Medical Image Classification System",
  subtitle: "Healthcare AI · Deep Learning · Privacy",
  description:
    "Built a deep learning model to classify MRI images for brain tumour detection, following HIPAA-related data privacy principles. Integrated the model into a Flask-based web application for real-world deployment, with emphasis on responsible handling of sensitive healthcare data and robust preprocessing pipelines.",
  stack: ["Python", "TensorFlow / Keras", "CNNs", "Flask", "MRI Imaging", "HIPAA-aware", "Data Preprocessing"],
  metrics: [
    { value: "CNN", label: "Architecture used" },
    { value: "Flask", label: "Production deployment" },
    { value: "HIPAA", label: "Privacy framework" },
  ],
};

export const awards = [
  { title: "Spot Award", org: "Société Générale" },
  { title: "Newbie Award", org: "Société Générale" },
];

export const certifications = [
  { name: "Generative AI: Prompt Engineering Basics", issuer: "IBM" },
  { name: "Claude Code 101", issuer: "DataCamp" },
  { name: "ITIL V4 Foundation", issuer: "Axelos" },
  { name: "Google Data Analytics Certificate", issuer: "Google" },
  { name: "Power BI Certification", issuer: "DataCamp" },
  { name: "AI-ML Virtual Internship Certificate", issuer: "AICTE" },
  { name: "Artificial Intelligence in Machine Learning", issuer: "NCDRC" },
];

export const education = [
  {
    type: "education" as const,
    degree: "MSc Computing (Data Analytics)",
    school: "Dublin City University",
    location: "Dublin, Ireland",
    date: "Sept 2025 – Aug 2026",
    sortDate: "2025-09",
    current: true,
    grade: "1:1 Expected",
    modules: "Cloud Tech · Advanced ML (XAI, CNN, RNN) · Statistical Modeling · Big Data (Spark & Hadoop) · Time Series (ARIMA) · GDPR / Data Ethics",
  },
  {
    type: "education" as const,
    degree: "BE Computer Science Engineering",
    school: "Dayananda Sagar Academy of Technology",
    location: "Bengaluru, India",
    date: "June 2019 – June 2023",
    sortDate: "2019-06",
    current: false,
    grade: "GPA 8.5/10 · First Class Hons",
    modules: "Data Structures & Algorithms · OS · Linux · Java · C / C++ · Network Systems · Databases (SQL / NoSQL)",
  },
];
