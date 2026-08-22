import { Article } from './types';

export const GROUP1_ARTICLES: Article[] = [
  {
    slug: 'how-to-get-noticed-by-recruiters',
    title: 'How to Make a Resume That Gets Noticed by Recruiters',
    subtitle: 'Learn how recruiters scan resumes in 6 seconds, what catches their eye immediately, and how to structure your resume for maximum impact.',
    category: 'RECRUITER INSIGHTS',
    metaTitle: 'How to Make a Resume That Gets Noticed by Recruiters | BuildEasy',
    description: 'Discover how recruiters review resumes, pass the 6-second initial scan, and structure your experience, summary, and layout to win more interviews.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '7 min read',
    keywords: ['resume for recruiters', '6 second resume scan', 'get noticed by recruiters', 'resume layout tips', 'recruiter resume preferences'],
    tags: ['Recruiters', 'Resume Tips', 'Job Search', 'Career Strategy', 'Formatting'],
    relatedSlugs: ['top-resume-mistakes-to-avoid', 'how-to-write-better-resume-bullet-points', 'how-to-quantify-achievements-on-resume'],
    headerPattern: 'corporate',
    sections: [
      {
        h2: 'Understand the Recruiter "6-Second Test"',
        paragraphs: [
          'When a job opening receives hundreds of applications, recruiters do not read every document from top to bottom. Instead, they perform an initial visual scan lasting approximately 6 to 10 seconds.',
          'During this swift evaluation, the recruiter’s eyes follow an F-shaped or Z-shaped visual pattern. They look for your current job title, company names, employment dates, core competencies, and overall visual cleanliness.'
        ],
        callout: {
          title: 'Recruiter Insight',
          text: 'If your resume looks cluttered, dense, or lacks clear hierarchy, recruiters will skip it before reading a single achievement bullet point.',
          type: 'info'
        }
      },
      {
        h2: '1. Put Critical Information in the Top 1/3 of the Page',
        paragraphs: [
          'The top third of your resume is prime real estate. Make sure it immediately answers three fundamental questions: Who are you, what is your specialization, and what is your level of experience?'
        ],
        listItems: [
          'Include a clear target role header right below your name (e.g., "Senior Product Marketing Manager")',
          'Write a focused 3-line summary emphasizing core strengths and measurable impact',
          'Highlight top hard skills and certifications upfront',
          'Ensure your phone number, location, and LinkedIn profile link are prominently displayed'
        ]
      },
      {
        h2: '2. Use High-Contrast, Minimalist Formatting',
        paragraphs: [
          'Recruiters appreciate clean, professional formatting over fancy graphics, multi-column sidebars, or progress bars.',
          'Stick to standard black or charcoal typography on a crisp white background. Use bold fonts strategically for position titles and organization names, and maintain consistent line spacing throughout.'
        ],
        exampleBox: {
          title: 'Visual Hierarchy Comparison',
          before: 'Weak: Small text, 4 different fonts, tight line margins, colorful progress bars for skills.',
          after: 'Strong: Clear section dividers, single clean sans-serif font, generous margins, bold job titles.'
        }
      },
      {
        h2: '3. Lead with Action Verbs and Numbers',
        paragraphs: [
          'Recruiters look for evidence of performance, not passive job descriptions. Replace phrases like "Responsible for managing a team" with strong action verbs and quantified achievements.'
        ],
        listItems: [
          'Spearheaded cross-functional team of 8 engineers, delivering project 2 weeks ahead of schedule',
          'Optimized sales funnel conversion by 24%, generating $1.2M in incremental ARR',
          'Streamlined customer onboarding workflow, reducing client drop-off rate from 18% to 5%'
        ]
      },
      {
        h2: '4. Tailor Job Titles and Keywords',
        paragraphs: [
          'If your official internal title was obscure (e.g., "Software Ninja II"), frame it on your resume with industry-standard terminology (e.g., "Full-Stack Software Engineer") while keeping the company name accurate.',
          'Mirror key terms from the target job posting so the recruiter instantly connects your background with their immediate hiring requirements.'
        ],
        internalLink: {
          text: 'To build a cleanly formatted resume that recruiters love to read, use ',
          url: '/builder',
          anchorText: 'BuildEasy Resume Builder'
        }
      }
    ]
  },
  {
    slug: 'top-resume-mistakes-to-avoid',
    title: '10 Resume Mistakes That Can Cost You an Interview',
    subtitle: 'Discover the most common formatting errors, typos, buzzwords, and structural flaws that cause recruiters to instantly reject candidates.',
    category: 'RESUME BASICS',
    metaTitle: '10 Resume Mistakes That Can Cost You an Interview | BuildEasy',
    description: 'Avoid the 10 biggest resume mistakes job seekers make in 2026. Fix typos, bad formatting, generic summaries, and unquantified experience.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '8 min read',
    keywords: ['resume mistakes', 'why resumes get rejected', 'common resume errors', 'resume formatting red flags', 'resume advice'],
    tags: ['Mistakes', 'Resume Tips', 'Job Search', 'ATS', 'Formatting'],
    relatedSlugs: ['how-to-get-noticed-by-recruiters', 'what-not-to-include-on-your-resume', 'how-to-write-an-ats-friendly-resume'],
    headerPattern: 'minimal',
    sections: [
      {
        h2: 'Why Small Resume Errors Have Big Consequences',
        paragraphs: [
          'In a competitive job market, hiring managers look for reasons to narrow down large applicant pools. A single glaring mistake—such as a spelling error or poor formatting—can instantly move your application to the rejection pile.',
          'Here are the 10 most damaging resume mistakes and how to fix them before submitting your next application.'
        ]
      },
      {
        h2: '1. Typos and Grammatical Errors',
        paragraphs: [
          'Spelling mistakes indicate a lack of attention to detail. Always proofread your resume multiple times, read it out loud, and run it through digital spell-check tools.'
        ]
      },
      {
        h2: '2. Using a Single Generic Resume for Every Job',
        paragraphs: [
          'Sending the exact same resume to 50 different job listings produces very low response rates. Customize your summary, key skills, and top bullet points for every target role.'
        ]
      },
      {
        h2: '3. Listing Responsibilities Instead of Achievements',
        paragraphs: [
          'Recruiters already know what a Project Manager or Marketer does day-to-day. They want to know how well YOU performed in the position.'
        ],
        exampleBox: {
          title: 'Responsibility vs Achievement',
          before: 'Weak: Responsible for managing social media accounts and posting updates.',
          after: 'Strong: Increased organic social media engagement by 140% across LinkedIn and Twitter, driving 12,000+ monthly website visits.'
        }
      },
      {
        h2: '4. Overly Complex or Unreadable Layouts',
        paragraphs: [
          'Fancy graphic elements, multi-column tables, skill progress bars, and custom icons confuse Applicant Tracking Systems (ATS) and make reading difficult for humans.'
        ]
      },
      {
        h2: '5. Missing Contact Details or Unprofessional Email',
        paragraphs: [
          'Ensure your email address is professional (preferably firstname.lastname@domain.com). Avoid outdated handle names from high school.'
        ]
      },
      {
        h2: '6. Including Irrelevant Personal Information',
        paragraphs: [
          'In US and European markets, do not include headshots, age, marital status, or full street addresses. Stick exclusively to relevant professional details.'
        ]
      },
      {
        h2: '7. Dense Walls of Text',
        paragraphs: [
          'Paragraphs longer than 3 lines are difficult to scan. Break information into concise bullet points with generous line spacing.'
        ]
      },
      {
        h2: '8. Using Vague Buzzwords and Clichés',
        paragraphs: [
          'Phrases like "Hardworking team player," "Out-of-the-box thinker," and "Results-driven professional" add zero value. Demonstrate those traits through real actions.'
        ],
        callout: {
          title: 'Pro Tip',
          text: 'Replace buzzwords with hard metrics and specific technology names.',
          type: 'tip'
        }
      },
      {
        h2: '9. Incorrect File Formats',
        paragraphs: [
          'Always submit your resume as a standard PDF unless the employer explicitly requests a Microsoft Word document (.docx).'
        ]
      },
      {
        h2: '10. Forgetting to Review Before Submitting',
        paragraphs: [
          'Use a checklist before pressing submit: verify date ranges, ensure email links work, and double-check target company names.'
        ],
        internalLink: {
          text: 'Ensure error-free formatting automatically with ',
          url: '/builder',
          anchorText: 'BuildEasy Clean Resume Templates'
        }
      }
    ]
  },
  {
    slug: 'how-to-write-an-ats-friendly-resume',
    title: 'How to Write an ATS-Friendly Resume in 2026',
    subtitle: 'A step-by-step guide to passing Applicant Tracking Systems with clean formatting, standard section titles, and effective keyword placement.',
    category: 'ATS & FORMATTING',
    metaTitle: 'How to Write an ATS-Friendly Resume in 2026 | BuildEasy',
    description: 'Learn how ATS systems parse resumes, how to format sections, optimize job keywords, and ensure your resume reaches real recruiters.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '9 min read',
    keywords: ['ATS friendly resume', 'Applicant Tracking System', 'ATS keywords', 'resume parsing', 'ATS resume checker'],
    tags: ['ATS', 'Formatting', 'Resume Tips', 'Keywords', 'Job Search'],
    relatedSlugs: ['how-to-match-resume-with-job-description', 'how-to-format-a-resume-correctly', 'one-page-vs-two-page-resume'],
    headerPattern: 'technical',
    sections: [
      {
        h2: 'What Is an ATS and How Does It Work?',
        paragraphs: [
          'An Applicant Tracking System (ATS) is software used by recruiters and hiring managers to collect, organize, scan, and rank job applications.',
          'When you submit your resume online, the ATS parses the document, breaks it down into structured data fields (Work History, Education, Skills), and indexes it for search queries entered by recruiters.'
        ]
      },
      {
        h2: '1. Use Standard Section Headings',
        paragraphs: [
          'ATS software relies on recognizable headings to categorize your information. Creative headings like "Where I Have Been" or "My Capabilities" confuse parsers.'
        ],
        listItems: [
          'Work Experience (or Professional Experience)',
          'Education',
          'Skills (or Core Competencies)',
          'Projects',
          'Certifications'
        ]
      },
      {
        h2: '2. Stick to Simple, Single-Column Formatting',
        paragraphs: [
          'Complex multi-column layouts, floating text boxes, graphics, and tables can cause ATS parsers to misalign dates, mash sections together, or drop text entirely.'
        ],
        exampleBox: {
          title: 'ATS Parsing Compatibility',
          before: 'Incompatible: Dual sidebars, graphic skill meters (80%), text boxes, custom icons.',
          after: 'Compatible: Standard top-to-bottom layout, clear plain text bullet points, standard bullet symbols.'
        }
      },
      {
        h2: '3. Naturally Incorporate Keywords from the Job Description',
        paragraphs: [
          'Identify core hard skills, tools, and methodologies mentioned in the target job posting and integrate them naturally into your summary, work experience, and skills list.'
        ],
        callout: {
          title: 'Keyword Density Warning',
          text: 'Never hide white text or stuff keywords repeatedly. Modern ATS parsers detect artificial keyword stuffing and will flag your document.',
          type: 'warning'
        }
      },
      {
        h2: '4. Choose ATS-Safe File Formats and Fonts',
        paragraphs: [
          'Export your resume as a clean PDF generated from standard HTML/text (not an image PDF). Standard web-safe fonts like Inter, Helvetica, Georgia, and Arial parse with 100% accuracy.'
        ],
        internalLink: {
          text: 'BuildEasy templates are engineered from the ground up for 100% ATS compliance. Create yours at ',
          url: '/builder',
          anchorText: 'BuildEasy ATS Builder'
        }
      }
    ]
  },
  {
    slug: 'how-to-write-a-professional-resume-summary',
    title: 'How to Write a Professional Resume Summary',
    subtitle: 'Craft a compelling 3–4 sentence elevator pitch at the top of your resume that highlights your core expertise, key metrics, and target role.',
    category: 'WRITING & CONTENT',
    metaTitle: 'How to Write a Professional Resume Summary | BuildEasy',
    description: 'Learn how to write a high-impact resume summary statement with formulas, examples for various industries, and common pitfalls to avoid.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['resume summary', 'professional summary examples', 'how to write resume summary', 'resume elevator pitch', 'resume profile'],
    tags: ['Resume Summary', 'Writing', 'Resume Tips', 'Examples', 'Career'],
    relatedSlugs: ['resume-objective-vs-resume-summary', 'how-to-get-noticed-by-recruiters', 'how-to-quantify-achievements-on-resume'],
    headerPattern: 'modern',
    sections: [
      {
        h2: 'What Is a Professional Resume Summary?',
        paragraphs: [
          'A professional resume summary is a concise, 3 to 4 sentence paragraph at the top of your resume. It summarizes your career background, key technical strengths, and top achievements.',
          'Think of it as your written elevator pitch designed to capture immediate interest.'
        ]
      },
      {
        h2: 'The 4-Part Resume Summary Formula',
        paragraphs: [
          'To write a strong summary quickly, follow this proven four-part structure:'
        ],
        listItems: [
          'Sentence 1: Job Title + Years of Experience + Core Expertise',
          'Sentence 2: Top quantifiable achievement or business impact',
          'Sentence 3: Key technical skills, methodologies, or certifications',
          'Sentence 4: Value proposition aligned with the target role'
        ]
      },
      {
        h2: 'Real-World Before & After Examples',
        exampleBox: {
          title: 'Software Engineer Summary Example',
          before: 'Weak: Experienced developer with passion for coding and working in team environments looking for a challenging role.',
          after: 'Strong: Full-Stack Engineer with 5+ years building scalable Web applications in React, TypeScript, and Node.js. Reduced application load times by 40% for a platform serving 500k monthly active users.'
        }
      },
      {
        h2: 'Tailoring Your Summary for Specific Jobs',
        paragraphs: [
          'Always adjust the title and primary skills in your summary to match the job posting you are applying to.'
        ],
        internalLink: {
          text: 'Craft and edit your summary effortlessly in our live editor at ',
          url: '/builder',
          anchorText: 'BuildEasy Resume Summary Tool'
        }
      }
    ]
  },
  {
    slug: 'resume-objective-vs-resume-summary',
    title: 'Resume Objective vs Resume Summary: Which Should You Use?',
    subtitle: 'Understand the key differences between a resume objective and a summary statement, when to use each, and real-world comparison examples.',
    category: 'RESUME BASICS',
    metaTitle: 'Resume Objective vs Resume Summary: Which Should You Use? | BuildEasy',
    description: 'Compare resume objective vs resume summary. Learn when to use a summary statement, when an objective works, and see before/after examples.',
    publishedAt: 'August 2026',
    updatedAt: 'August 2026',
    readTime: '6 min read',
    keywords: ['resume objective vs summary', 'resume objective statement', 'resume profile vs summary', 'entry level resume objective', 'career change summary'],
    tags: ['Resume Summary', 'Objective', 'Resume Basics', 'Career Starters', 'Writing'],
    relatedSlugs: ['how-to-write-a-professional-resume-summary', 'how-to-write-a-resume-with-no-work-experience', 'resume-guide-for-freshers-and-students'],
    headerPattern: 'creative',
    sections: [
      {
        h2: 'The Fundamental Difference',
        paragraphs: [
          'A Resume Objective focuses on what YOU want from the employer (e.g., "Seeking an entry-level position to utilize my communications degree").',
          'A Resume Summary focuses on what YOU CAN DO for the employer (e.g., "Digital Marketer with proven record of growing social engagement by 120%").'
        ],
        callout: {
          title: 'Rule of Thumb',
          text: '90% of experienced job seekers should use a Resume Summary. Resume Objectives are generally reserved for students or radical career changers.',
          type: 'tip'
        }
      },
      {
        h2: 'When to Use a Resume Summary',
        paragraphs: [
          'If you have 1+ years of relevant experience, internships, or quantifiable achievements, always use a professional summary.'
        ]
      },
      {
        h2: 'When a Resume Objective Is Appropriate',
        paragraphs: [
          'An objective statement can still work if you have zero work experience, are a recent high school or college graduate, or are pivoting to a completely new industry.'
        ],
        exampleBox: {
          title: 'Objective vs Summary Comparison',
          before: 'Objective: Hardworking Computer Science graduate seeking a junior developer role at an innovative tech company.',
          after: 'Modern Summary: Detail-oriented Computer Science graduate with hands-on experience building full-stack web applications in React and Python. Winner of 2025 University Hackathon.'
        }
      },
      {
        h2: 'How to Transition from Objective to Summary',
        paragraphs: [
          'Shift the focal point from your personal goals to the company’s pain points and how your skills solve them.'
        ],
        internalLink: {
          text: 'Try out both formats easily in the ',
          url: '/builder',
          anchorText: 'BuildEasy Resume Builder'
        }
      }
    ]
  }
];
