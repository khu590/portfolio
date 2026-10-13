// lib/data.ts
// Single source of truth for all portfolio content.
// Edit this file to update the site — no need to touch components.
// Keep it in line with Khushi's CV: every number here must be on the CV.

export const profile = {
  name: "Khushi Bijkal",
  role: "Data Analyst · DevOps & Production Support",
  tagline: "I turn messy production data into stable systems and clear decisions.",
  location: "Dublin, Ireland",
  email: "khushi.n.bijkal@gmail.com",
  phone: "+353 89 202 8094",
  github: "https://github.com/khu590",
  linkedin: "https://www.linkedin.com/in/khushi-bijkal/",
};

// Big-number tiles on the Impact section.
export const stats = [
  { value: "25+", label: "production incidents resolved weekly in live banking systems" },
  { value: "2+ yrs", label: "data validation & production support at Société Générale" },
  { value: "116k+", label: "code samples analysed with CodeBERT for my MSc dissertation" },
  { value: "2:1", label: "MSc Computing (Data Analytics), Dublin City University" },
  { value: "2", label: "workplace awards — Spot Award & New Joinee of the Year" },
];

// Short storytelling bio, one paragraph per entry.
export const bio = [
  "For two years at Société Générale I kept live banking systems healthy: resolving 25+ production incidents a week with SQL, Linux and log analysis, running root cause analysis with infrastructure and development teams, and validating data so the numbers people relied on were right.",
  "I moved from Bengaluru to Dublin for an MSc in Data Analytics at DCU (2:1), where my dissertation used CodeBERT, GraphCodeBERT and explainable AI to detect software vulnerabilities. I'm now looking for data analyst, data engineering and DevOps roles in Ireland.",
];

export const skills = [
  {
    category: "Data & Analytics",
    color: "amber",
    items: ["SQL / PostgreSQL", "Python", "Power BI", "Advanced Excel", "PySpark", "ETL Workflows", "KPI Reporting", "Data Validation", "Data Quality Management"],
  },
  {
    category: "DevOps & Cloud",
    color: "purple",
    items: ["Azure (AZ-900)", "AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Git", "Linux"],
  },
  {
    category: "Production Support",
    color: "amber",
    items: ["Incident Management", "Root Cause Analysis", "Log Analysis", "Batch Processing", "Deployments", "ITIL 4"],
  },
  {
    category: "Machine Learning & AI",
    color: "purple",
    items: ["CodeBERT / GraphCodeBERT", "Explainable AI", "CNNs", "Hierarchical Clustering", "Statistical Modelling", "Time Series / ARIMA"],
  },
  {
    category: "Engineering",
    color: "amber",
    items: ["Java", "Spring Boot", "React", "Angular", "RESTful APIs", "Flask", "MySQL", "MongoDB", "Hadoop"],
  },
  {
    category: "Ways of Working",
    color: "purple",
    items: ["Requirements Gathering", "UAT", "Defect Management", "Technical Documentation", "Jira", "Confluence", "Postman", "GDPR & Data Ethics"],
  },
];

// Recruiter / ATS keywords — all backed by the CV. Shown as a scrolling ticker.
export const keywords = [
  "SQL", "PostgreSQL", "Python", "Power BI", "Excel", "PySpark", "ETL", "Data Validation",
  "Data Quality", "Data Governance", "KPI Reporting", "Dashboards", "Statistical Modelling",
  "Machine Learning", "Explainable AI", "GDPR", "Azure", "AWS", "Docker", "Kubernetes",
  "Terraform", "Jenkins", "CI/CD", "Git", "Linux", "Log Analysis", "Incident Management",
  "Root Cause Analysis", "ITIL 4", "UAT", "Requirements Gathering", "Jira", "Confluence",
  "REST APIs", "Spark", "Hadoop", "Production Support",
];

