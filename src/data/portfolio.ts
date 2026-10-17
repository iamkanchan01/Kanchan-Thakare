// Edit this file to personalise your portfolio.
// Everything on the site is rendered from the data below.

export const profile = {
  name: 'Kanchan Thakare',
  role: 'Full Stack .NET Developer',
  tagline:
    'Software Engineer with 5.5+ years of experience building scalable web applications with .NET Core, Angular, React and Node.js, and shipping them to Azure through automated CI/CD pipelines.',
  location: 'Pune, India',
  email: 'krt856e@gmail.com',
  resumeUrl: '', // e.g. './resume.pdf' (put the file in /public)
  highlights: [
    { value: '5.5+', label: 'Years of experience' },
    { value: 'Full Stack', label: '.NET · Angular · React' },
    { value: 'Cloud & DevOps', label: 'Azure · CI/CD · Containers' },
  ],
  about: [
    'I am a Software Engineer with over 5.5 years of experience designing, developing and maintaining enterprise web applications end to end, from database and APIs to responsive user interfaces and cloud deployment.',
    'On the back end I build clean, secure RESTful APIs and microservices with C#, ASP.NET Core and Entity Framework Core, plus Node.js services where it fits. On the front end I create modern, component-based SPAs with Angular and React using TypeScript.',
    'I enjoy automating delivery: building CI/CD pipelines with Jenkins and GitHub Actions, containerising applications with Docker, and running them on Kubernetes clusters managed with Rancher and on Microsoft Azure. I care about clean architecture, SOLID principles, testing and code quality, and I work comfortably in Agile/Scrum teams.',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/krt856e' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kanchan-thakare' },
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
    items: ['Angular', 'React', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'HTML5', 'CSS3 / SCSS', 'Bootstrap'],
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
    items: ['Jenkins', 'GitHub Actions', 'Azure Pipelines', 'Docker', 'Kubernetes', 'Rancher', 'Git'],
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

export const experience: { role: string; company: string; period: string; points: string[] }[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Company Name',
    period: 'Month 2023 – Present',
    points: [
      'Design and develop scalable RESTful APIs and microservices using ASP.NET Core, C# and Entity Framework Core.',
      'Build responsive, reusable UI components in Angular and React with TypeScript.',
      'Own CI/CD pipelines in Jenkins and GitHub Actions, automating build, test and deployment to Azure and Rancher-managed Kubernetes clusters.',
      'Review code, mentor junior developers and promote clean architecture and SOLID principles.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Company Name',
    period: 'Month 2021 – Month 2023',
    points: [
      'Developed full stack features with .NET Core Web API, SQL Server and Angular for enterprise applications.',
      'Built Node.js/Express services and integrated third-party REST APIs.',
      'Optimised SQL queries and EF Core data access, improving API response times.',
      'Wrote unit tests with xUnit/NUnit and took part in Agile/Scrum ceremonies.',
    ],
  },
]

// Roles cycled by the typing animation in the hero.
export const roles = ['Full Stack .NET Developer', 'Angular & React Engineer', 'Azure & DevOps Enthusiast', 'Clean Code Advocate']

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
