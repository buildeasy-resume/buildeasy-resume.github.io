import { PortfolioData, createBlankResume } from '../types';

/**
 * EXTREME TEST RESUMES
 * Used to verify layout stability, border safety, and pagination
 */

export const EXTREME_TEST_RESUME: PortfolioData = {
  ...createBlankResume(),
  id: 'extreme-test-resume',
  resumeName: 'Extreme Stress Test',
  basicInfo: {
    name: 'Senior Principal Software Engineer and Distributed Infrastructure Architecture Specialist',
    tagline: 'International Advanced Cloud Computing Technologies and Enterprise Systems Corporation Specialist',
    email: 'extremely.long.email.address.that.might.wrap.or.hit.the.edge@example.company.com',
    phone: '+1 (555) 000-0000 EXT 12345',
    location: 'San Francisco, California, United States of America, North America, Planet Earth',
    website: 'github.com/username/extremely-long-project-name-and-description-that-goes-on-and-on',
    firstName: 'Senior Principal',
    lastName: 'Specialist',
    summary: 'This is a deliberately long summary designed to test text wrapping and line spacing consistency across different templates. It contains many characters and should wrap naturally within the 15mm safe margins defined in the ResumePage shell. We want to ensure that typography remains legible and that the leading/line-height is respected even when the paragraph becomes quite dense.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Principal Staff Lead Engineer of Global Systems and Distributed Cloud Infrastructure Reliability',
      org: 'International Advanced Cloud Computing Technologies and Enterprise Systems Corporation',
      startDate: 'Jan 2018',
      endDate: 'Present',
      location: 'Remote / Global',
      bullets: [
        'Implemented a high-throughput, low-latency data processing pipeline that handled over 500 petabytes of raw telemetry data per day across 45 global data centers with zero downtime.',
        'Developed a custom consensus algorithm based on Raft and Paxos to ensure strong consistency in a highly partitioned network environment, reducing conflict resolution time by 85%.',
        'Managed a cross-functional team of 150 engineers across 12 time zones, ensuring high-quality code delivery and maintaining an incident-free production environment for 24 consecutive months.',
        'This is a very long bullet point with over 300 characters designed to test the indentation and wrapping logic of the resume templates to ensure that the text aligns correctly with the bullet point rather than drifting towards the edge of the page boundary.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Senior Software Architect',
      org: 'Another Extremely Long Company Name Inc.',
      startDate: '2015',
      endDate: '2017',
      bullets: ['Did a lot of architectural work.']
    },
    // Adding many entries to test multi-page pagination
    ...Array.from({ length: 15 }).map((_, i) => ({
      id: `exp-pagination-${i}`,
      role: `Recurring Experience Entry #${i + 3}`,
      org: `Pagination Test Company #${i + 3}`,
      startDate: '2010',
      endDate: '2014',
      bullets: ['Point one', 'Point two']
    }))
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of Extremely Long Named Educational Institution of Technology and Sciences',
      degree: 'Master of Science in Advanced Computational Theoretical Physics and Mathematical Engineering',
      field: 'Advanced Computational Theoretical Physics',
      startDate: '2008',
      endDate: '2010',
      description: 'Focus on quantum computing.'
    }
  ],
  skills: [
    'Advanced Distributed Systems Architecture',
    'Cloud Native Technologies',
    'Kubernetes',
    'Docker',
    'Terraform',
    'Go',
    'Rust',
    'C++',
    'Distributed Hash Tables',
    'Consensus Algorithms',
    'Service Mesh',
    'eBPF',
    'Global Load Balancing'
  ]
};