// Places for the journey map (approximate city coordinates).
export const places = {
  bengaluru: { city: "Bengaluru", country: "India", lat: 12.97, lon: 77.59 },
  dublin: { city: "Dublin", country: "Ireland", lat: 53.35, lon: -6.26 },
};

export const experience = [
  {
    type: "work" as const,
    place: "dublin" as const,
    role: "Retail Assistant",
    company: "Primark (Penneys)",
    sub: "Dublin, Ireland",
    date: "Nov 2025 – Present",
    sortDate: "2025-11",
    badge: "Part-time",
    current: true,
    highlights: [
      "Serve customers in a busy, high-volume store, resolving queries calmly and keeping service standards high at peak times.",
      "Work as part of a team to keep the shop floor organised and well presented, with attention to detail on stock and displays.",
    ],
  },
  {
    type: "work" as const,
    place: "bengaluru" as const,
    role: "Analyst — DevOps",
    company: "Société Générale",
    sub: "Global Solution Centre · Bengaluru, India",
    date: "Aug 2023 – Aug 2025",
    sortDate: "2023-08",
    badge: "Full-time · 2 yrs",
    current: false,
    highlights: [
      "Resolved 25+ production incidents and application issues weekly in a live banking environment using SQL, Linux and log analysis, keeping management, users and technical teams updated until closure.",
      "Carried out root cause analysis on recurring issues with infrastructure and development teams to reduce repeat incidents.",
      "Gathered requirements from business process owners and technical stakeholders, then prepared test cases and ran functional testing, UAT and defect management.",
      "Validated data using SQL to protect data accuracy and quality across enterprise applications.",
      "Supported deployments, batch processing, configuration changes and integrations, with business impact in mind.",
      "Wrote SOPs, troubleshooting guides and knowledge-base articles in Confluence and Jira so teams could resolve issues faster.",
      "Built and maintained Java, Spring Boot, React and Angular applications, including RESTful APIs and data access layers.",
    ],
  },
  {
    type: "work" as const,
    place: "bengaluru" as const,
    role: "Data Analyst Intern",
    company: "Société Générale",
    sub: "Global Solution Centre · Bengaluru, India",
    date: "May 2023 – Jul 2023",
    sortDate: "2023-05",
    badge: "Internship · 3 mo",
    current: false,
    highlights: [
      "Built a machine learning solution that monitors website logs and raises alerts before failures occur, using IDF-weighted log vectors and hierarchical clustering.",
      "Developed a Flask app showing predicted faulty logs, with a feedback loop for continuous improvement.",
    ],
  },
  {
    type: "work" as const,
    place: "bengaluru" as const,
    role: "Full-Stack Intern",
    company: "Tequed Labs",
    sub: "Bengaluru, India",
    date: "Aug 2022 – Sep 2022",
    sortDate: "2022-08",
    badge: "Internship · 2 mo",
    current: false,
    highlights: [
      "Built full-stack web projects with React, HTML, CSS and JavaScript on the front end and RESTful Python APIs on the back end.",
      "Stored and queried data in MySQL and MongoDB, and optimised SQL queries to improve data retrieval.",
      "Connected front ends to APIs and databases, and tested each project end to end.",
    ],
  },
];

