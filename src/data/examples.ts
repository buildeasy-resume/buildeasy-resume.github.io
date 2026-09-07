export interface ResumeExample {
  slug: string;
  title: string;
  role: string;
  experienceLevel: 'Entry-Level' | 'Mid-Senior' | 'Student / Graduate';
  metaTitle: string;
  description: string;
  recommendedTemplate: 'minimal' | 'modern' | 'executive' | 'academic' | 'classic' | 'compact';
  recommendedTemplateName: string;
  summaryGuidance: {
    overview: string;
    goodExample: string;
    badExample: string;
    tips: string[];
  };
  recommendedStructure: {
    order: string[];
    rationale: string;
  };
  keySkills: {
    hard: string[];
    soft: string[];
    tools: string[];
  };
  bulletPointExamples: {
    category: string;
    bullets: string[];
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  sampleResume: {
    fullName: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    github?: string;
    summary: string;
    skills: string[];
    experience: {
      role: string;
      company: string;
      location: string;
      date: string;
      highlights: string[];
    }[];
    projects?: {
      name: string;
      technologies: string;
      date: string;
      highlights: string[];
    }[];
    education: {
      degree: string;
      school: string;
      location: string;
      date: string;
      gpa?: string;
      honors?: string[];
    }[];
  };
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: 'software-engineer-resume-example',
    title: 'Software Engineer Resume Example & Writing Guide',
    role: 'Software Engineer',
    experienceLevel: 'Mid-Senior',
    metaTitle: 'Software Engineer Resume Example (2026 Guide & Structure) | BuildEasy',
    description: 'Complete Software Engineer resume guide with full example, recommended section structure, key technical skills, Google XYZ bullet points, and common mistakes.',
    recommendedTemplate: 'minimal',
    recommendedTemplateName: 'Minimal',
    summaryGuidance: {
      overview: 'Keep your summary to 3-4 impactful sentences highlighting your primary stack, years of production experience, scale of systems built, and highest quantifiable impact.',
      goodExample: 'Full-Stack Software Engineer with 5+ years of experience designing and scaling distributed web applications and microservices handling 2M+ daily active users. Proven track record in TypeScript, React, Node.js, and PostgreSQL, reducing API latencies by 35% and automating CI/CD deployments.',
      badExample: 'Passionate coder and hard-working software engineer looking for a challenging developer role in a fast-paced environment where I can learn new technologies.',
      tips: [
        'Mention your core languages and frameworks (e.g., TypeScript, Go, React, Python).',
        'Quantify scale (daily requests, user count, database records, latency improvements).',
        'Avoid generic buzzwords like "hard worker" or "guru".'
      ]
    },
    recommendedStructure: {
      order: ['Contact & GitHub Links', 'Professional Summary', 'Technical Skills Matrix', 'Work Experience', 'Key Projects / Open Source', 'Education & Certifications'],
      rationale: 'Technical recruiters and engineering managers evaluate technical competence first. Placing technical skills and high-scale production experience upfront enables swift evaluation during the 6-second scan.'
    },
    keySkills: {
      hard: ['TypeScript / JavaScript', 'Python / Go / Java', 'React / Next.js', 'Node.js / Express', 'PostgreSQL / Redis / MongoDB', 'GraphQL / REST APIs', 'Distributed Systems'],
      soft: ['Cross-Functional Collaboration', 'Code Reviews & Mentorship', 'System Architecture Design', 'Agile / Scrum Leadership', 'Technical Root-Cause Analysis'],
      tools: ['Docker / Kubernetes', 'AWS (ECS, Lambda, S3, RDS)', 'Git / GitHub Actions', 'Datadog / Prometheus', 'Terraform', 'Jira / Confluence']
    },
    bulletPointExamples: [
      {
        category: 'Backend & System Scalability',
        bullets: [
          'Architected and deployed an event-driven payment processing microservice in Node.js and PostgreSQL, processing $4.2M in monthly transactions with 99.99% uptime.',
          'Refactored legacy database queries and implemented Redis caching layers, reducing p95 API response times from 420ms to 65ms across 12 core endpoints.',
          'Migrated monolithic backend to modular Docker container services on AWS ECS, cutting infrastructure hosting costs by 28%.'
        ]
      },
      {
        category: 'Frontend Performance & User Experience',
        bullets: [
          'Engineered real-time dashboard visualization in React and Tailwind CSS, increasing user session engagement by 22%.',
          'Optimized Webpack/Vite client bundles and implemented code splitting, cutting initial bundle size by 45% and boosting Google Lighthouse score from 68 to 96.',
          'Implemented end-to-end automated test suites with Playwright and Vitest, elevating code coverage from 52% to 88%.'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing job duties without business or performance outcomes (e.g., "Wrote REST APIs in Express").',
        correction: 'Use the Google XYZ formula: "Engineered 14 RESTful API endpoints in Express and TypeScript, supporting 50K+ daily mobile requests with <80ms average latency."'
      },
      {
        mistake: 'Omitting GitHub, portfolio, or live links.',
        correction: 'Include direct links to your active GitHub profile, personal portfolio, or notable public repositories right in the header.'
      },
      {
        mistake: 'Overloading with outdated or irrelevant legacy tools.',
        correction: 'Group skills by domain (Languages, Frameworks, Cloud & Databases, Dev Tools) and prioritize tools relevant to the target job description.'
      }
    ],
    sampleResume: {
      fullName: 'Alex Morgan',
      title: 'Senior Full-Stack Software Engineer',
      location: 'San Francisco, CA',
      email: 'alex.morgan@email.com',
      linkedin: 'linkedin.com/in/alexmorgan-dev',
      github: 'github.com/alexmorgan',
      summary: 'Senior Software Engineer with 6+ years of experience architecting high-throughput cloud applications and responsive web interfaces. Specialized in TypeScript, React, Node.js, and AWS with a track record of driving system latency reductions and mentoring engineering teams.',
      skills: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS', 'CI/CD'],
      experience: [
        {
          role: 'Senior Full-Stack Engineer',
          company: 'CloudScale Technologies',
          location: 'San Francisco, CA',
          date: '2023 - Present',
          highlights: [
            'Architected microservices pipeline processing 3.5M daily webhook events using Node.js, Redis Streams, and PostgreSQL.',
            'Spearheaded frontend performance refactor in React, cutting Largest Contentful Paint (LCP) by 42% across enterprise dashboards.',
            'Mentored 4 junior and mid-level engineers, instituting rigorous code review standards and unit testing practices.'
          ]
        },
        {
          role: 'Software Engineer',
          company: 'Nexus Software Labs',
          location: 'Austin, TX',
          date: '2020 - 2023',
          highlights: [
            'Engineered RESTful and GraphQL APIs serving 450K+ mobile and web clients with 99.98% service availability.',
            'Automated multi-stage deployment pipelines via GitHub Actions and Docker, reducing release cycle duration from 4 hours to 15 minutes.',
            'Implemented Elasticsearch indexing layer, accelerating full-text customer search queries by 6x.'
          ]
        }
      ],
      projects: [
        {
          name: 'OpenMetrics Dashboard',
          technologies: 'TypeScript, React, Go, InfluxDB',
          date: '2024',
          highlights: [
            'Built open-source server metrics visualization tool with 1,200+ GitHub stars.',
            'Designed lightweight polling daemon capable of streaming metrics at 60 FPS.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          date: '2016 - 2020',
          gpa: '3.82 / 4.0',
          honors: ['Dean’s Honors List (6 Semesters)', 'ACM Student Chapter Vice Chair']
        }
      ]
    }
  },
  {
    slug: 'frontend-developer-resume-example',
    title: 'Frontend Developer Resume Example & Writing Guide',
    role: 'Frontend Developer',
    experienceLevel: 'Mid-Senior',
    metaTitle: 'Frontend Developer Resume Example (2026 Guide & Structure) | BuildEasy',
    description: 'Comprehensive Frontend Developer resume guide featuring modern JavaScript/TypeScript stacks, Core Web Vitals optimizations, design system architectures, and full sample layout.',
    recommendedTemplate: 'modern',
    recommendedTemplateName: 'Modern',
    summaryGuidance: {
      overview: 'Spotlight your proficiency with modern web frameworks (React, Vue, Next.js), web performance benchmarks (Lighthouse, Core Web Vitals), and cross-functional design system collaboration.',
      goodExample: 'Frontend Developer with 4+ years of expertise building high-performance, accessible web interfaces in React, TypeScript, and Tailwind CSS. Reduced page load times by 48% across e-commerce platforms with 1.5M monthly visitors while establishing component design systems adhering to WCAG 2.1 AA accessibility standards.',
      badExample: 'Creative frontend developer who loves making pretty websites using HTML, CSS, and JavaScript. Looking for a great team to build cool UIs.',
      tips: [
        'Highlight Core Web Vitals and performance metrics (LCP, CLS, INP).',
        'State experience with accessibility (a11y) standards and responsive UI patterns.',
        'Detail your design-to-code pipeline (Figma, Storybook, Tailwind, Design Tokens).'
      ]
    },
    recommendedStructure: {
      order: ['Contact & Portfolio/GitHub Links', 'Professional Summary', 'Core Frontend Skills', 'Work Experience', 'Featured Web Applications', 'Education'],
      rationale: 'Recruiters looking for frontend talent look directly at your live portfolio, GitHub repositories, and tech stack proficiency before reading long paragraphs.'
    },
    keySkills: {
      hard: ['React / Next.js / Vue', 'TypeScript / ES6+', 'HTML5 / Semantic Web / A11y', 'Tailwind CSS / CSS Modules / Sass', 'State Management (Zustand, Redux, TanStack Query)', 'REST & GraphQL Integration', 'Web Performance & Core Web Vitals'],
      soft: ['UI/UX Collaboration', 'Design System Architecture', 'User Empathy & Usability Testing', 'Cross-Browser Testing', 'Iterative Prototyping'],
      tools: ['Figma / Storybook', 'Vite / Webpack / Turbopack', 'Jest / Vitest / Playwright', 'Git / GitHub CI', 'Postman / Chrome DevTools']
    },
    bulletPointExamples: [
      {
        category: 'UI Performance & Core Web Vitals',
        bullets: [
          'Engineered responsive web client in React and TypeScript, optimizing Core Web Vitals to achieve top 95+ score on Google PageSpeed Insights.',
          'Implemented virtualized rendering for 10,000+ row data tables, reducing memory consumption by 60% and eliminating scrolling lag.',
          'Structured lazy-loaded asset pipelines and dynamic code splitting, slashing initial page load times from 3.8s to 1.1s.'
        ]
      },
      {
        category: 'Design Systems & Component Architecture',
        bullets: [
          'Architected reusable design system of 50+ accessible components in Storybook and Tailwind CSS, standardizing UI across 4 separate product teams.',
          'Collaborated closely with product designers in Figma to create fluid token-based themes with complete dark mode and high-contrast accessibility support.',
          'Integrated end-to-end accessibility testing into CI pipeline, resolving 100% of WCAG AA compliance violations.'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing only basic HTML/CSS without modern JavaScript ecosystem tools.',
        correction: 'Specify modern toolchains: TypeScript, Next.js, state management libraries, API client libraries, and testing frameworks.'
      },
      {
        mistake: 'Forgetting to include a link to your live portfolio website or deployed demos.',
        correction: 'Always include a live portfolio URL and GitHub profile at the very top of the header.'
      },
      {
        mistake: 'Focusing solely on aesthetics rather than engineering performance and accessibility.',
        correction: 'Quantify metrics: load time reductions, test coverage improvements, and conversion rate uplifts.'
      }
    ],
    sampleResume: {
      fullName: 'Jordan Taylor',
      title: 'Frontend Engineer',
      location: 'Seattle, WA',
      email: 'jordan.taylor@email.com',
      linkedin: 'linkedin.com/in/jordantaylor-dev',
      github: 'github.com/jordantaylor',
      summary: 'Frontend Engineer with 4+ years of experience engineering accessible, responsive web applications in React, TypeScript, and modern CSS. Proven track record of scaling design systems and optimizing web vitals for high-traffic SaaS platforms.',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Storybook', 'Zustand', 'GraphQL', 'Vitest', 'Web Performance', 'Figma'],
      experience: [
        {
          role: 'Frontend Engineer',
          company: 'Apex Digital Systems',
          location: 'Seattle, WA',
          date: '2022 - Present',
          highlights: [
            'Built next-generation customer analytics portal in Next.js and TypeScript, handling 800K monthly sessions.',
            'Authored corporate design system of 45+ accessible UI components in Storybook, accelerating feature development velocity by 30%.',
            'Reduced client error rates by 70% by introducing strict TypeScript typing and comprehensive React Query error boundaries.'
          ]
        },
        {
          role: 'Junior Frontend Developer',
          company: 'PixelCraft Studio',
          location: 'Portland, OR',
          date: '2020 - 2022',
          highlights: [
            'Developed 20+ responsive marketing and e-commerce websites utilizing modern JavaScript, HTML5, and CSS grid layouts.',
            'Collaborated with UX researchers to conduct A/B tests that boosted user checkout conversion by 14%.'
          ]
        }
      ],
      projects: [
        {
          name: 'React Flow Canvas Builder',
          technologies: 'React, TypeScript, Canvas API, Tailwind CSS',
          date: '2024',
          highlights: [
            'Created open-source drag-and-drop workflow diagramming tool with zero runtime dependencies.',
            'Implemented custom undo/redo tree history and JSON export capabilities.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Informatics',
          school: 'University of Washington',
          location: 'Seattle, WA',
          date: '2016 - 2020',
          gpa: '3.75 / 4.0'
        }
      ]
    }
  },
  {
    slug: 'student-resume-example',
    title: 'College Student Resume Example & Writing Guide',
    role: 'College Student',
    experienceLevel: 'Student / Graduate',
    metaTitle: 'College Student Resume Example (2026 Guide & Format) | BuildEasy',
    description: 'Expert college student resume guide with sample layout, coursework formatting, GPA inclusion rules, academic projects, campus leadership, and internship strategy.',
    recommendedTemplate: 'academic',
    recommendedTemplateName: 'Academic',
    summaryGuidance: {
      overview: 'Focus your 2-3 line summary on your major, graduation timeline, core academic competencies, and the specific internship or entry-level role you are targeting.',
      goodExample: 'Senior Computer Science student at University of Michigan (Graduating May 2026, 3.85 GPA) with strong foundation in Java, Python, and data structures. Experienced in building full-stack web applications and leading university hackathon teams; seeking a Software Engineering Internship.',
      badExample: 'College student looking for any internship opportunity to gain corporate experience and learn new skills for my future career.',
      tips: [
        'State your degree, expected graduation month and year, and target role.',
        'Include your GPA if it is 3.5 or higher.',
        'List coursework directly aligned with the job description.'
      ]
    },
    recommendedStructure: {
      order: ['Contact & Links', 'Education (Degree, GPA, Expected Grad Date)', 'Relevant Coursework & Academic Honors', 'Academic & Personal Projects', 'Internships / Campus Work', 'Technical Skills'],
      rationale: 'For current students, academic credentials and substantial class/personal projects are your primary differentiators. Position Education and Projects before professional experience.'
    },
    keySkills: {
      hard: ['Python / Java / C++', 'Data Structures & Algorithms', 'SQL & Database Design', 'Git & Version Control', 'Web Development Fundamentals', 'Data Analysis & Excel'],
      soft: ['Rapid Learning Agility', 'Teamwork & Collaboration', 'Written & Verbal Communication', 'Time Management', 'Critical Problem Solving'],
      tools: ['VS Code / IntelliJ', 'GitHub', 'Google Workspace / Microsoft 365', 'Notion / Slack', 'Figma Basics']
    },
    bulletPointExamples: [
      {
        category: 'Coursework & Academic Projects',
        bullets: [
          'Engineered distributed file storage system in Java as part of Advanced Operating Systems coursework, achieving 99.5% packet delivery accuracy across simulated network nodes.',
          'Built full-stack campus event discovery web app using React and Node.js, adopted by 400+ students during campus orientation week.',
          'Analyzed dataset of 50,000+ consumer transactions using Python and Pandas, deriving predictive retention models with 84% accuracy.'
        ]
      },
      {
        category: 'Campus Leadership & Part-Time Experience',
        bullets: [
          'Organized university annual hackathon with 350+ participants, securing $12K in corporate tech sponsorships and managing 15 student volunteers.',
          'Mentored 30+ undergraduate students in introductory Python programming as a Computer Science Teaching Assistant, holding weekly review sessions.'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing high school information when you are in your second year of college or later.',
        correction: 'Remove high school credentials once you complete your freshman year of university.'
      },
      {
        mistake: 'Leaving off projects due to lack of official employment.',
        correction: 'Include 2-3 detailed project blocks showing technical stack, problem solved, and live repository links.'
      },
      {
        mistake: 'Listing generic course numbers (e.g., "CS 201") without descriptive names.',
        correction: 'Write out full course titles: "Data Structures & Algorithms", "Database Management Systems", "Linear Algebra".'
      }
    ],
    sampleResume: {
      fullName: 'Maya Patel',
      title: 'Computer Science Student',
      location: 'Ann Arbor, MI',
      email: 'maya.patel@umich.edu',
      linkedin: 'linkedin.com/in/mayapatel-cs',
      github: 'github.com/mayapatel',
      summary: 'Computer Science undergraduate at University of Michigan (Class of 2026, GPA 3.84/4.0) with coursework in Algorithms, Database Systems, and Cloud Computing. Seeking a Software Engineering Summer Internship to apply skills in Java, Python, and web application development.',
      skills: ['Java', 'Python', 'C++', 'SQL', 'Git', 'React Basics', 'Data Structures', 'Linux', 'Pandas'],
      experience: [
        {
          role: 'Computer Science Peer Tutor',
          company: 'University of Michigan EECS Department',
          location: 'Ann Arbor, MI',
          date: 'Sept 2024 - Present',
          highlights: [
            'Guided 40+ students through fundamental object-oriented programming concepts and algorithm debugging.',
            'Conducted weekly review workshops for 25 attendees, improving class quiz averages by 12%.'
          ]
        },
        {
          role: 'President & Founder',
          company: 'Women in Computing Student Chapter',
          location: 'Ann Arbor, MI',
          date: '2023 - Present',
          highlights: [
            'Grew active student membership from 12 to 85 members across 2 semesters.',
            'Coordinated 6 industry speaker panels featuring engineering leaders from top tech firms.'
          ]
        }
      ],
      projects: [
        {
          name: 'Campus Study Group Finder',
          technologies: 'React, Node.js, MongoDB',
          date: '2024',
          highlights: [
            'Built real-time matching platform connecting university students by course schedule.',
            'Integrated OAuth authentication and WebSockets for direct messaging.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of Michigan',
          location: 'Ann Arbor, MI',
          date: 'Expected May 2026',
          gpa: '3.84 / 4.0',
          honors: ['Dean’s Honor Roll (All Semesters)', 'Engineering Honors Scholar']
        }
      ]
    }
  },
  {
    slug: 'fresher-resume-example',
    title: 'Fresher / Entry-Level Resume Example & Writing Guide',
    role: 'Entry-Level Graduate / Fresher',
    experienceLevel: 'Entry-Level',
    metaTitle: 'Fresher Resume Example (2026 Guide for Entry-Level Jobs) | BuildEasy',
    description: 'Complete entry-level fresher resume guide with formatting rules, internship highlights, transferable skills, capstone project showcasing, and sample layout.',
    recommendedTemplate: 'compact',
    recommendedTemplateName: 'Compact',
    summaryGuidance: {
      overview: 'Craft a forward-looking 3-line statement highlighting your educational foundation, top technical tools, internship accomplishments, and readiness to drive immediate value.',
      goodExample: 'Recent B.Tech in Information Technology graduate with strong foundation in full-stack web development, REST APIs, and relational databases. Completed 6-month software development internship building production features in React and Node.js; eager to contribute as an Associate Software Engineer.',
      badExample: 'Fresher looking for a job in a reputed IT company where I can use my skills and gain valuable experience to grow in my career.',
      tips: [
        'Lead with your degree and specific domain specialization.',
        'Mention tangible internship accomplishments or capstone project metrics.',
        'Target a specific role title (e.g., "Associate Frontend Developer", "Junior Business Analyst").'
      ]
    },
    recommendedStructure: {
      order: ['Contact Details & Portfolio', 'Professional Summary', 'Skills & Core Competencies', 'Internships & Practical Experience', 'Capstone & Academic Projects', 'Education'],
      rationale: 'Placing practical internship work and capstone projects above general coursework proves that you have hands-on, production-ready capabilities beyond theory.'
    },
    keySkills: {
      hard: ['JavaScript / Python / C#', 'SQL & Database Fundamentals', 'Git & GitHub Workflow', 'HTML5 / CSS3 / Tailwind', 'RESTful API Integration', 'Unit Testing Basics'],
      soft: ['Fast Learning Capacity', 'Clear Technical Communication', 'Detail-Oriented Problem Solving', 'Adaptability to Agile Workflows', 'Constructive Feedback Receptivity'],
      tools: ['VS Code / Eclipse', 'Postman', 'Git / GitHub', 'Jira / Trello', 'Figma Viewer']
    },
    bulletPointExamples: [
      {
        category: 'Internship & Real-World Experience',
        bullets: [
          'Assisted senior engineering team in developing 8 new responsive UI components in React, resolving 24 backlog bug tickets.',
          'Wrote automated unit test scripts using Jest, expanding module test coverage from 60% to 78%.',
          'Documented internal API endpoints in Swagger/Postman, reducing onboarding ramp-up time for new interns by 3 days.'
        ]
      },
      {
        category: 'Capstone & Major Projects',
        bullets: [
          'Engineered end-to-end Inventory Management Web App for final year capstone project using Node.js, Express, and PostgreSQL, winning Best Technical Project Award.',
          'Implemented role-based access control (RBAC) supporting Admin and Staff tiers with secure JWT session handling.'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using a generic, copy-pasted career objective statement from the web.',
        correction: 'Write a tailored summary emphasizing your specific degree, core strengths, and immediate role target.'
      },
      {
        mistake: 'Failing to explain technical projects clearly with context and tools used.',
        correction: 'Structure each project with: Project Name | Tech Stack | 2 bullet points covering problem, solution, and metric.'
      },
      {
        mistake: 'Submitting a 2-page or 3-page resume with large fonts and excessive spacing.',
        correction: 'Keep your entry-level resume strictly to a crisp, high-density 1-page document.'
      }
    ],
    sampleResume: {
      fullName: 'Rohan Sharma',
      title: 'Associate Software Developer',
      location: 'Austin, TX',
      email: 'rohan.sharma@email.com',
      linkedin: 'linkedin.com/in/rohansharma-dev',
      github: 'github.com/rohansharma',
      summary: 'Computer Science graduate with hands-on internship experience in full-stack JavaScript development and RESTful API integration. Eager to leverage skills in React, Node.js, and SQL to contribute to high-performance web applications as an Associate Developer.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'SQL', 'PostgreSQL', 'Git', 'HTML5/CSS3', 'Jest'],
      experience: [
        {
          role: 'Software Developer Intern',
          company: 'TechNovus Solutions',
          location: 'Austin, TX',
          date: 'Jan 2026 - May 2026',
          highlights: [
            'Collaborated with 5 senior engineers in building customer-facing billing features in React and Node.js.',
            'Refactored frontend form validation modules, reducing user input submission errors by 32%.',
            'Participated in daily standups, weekly sprint retrospectives, and peer code reviews.'
          ]
        }
      ],
      projects: [
        {
          name: 'Real-Time Task Collaboration Board',
          technologies: 'React, Node.js, Socket.io, PostgreSQL',
          date: '2025 - 2026',
          highlights: [
            'Built real-time collaborative kanban board supporting drag-and-drop task movements and live user status indicators.',
            'Awarded Best Engineering Capstone among 40 graduating senior project teams.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Information Technology',
          school: 'University of Texas at Dallas',
          location: 'Richardson, TX',
          date: '2022 - 2026',
          gpa: '3.78 / 4.0'
        }
      ]
    }
  }
];

export function getResumeExampleBySlug(slug: string): ResumeExample | undefined {
  return RESUME_EXAMPLES.find((e) => e.slug === slug);
}
