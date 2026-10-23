// Edit this file to personalise your portfolio.
// Everything on the site is rendered from the data below.

export const profile = {
  name: 'Kanchan Thakare',
  role: 'Software Developer',
  tagline:
    'Full Stack Software Engineer with 5.5 years of experience building scalable applications with .NET Core, Angular, React, Next.js, Node.js and SQL Server, with experience in Azure, CI/CD and production support.',
  location: 'Pune, India',
  email: 'krt856@gmail.com',
  resumeUrl: './resume.pdf',
  highlights: [
    { value: '5.5', label: 'Years of experience' },
    { value: 'Full Stack', label: '.NET · Angular · React · Next.js' },
    { value: 'Cloud & DevOps', label: 'Azure · CI/CD · Containers' },
  ],
  about: [
    'I am a Full Stack Software Engineer with 5.5 years of experience designing, developing and supporting enterprise web applications, from databases and APIs to responsive user interfaces and production deployments.',
    'On the back end I build RESTful APIs with C#, ASP.NET Core and Entity Framework Core, alongside Node.js services. On the front end I work with Angular, React and Next.js using TypeScript.',
    'I enjoy automating delivery: building CI/CD pipelines with Jenkins and GitHub Actions, containerising applications with Docker, and running them on Kubernetes clusters managed with Rancher and on Microsoft Azure. I care about clean architecture, SOLID principles, testing and code quality, and I work comfortably in Agile/Scrum teams.',
  ],
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/iamkanchan01/' },
    { label: 'GitHub', url: 'https://github.com/iamkanchan01' },
    { label: 'Portfolio', url: 'https://iamkanchan01.github.io/Kanchan-Thakare/' },
  ],
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Backend',
    items: [
      'C#',
      '.NET Core / .NET 8',
      'ASP.NET Core Web API',
      'Entity Framework Core',
      'LINQ',
      'REST APIs',
      'Microservices',
      'Node.js',
      'Express.js',
    ],
  },
  {
    group: 'Frontend',
    items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'HTML5', 'CSS3 / SCSS', 'Bootstrap'],
  },
  {
    group: 'Databases',
    items: ['SQL Server', 'Azure SQL', 'T-SQL', 'Stored Procedures', 'Query Optimisation'],
  },
  {
    group: 'Cloud — Azure',
    items: ['App Service', 'Azure Functions', 'Key Vault', 'Storage', 'Application Insights', 'Azure DevOps'],
  },
  {
    group: 'DevOps & CI/CD',
    items: ['Jenkins', 'GitHub Actions', 'Azure Pipelines', 'Docker', 'Kubernetes', 'Rancher', 'Splunk', 'Git'],
  },
  {
    group: 'Practices & Tools',
    items: [
      'Clean Architecture',
      'SOLID',
      'Design Patterns',
      'Unit Testing (xUnit / NUnit)',
      'Swagger / OpenAPI',
      'JWT / OAuth 2.0',
      'Agile / Scrum',
    ],
  },
]

export type Project = {
  title: string
  description: string
  tech: string[]
  repoUrl?: string
  liveUrl?: string
}

// Example projects: replace them with your own work (personal or open-source only,
// never confidential employer code or details).
export const projects: Project[] = [
  {
    title: 'E-Commerce Microservices Platform',
    description:
      'Microservices-based shopping platform with separate Product, Order and Identity services built on ASP.NET Core Web API and EF Core, secured with JWT, and fronted by an Angular SPA.',
    tech: ['.NET Core', 'C#', 'EF Core', 'Angular', 'SQL Server', 'Docker'],
    repoUrl: 'https://github.com/your-username/ecommerce-microservices',
  },
  {
    title: 'Task Management Dashboard',
    description:
      'Full stack task tracker with a React + TypeScript front end and a Node.js/Express REST API, featuring authentication, role-based access and real-time status updates.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'REST API'],
    repoUrl: 'https://github.com/your-username/task-dashboard',
  },
  {
    title: 'CI/CD Pipeline Automation',
    description:
      'End-to-end pipelines that build, test and containerise a .NET + Angular app, then deploy to Azure App Service and a Rancher-managed Kubernetes cluster using GitHub Actions and Jenkins.',
    tech: ['GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Rancher', 'Azure'],
    repoUrl: 'https://github.com/your-username/cicd-pipelines',
  },
  {
    title: 'Portfolio Website',
    description: 'This site. Built with React, TypeScript and Vite, and deployed to GitHub Pages with GitHub Actions.',
    tech: ['React', 'TypeScript', 'Vite', 'GitHub Actions'],
    repoUrl: 'https://github.com/your-username/portfolio',
  },
]