export const projects = [
  {
    title: "Automated Software Vulnerability Detection with Explainable AI",
    subtitle: "MSc Dissertation · Responsible AI · NLP for Code",
    description:
      "Fine-tuned CodeBERT and GraphCodeBERT on 116,000+ samples from the Juliet Test Suite to detect software vulnerabilities, then applied attention-based explainable AI to interpret predictions and highlight the vulnerable code regions. Compared classical ML and transformer approaches with standard classification metrics, and ran user studies to assess how useful the explanations were.",
    stack: ["Python", "CodeBERT", "GraphCodeBERT", "Explainable AI", "Juliet Test Suite", "User Studies"],
    metrics: [
      { value: "116k+", label: "code samples" },
      { value: "2", label: "transformer models" },
      { value: "XAI", label: "attention explanations" },
    ],
  },
  {
    title: "Predictive Log Monitoring",
    subtitle: "Société Générale · ML for Production Support",
    description:
      "A machine learning solution that monitors website logs and raises alerts before failures occur. Logs are turned into IDF-weighted vectors and grouped with hierarchical clustering; a Flask app shows predicted faulty logs and collects feedback to keep improving the model.",
    stack: ["Python", "TF-IDF", "Hierarchical Clustering", "Flask", "Log Analysis"],
    metrics: [
      { value: "Early", label: "failure alerts" },
      { value: "Flask", label: "feedback app" },
      { value: "Unsupervised", label: "clustering" },
    ],
  },
  {
    title: "Medical Image Classification System",
    subtitle: "Published in IJRAR · Deep Learning · Healthcare",
    description:
      "A CNN that classifies MRI scans for brain tumour detection, integrated into a Flask web application for image upload and prediction. Validated and evaluated with standard performance metrics; published in the International Journal of Research and Analytical Reviews (IJRAR), May 2023.",
    stack: ["Python", "TensorFlow / Keras", "CNNs", "Flask", "MRI Imaging"],
    metrics: [
      { value: "CNN", label: "MRI classifier" },
      { value: "IJRAR", label: "published 2023" },
      { value: "Flask", label: "web app" },
    ],
    demo: "https://ijrar.org/papers/IJRAR23B2397.pdf",
  },
];

// Awards — shown as stickers. Citations are from the award notes she shared on LinkedIn.
export const awards = [
  {
    title: "Spot Award",
    org: "Société Générale",
    image: "/images/badges/spot-award.png",
    from: "Manjunath Krishnamurthy",
    citation:
      "Recognised for my contribution in the XVA chain. Despite being less than 1 year in CCR complex systems, shown a good level of understanding and able to manage production with minimum support from seniors.",
  },
  {
    title: "New Joinee of the Year 2024",
    org: "Société Générale",
    image: "/images/badges/newbie-award.png",
    from: "Manjunath Krishnamurthy",
    citation: "Newbie Award — thank you for your dedicated efforts. Keep up the good work.",
  },
];

export const certifications = [
  { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft · Jun 2026" },
  { name: "ITIL 4 Foundation", issuer: "Axelos · Jul 2025" },
  { name: "McKinsey.org Forward Program", issuer: "McKinsey.org · Jun 2026" },
  { name: "Google Data Analytics Certificate", issuer: "Google" },
  { name: "Introduction to Power BI", issuer: "DataCamp" },
  { name: "Time Series Analysis in R · ARIMA Models in R", issuer: "DataCamp" },
  { name: "Regression with statsmodels in Python", issuer: "DataCamp" },
];

export const education = [
  {
    type: "education" as const,
    place: "dublin" as const,
    degree: "MSc Computing (Data Analytics)",
    school: "Dublin City University",
    location: "Dublin, Ireland",
    date: "Sept 2025 – Aug 2026",
    sortDate: "2025-09",
    current: false,
    grade: "Grade: 2:1",
    modules: "Advanced Machine Learning · Statistical Modelling · Big Data (Spark / Hadoop) · Cloud Technology · GDPR & Ethics · Dissertation: Explainable AI for vulnerability detection",
  },
  {
    type: "education" as const,
    place: "bengaluru" as const,
    degree: "BE Computer Science Engineering",
    school: "Dayananda Sagar Academy of Technology and Management",
    location: "Bengaluru, India",
    date: "June 2019 – June 2023",
    sortDate: "2019-06",
    current: false,
    grade: "GPA 8.5/10 · First Class Hons",
    modules: "Data Structures & Algorithms · Linux · OOP in C++ · Database Management Systems · Operating Systems · Computer Networks · Final-year project published in IJRAR (May 2023)",
  },
];
