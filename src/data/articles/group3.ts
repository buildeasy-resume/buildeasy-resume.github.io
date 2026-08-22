import { Article } from './types';

export const GROUP3_ARTICLES: Article[] = [
  {
    slug: 'resume-guide-for-freshers-and-students',
    title: 'How to Write a Resume for Freshers and College Students',
    subtitle: 'A step-by-step guide for high school seniors, college students, and fresh graduates to build a standout first resume without prior corporate experience.',
    category: 'CAREER STARTERS',
    metaTitle: 'How to Write a Resume for Freshers and College Students | BuildEasy',
    description: 'Complete resume writing guide for freshers and students. Learn how to format education, GPA, campus leadership, internships, and projects.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '8 min read',
    keywords: ['fresher resume', 'college student resume', 'graduate resume', 'first resume guide', 'entry level resume formatting'],
    tags: ['Freshers', 'Students', 'College', 'Entry Level', 'Education'],
    relatedSlugs: ['how-to-write-a-resume-with-no-work-experience', 'how-to-list-projects-on-your-resume', 'how-to-choose-the-right-resume-template'],
    headerPattern: 'creative',
    sections: [
      {
        h2: 'The Goal of a Student Resume',
        paragraphs: [
          'As a fresh graduate or college student, recruiters do not expect 5 years of industry experience. Instead, they look for academic performance, eagerness to learn, relevant coursework, campus leadership, and practical project work.'
        ]
      },
      {
        h2: 'Optimal Section Hierarchy for Freshers',
        listItems: [
          'Header & Contact Info (Include LinkedIn & Portfolio/GitHub)',
          'Concise Career Summary or Target Objective',
          'Education (University, Degree, Graduation Date, GPA if >3.5)',
          'Relevant Coursework & Academic Honors',
          'Academic & Personal Projects',
          'Internships / Part-Time Work / Volunteer Experience',
          'Technical & Soft Skills'
        ]
      },
      {
        h2: 'How to Format the Education Section',
        paragraphs: [
          'Your education is your strongest asset as a fresher. List your degree name, university, city, graduation date, and notable coursework relevant to the target role.'
        ],
        exampleBox: {
          title: 'Student Education Format Example',
          before: 'Weak: Went to State University for BS Computer Science.',
          after: 'Strong: State University | San Jose, CA\nBachelor of Science in Computer Science (Graduated May 2026) — GPA: 3.8/4.0\n• Relevant Coursework: Data Structures & Algorithms, Web Engineering, Database Systems, Operating Systems\n• Dean’s Honor List (4 consecutive semesters)'
        }
      },
      {
        h2: 'Highlighting Campus Leadership and Clubs',
        paragraphs: [
          'Involvement in student associations, hackathons, sports teams, or volunteer work demonstrates teamwork and leadership.'
        ],
        internalLink: {
          text: 'Build your clean student resume in under 10 minutes with ',
          url: '/builder',
          anchorText: 'BuildEasy Student Builder'
        }
      }
    ]
  },
  {
    slug: 'how-to-format-a-resume-correctly',
    title: 'How to Format a Resume Correctly',
    subtitle: 'Font sizes, margin spacing, font families, line height, horizontal dividers, and A4 vs US Letter layout guidelines.',
    category: 'ATS & FORMATTING',
    metaTitle: 'How to Format a Resume Correctly | BuildEasy',
    description: 'Learn exact layout and formatting standards for modern resumes: margins, font sizes, line spacing, paper sizes, and visual alignment rules.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '7 min read',
    keywords: ['resume formatting standards', 'resume font size', 'resume margins', 'A4 vs US Letter resume', 'resume layout rules'],
    tags: ['Formatting', 'Layout', 'Typography', 'Margins', 'ATS'],
    relatedSlugs: ['how-to-write-an-ats-friendly-resume', 'one-page-vs-two-page-resume', 'make-resume-stand-out-without-overdesigning'],
    headerPattern: 'technical',
    sections: [
      {
        h2: 'Universal Resume Formatting Standards',
        paragraphs: [
          'Proper resume formatting creates a harmonious visual rhythm. Following industry guidelines ensures your document looks refined to humans and reads effortlessly for software.'
        ]
      },
      {
        h2: 'Font Size & Typographic Scale',
        listItems: [
          'Your Name: 20pt – 24pt (Bold)',
          'Section Headers (H2): 13pt – 15pt (Bold, Uppercase or Title Case)',
          'Job Titles & Subheadings: 11pt – 12pt (Bold)',
          'Body Text & Bullet Points: 10pt – 11pt (Regular weight)',
          'Line Spacing: 1.15 to 1.3 for optimal legibility'
        ]
      },
      {
        h2: 'Margins and Padding Rules',
        paragraphs: [
          'Standard page margins should be set between 0.5 inches (12.7mm) and 1.0 inch (25.4mm). Never reduce margins below 0.5 inches to cram text, as printing engines may cut off content.'
        ]
      },
      {
        h2: 'US Letter vs. A4 Standard',
        paragraphs: [
          'Use US Letter (8.5 x 11 inches) for applications in North America. Use A4 (210 x 297 mm) for Europe, Asia, and international applications.'
        ],
        exampleBox: {
          title: 'Page Format Quick Reference',
          before: 'North America: US Letter Format',
          after: 'Rest of World / International: A4 Standard'
        },
        internalLink: {
          text: 'Toggle between US Letter and A4 with one click in ',
          url: '/builder',
          anchorText: 'BuildEasy Page Settings'
        }
      }
    ]
  },
  {
    slug: 'one-page-vs-two-page-resume',
    title: 'One-Page Resume vs Two-Page Resume: Which Is Better?',
    subtitle: 'When to keep your resume on a single page versus when a two-page layout is expected based on years of experience and seniority.',
    category: 'RESUME BASICS',
    metaTitle: 'One-Page Resume vs Two-Page Resume: Which Is Better? | BuildEasy',
    description: 'Decide whether a 1-page or 2-page resume is right for you. Learn length standards by career level, tips to trim fluff, and page count rules.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['one page vs two page resume', 'resume length', 'how long should a resume be', '1 page resume', '2 page resume guidelines'],
    tags: ['Resume Length', 'Formatting', 'Page Count', 'Career Strategy', 'Resume Tips'],
    relatedSlugs: ['how-to-format-a-resume-correctly', 'how-to-get-noticed-by-recruiters', 'what-not-to-include-on-your-resume'],
    headerPattern: 'corporate',
    sections: [
      {
        h2: 'The General Length Rule by Experience Level',
        paragraphs: [
          'Resume length should be dictated by the depth of your relevant professional experience, not arbitrary rules.'
        ],
        listItems: [
          '1 Page: Freshers, college students, entry-level professionals (0–5 years of experience)',
          '2 Pages: Mid-to-senior level professionals (5–15+ years of experience), managers, directors',
          '3+ Pages: Academic CVs, scientific researchers, medical doctors, executive board members'
        ]
      },
      {
        h2: 'The Cardinal Rule: Avoid the Half-Page Spillover',
        paragraphs: [
          'One of the worst visual errors is having a two-page resume where page 2 contains only 3 or 4 straggling lines of text. Either trim content to fit 1 full page or expand content meaningfully to fill 2 pages.'
        ],
        callout: {
          title: 'Visual Balance Tip',
          text: 'If your content spills onto page 2 by just a few lines, adjust spacing, line height, or margin density in your editor.',
          type: 'tip'
        }
      },
      {
        h2: 'How to Trim a Resume Down to 1 Page',
        listItems: [
          'Remove jobs older than 10–12 years unless directly relevant',
          'Reduce bullet points for earlier career positions from 5 to 2',
          'Combine contact info into a single horizontal row at the top',
          'Eliminate generic references, interest hobbies, and redundant text'
        ],
        internalLink: {
          text: 'Adjust content density dynamically using ',
          url: '/builder',
          anchorText: 'BuildEasy Density Controls'
        }
      }
    ]
  },
  {
    slug: 'how-to-tailor-your-resume-for-every-job',
    title: 'How to Tailor Your Resume for Every Job',
    subtitle: 'Why sending generic resumes fails and how to customize your summary, bullet points, and skills in under 10 minutes per application.',
    category: 'STRATEGY & TARGETING',
    metaTitle: 'How to Tailor Your Resume for Every Job | BuildEasy',
    description: 'Learn how to customize your resume for every job application. Boost response rates by aligning summaries, skills, and accomplishments.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '8 min read',
    keywords: ['tailored resume', 'customize resume for job', 'targeted resume', 'resume job matching', 'tailoring strategy'],
    tags: ['Tailoring', 'Job Search', 'ATS', 'Targeting', 'Strategy'],
    relatedSlugs: ['how-to-match-resume-with-job-description', 'how-to-write-an-ats-friendly-resume', 'how-to-get-noticed-by-recruiters'],
    headerPattern: 'modern',
    sections: [
      {
        h2: 'Why Generic Resumes Get Low Response Rates',
        paragraphs: [
          'Recruiters receive hundreds of applications per posting. A generic resume that tries to appeal to everyone usually appeals to no one.',
          'Tailoring your resume demonstrates immediate alignment with the employer’s specific requirements, increasing interview callbacks by up to 3x.'
        ]
      },
      {
        h2: 'The 10-Minute Tailoring Process',
        listItems: [
          'Step 1: Read the job description and highlight 5–8 required hard skills & keywords',
          'Step 2: Update your Resume Summary target role title to match the exact job title',
          'Step 3: Reorder your Skills section so top required technologies appear first',
          'Step 4: Swap out 2 or 3 bullet points to emphasize relevant achievements matching the role’s primary responsibility'
        ]
      },
      {
        h2: 'Tailoring Example',
        exampleBox: {
          title: 'Tailored Summary Comparison',
          before: 'Generic: Senior Software Developer with experience in web and mobile applications.',
          after: 'Tailored for Fintech Lead: Senior Full-Stack Engineer with 6+ years specializing in secure payment gateways, microservices architecture, and React/Node.js systems.'
        }
      },
      {
        h2: 'Maintain a Master Resume Document',
        paragraphs: [
          'Keep a comprehensive "master resume" containing all your past projects, bullet points, and certifications. When applying, make a copy and trim down to the most relevant items.'
        ],
        internalLink: {
          text: 'Duplicate and customize resume variations easily in ',
          url: '/builder',
          anchorText: 'BuildEasy Resume Builder'
        }
      }
    ]
  },
  {
    slug: 'how-to-match-resume-with-job-description',
    title: 'How to Match Your Resume With a Job Description',
    subtitle: 'Step-by-step technique for analyzing a job posting, identifying core skills and keywords, and seamlessly weaving them into your resume.',
    category: 'STRATEGY & TARGETING',
    metaTitle: 'How to Match Your Resume With a Job Description | BuildEasy',
    description: 'Learn how to analyze job postings, extract high-priority keywords, and match your resume experience directly to job descriptions.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '7 min read',
    keywords: ['match resume to job description', 'job description keywords', 'ATS keyword matching', 'resume alignment', 'resume keyword scan'],
    tags: ['Job Description', 'Keywords', 'Targeting', 'ATS', 'Resume Strategy'],
    relatedSlugs: ['how-to-tailor-your-resume-for-every-job', 'how-to-write-an-ats-friendly-resume', 'best-resume-skills-to-include'],
    headerPattern: 'technical',
    sections: [
      {
        h2: 'How Job Postings Are Written',
        paragraphs: [
          'Job descriptions are structured lists of problems the company needs solved. By decoding the job posting, you can mirror the exact phrasing and technical skills the employer is seeking.'
        ]
      },
      {
        h2: '1. Extract Required vs. Preferred Qualifications',
        paragraphs: [
          'Focus primarily on the "Requirements" or "Qualifications" section of the job ad. These are the non-negotiable filters recruiters use during screening.'
        ],
        listItems: [
          'Hard Skills & Software (e.g., Python, Kubernetes, Salesforce)',
          'Certifications & Education (e.g., PMP, AWS Certified Solutions Architect)',
          'Years of Experience in specific domains'
        ]
      },
      {
        h2: '2. Mirror Industry Standard Phrasing',
        paragraphs: [
          'If the job posting specifies "Cross-Functional Team Collaboration," use that exact phrase instead of "working with different teams."'
        ]
      },
      {
        h2: '3. Where to Insert Matched Keywords',
        paragraphs: [
          'Distribute keywords naturally across three core locations: Professional Summary, Skills Section, and Work Experience Bullet Points.'
        ],
        callout: {
          title: 'Authenticity First',
          text: 'Only include skills you actually possess. Misrepresenting expertise on your resume damages credibility during technical interview rounds.',
          type: 'warning'
        },
        internalLink: {
          text: 'Format your matched skills cleanly with ',
          url: '/builder',
          anchorText: 'BuildEasy Resume Builder'
        }
      }
    ]
  }
];
