// lib/data.ts
// Single source of truth for all portfolio content.
// Edit this file to update the site — no need to touch components.
// Keep it in line with Khushi's CV: every number here must be on the CV.

export const profile = {
  name: "Khushi Bijkal",
  role: "Data Analyst · DevOps",
  tagline: "I work with data and keep systems running. I like finding out why things break.",
  location: "Dublin, Ireland",
  email: "khushi.n.bijkal@gmail.com",
  phone: "+353 89 202 8094",
  whatsapp: "https://wa.me/353892028094?text=Hi%20Khushi%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20chat.",
  github: "https://github.com/khu590",
  linkedin: "https://www.linkedin.com/in/khushi-bijkal/",
};

// Big-number tiles on the Impact section.
export const stats = [
  { value: "25+", label: "production incidents I resolved each week at Société Générale" },
  { value: "2+ yrs", label: "as a DevOps analyst, working on data validation" },
  { value: "116k+", label: "code samples in my MSc dissertation" },
  { value: "2:1", label: "MSc in Computing (Data Analytics) at DCU" },
  { value: "2", label: "awards at work: Spot Award and New Joinee of the Year" },
];

// Short storytelling bio, one paragraph per entry.
export const bio = [
  "I spent two years at Société Générale in Bengaluru supporting live banking systems. Most weeks I resolved 25+ production incidents using SQL, Linux and log analysis. When the same issue kept coming back, I worked with the infrastructure and development teams to find the root cause. I also validated data with SQL so people could trust the numbers.",
  "In 2025 I moved to Dublin for an MSc in Computing (Data Analytics) at DCU and finished with a 2:1. For my dissertation I used CodeBERT, GraphCodeBERT and explainable AI to detect software vulnerabilities. I'm now looking for data analyst, data engineering or DevOps roles in Ireland.",
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
    category: "How I work",
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
    role: "Analyst, DevOps",
    company: "Société Générale",
    sub: "Global Solution Centre · Bengaluru, India",
    date: "Aug 2023 – Aug 2025",
    sortDate: "2023-08",
    badge: "Full-time · 2 yrs",
    current: false,
    photo: { src: "/images/socgen-office.jpg", alt: "Khushi at the Société Générale office in Bengaluru, wearing her staff lanyard", caption: "SocGen, Bengaluru" },
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
      "I fine-tuned CodeBERT and GraphCodeBERT on 116,000+ samples from the Juliet Test Suite to detect software vulnerabilities. I then used attention-based explainable AI to show which parts of the code led to each prediction. I compared classical ML with the transformer models using standard classification metrics, and ran user studies to see whether the explanations actually helped people.",
    stack: ["Python", "CodeBERT", "GraphCodeBERT", "Explainable AI", "Juliet Test Suite", "User Studies"],
    metrics: [
      { value: "116k+", label: "code samples" },
      { value: "2", label: "transformer models compared" },
      { value: "XAI", label: "explained with attention" },
    ],
  },
  {
    title: "What Makes a Movie Last?",
    subtitle: "Data Mining · Regression · 36,000+ Films",
    description:
      "I combined IMDb, MovieLens and TMDB data on more than 36,000 films to predict long-term movie success. After cleaning and feature engineering I compared Linear Regression with Random Forest, and looked at production features against audience features. Random Forest did best with an R² of 0.86, and early audience engagement turned out to predict success better than anything about the production.",
    stack: ["Python", "pandas", "NumPy", "scikit-learn", "Random Forest", "Matplotlib", "Seaborn"],
    metrics: [
      { value: "36k+", label: "films from 3 sources" },
      { value: "0.86", label: "R², Random Forest" },
      { value: "Audience", label: "beat production features" },
    ],
    github: "https://github.com/khu590/data-mining-movie-success-audience-vs-production",
  },
  {
    title: "London Bikes and the Weather",
    subtitle: "Apache Spark · PySpark · TfL Open Data",
    description:
      "An end-to-end PySpark pipeline that joins London weather (1979 to 2023) with TfL daily cycle hires (2010 to 2025) to see how weather changes demand. I cleaned 1,204 missing weather values, removed outliers with a mean plus or minus 4 standard deviations rule, joined the two on date into 4,078 days and built features such as weekend, rain flag and temperature band. Warm, sunny days lift hires (temperature r = 0.648, sunshine r = 0.532), while rain and humidity pull them down.",
    stack: ["PySpark", "Spark SQL", "Spark DataFrames", "Matplotlib", "Jupyter"],
    metrics: [
      { value: "4,078", label: "days joined" },
      { value: "0.648", label: "r, temperature vs hires" },
      { value: "−0.534", label: "r, humidity vs hires" },
    ],
    github: "https://github.com/khu590/london-bike-hire-spark-pipeline",
  },
  {
    title: "CardioRisk: Predicting Heart Disease",
    subtitle: "Team project (DCU) · Classification · 70,000 Records",
    description:
      "A team project with Achal Nanjundamurthy on the cardio_train dataset of 70,000 anonymised patients. My part was the pre-processing, exploratory visualisations, interpreting the results and writing the report: removing unrealistic blood pressure, height and weight values, and adding age in years and BMI. We compared Logistic Regression, Random Forest, Gradient Boosting and XGBoost. XGBoost did best with 0.729 accuracy and an F1 of 0.714, and BMI and blood pressure were the strongest predictors.",
    stack: ["Python", "pandas", "scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
    metrics: [
      { value: "70k", label: "patient records" },
      { value: "0.714", label: "F1, XGBoost" },
      { value: "5-fold", label: "cross-validation" },
    ],
    github: "https://github.com/khu590/CardioRisk_ML",
  },
  {
    title: "When Do US Flights Run Late?",
    subtitle: "Seasonality Analysis · Plotly · 6.2M Flights",
    description:
      "I looked at about 6.2 million US domestic flights from 2020 to see whether delays follow the seasons. After filtering and filling gaps with medians, I grouped arrival and departure delays by month and built an interactive Plotly chart with seasonal bands, hover values and a colour-blind friendly palette. Delays peak from June to August and in December, and are lowest from January to March.",
    stack: ["Python", "pandas", "Plotly", "Matplotlib", "Google Colab"],
    metrics: [
      { value: "6.2M", label: "flights analysed" },
      { value: "Jun–Aug", label: "worst delays, plus Dec" },
      { value: "Plotly", label: "interactive chart" },
    ],
    github: "https://github.com/khu590/flight-delay-seasonality-analysis",
  },
  {
    title: "Predictive Log Monitoring",
    subtitle: "Société Générale · ML for Production Support",
    description:
      "During my internship I built a machine learning tool that watches website logs and raises an alert before a failure happens. It turns logs into IDF-weighted vectors and groups them with hierarchical clustering. A small Flask app shows the logs it predicts are faulty and collects feedback so the model keeps improving.",
    stack: ["Python", "TF-IDF", "Hierarchical Clustering", "Flask", "Log Analysis"],
    metrics: [
      { value: "Early", label: "alerts before failures" },
      { value: "Flask", label: "app with feedback" },
      { value: "Unsupervised", label: "hierarchical clustering" },
    ],
  },
  {
    title: "Medical Image Classification System",
    subtitle: "Published in IJRAR · Deep Learning · Healthcare",
    description:
      "My final-year project: a CNN that classifies MRI scans to detect brain tumours. You upload an image through a Flask web app and it returns a prediction. I evaluated it with standard performance metrics, and the work was published in the International Journal of Research and Analytical Reviews (IJRAR) in May 2023.",
    stack: ["Python", "TensorFlow / Keras", "CNNs", "Flask", "MRI Imaging"],
    metrics: [
      { value: "CNN", label: "for MRI scans" },
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

// "Beyond work" lanyard wall: volunteering, speaking and hobbies.
// One entry per lanyard. `kind` sets the badge colour and icon.
export type BeyondItem = {
  kind: "Speaking" | "Volunteering" | "Hobby";
  role: string; // printed big on the badge
  org: string;
  title: string;
  when?: string; // leave out rather than guess
  story: string;
  photos: { src: string; alt: string }[];
  ribbon?: { src: string; alt: string };
};

export const beyond: BeyondItem[] = [
  {
    kind: "Speaking",
    role: "Speaker",
    org: "Toastmasters International",
    title: "Best Table Topics",
    story:
      "Table Topics is the bit of a Toastmasters meeting where you get a question you haven't seen and have a minute or two to answer it, no notes. I won Best Table Topics, and I've also stood up in front of the room to share some public speaking tips of my own.",
    photos: [
      { src: "/images/beyond/toastmasters-award.jpg", alt: "Khushi smiling as she receives the Best Table Topics ribbon at a Toastmasters meeting" },
      { src: "/images/beyond/toastmasters-speaking.jpg", alt: "Khushi standing at the front of a Toastmasters meeting, speaking to the room" },
    ],
    ribbon: { src: "/images/beyond/toastmasters-ribbon.jpg", alt: "Toastmasters ribbon reading Best Table Topics" },
  },
];