export const experience: { role: string; company: string; period: string; project: string; points: string[] }[] = [
  {
    role: 'Software Engineer',
    company: 'HCL Tech',
    period: 'Nov 2024 – Present',
    project: 'Vendor Payment Application · Office Depot',
    points: [
      'Support and maintain the Vendor Payment Application for Office Depot, built with .NET Core, ASP.NET Core, Angular, React and Node.js.',
      'Implement business requirements, feature enhancements, bug fixes and REST APIs across frontend and backend applications.',
      'Troubleshoot critical production issues and ESP batch jobs, investigating failures that affect business operations.',
      'Analyze and remediate findings from Splunk, Snyk and GitHub security scans, and use application logs for root-cause analysis.',
      'Support secure integrations with CyberArk credential management and Snowflake key-pair authentication.',
      'Participate in Jenkins and Docker deployments and collaborate across Agile/Scrum teams using Jira.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'CompuCom',
    period: 'Oct 2022 – Nov 2024',
    project: 'Vendor Payment Application · Office Depot',
    points: [
      'Developed a finance application for managing vendor invoice stop-payment requests and payment validation.',
      'Built responsive React features for request creation, tracking, reporting and access management, with Node.js services and REST APIs supporting business workflows.',
      'Used SQL for data management and query optimization, and helped modernize legacy ASP application functionality in React.',
      'Validated releases, resolved defects and partnered with cross-functional teams to deliver features tracked in Jira and Agile sprints.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Capgemini',
    period: 'Apr 2021 – Sept 2022',
    project: 'Employee Onboarding & Information Portal',
    points: [
      'Developed .NET Core and C# REST APIs and Angular features for employee information and onboarding workflows.',
      'Built Entity Framework Core data-access layers using Code First and Database First, and developed SQL Server queries, stored procedures and data models.',
      'Integrated WSO2 Identity Server for single sign-on, authentication and authorization.',
      'Contributed to requirements analysis, code reviews, testing, production support and deployments through Agile delivery.',
    ],
  },
]

// Roles cycled by the typing animation in the hero.
export const roles = ['Full Stack .NET Developer', 'React & Next.js Engineer', 'Azure & DevOps Enthusiast', 'Clean Code Advocate']

// Self-assessed proficiency (0–100) shown as animated bars. Adjust to taste.
export const proficiency: { skill: string; level: number }[] = [
  { skill: 'C# / .NET Core', level: 92 },
  { skill: 'ASP.NET Core Web API', level: 90 },
  { skill: 'Angular', level: 85 },
  { skill: 'SQL Server / T-SQL', level: 85 },
  { skill: 'React + TypeScript', level: 80 },
  { skill: 'CI/CD (Jenkins, GitHub Actions)', level: 80 },
  { skill: 'Docker / Kubernetes', level: 75 },
  { skill: 'Microsoft Azure', level: 75 },
]

// "How I work" process infographic.
export const process: { icon: string; title: string; text: string }[] = [
  { icon: '🧭', title: 'Understand', text: 'Clarify requirements, users and constraints before writing code.' },
  { icon: '📐', title: 'Design', text: 'Clean architecture, API contracts and data models that scale.' },
  { icon: '⚙️', title: 'Build', text: 'SOLID, well-tested C#, TypeScript and SQL in small increments.' },
  { icon: '🧪', title: 'Test', text: 'Unit and integration tests wired into every pipeline run.' },
  { icon: '🚀', title: 'Ship', text: 'Automated CI/CD to Azure and Kubernetes, monitored in production.' },
]
