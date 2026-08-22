import { PortfolioData } from '../types';

export interface KeywordResult {
  term: string;
  evidence: ('skills' | 'experience' | 'projects' | 'summary')[];
  priority: 'high' | 'medium' | 'low';
  contextualStrength: 'STRONG' | 'SUPPORTED' | 'MENTIONED' | 'NOT_FOUND';
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  message: string;
  tabTarget?: string;
}

export interface ScoreExplanation {
  score: number | null;
  label: string;
  explanation: string;
}

export interface ATSAnalysisResult {
  overallScore: number;
  overallStatus: string;
  hasJd: boolean;
  
  atsCompatibility: ScoreExplanation;
  jobMatch: ScoreExplanation;
  experienceRelevance: ScoreExplanation;
  structureScore: ScoreExplanation;
  contentQuality: ScoreExplanation;
  
  keywordAnalysis: {
    matched: KeywordResult[];
    partial: KeywordResult[];
    missing: KeywordResult[];
  };
  recommendations: Recommendation[];
}

const STOP_WORDS = new Set([
  'the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but',
  'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not', 'we', 'my', 'by',
  'about', 'all', 'any', 'from', 'how', 'me', 'our', 'what', 'when', 'which', 'who', 'will', 'your',
  'can', 'do', 'has', 'their', 'there', 'they', 'an', 'some', 'more', 'other', 'such', 'into', 'up'
]);

const TECH_CANONICAL_MAP: Record<string, string> = {
  'js': 'JavaScript', 'javascript': 'JavaScript', 'ts': 'TypeScript', 'typescript': 'TypeScript',
  'node': 'Node.js', 'nodejs': 'Node.js', 'node.js': 'Node.js', 'react': 'React', 'react.js': 'React',
  'reactjs': 'React', 'next': 'Next.js', 'next.js': 'Next.js', 'nextjs': 'Next.js', 'vue': 'Vue.js',
  'vuejs': 'Vue.js', 'vue.js': 'Vue.js', 'angular': 'Angular', 'html': 'HTML', 'css': 'CSS',
  'aws': 'AWS', 'amazon web services': 'AWS', 'gcp': 'Google Cloud', 'google cloud': 'Google Cloud',
  'azure': 'Azure', 'docker': 'Docker', 'k8s': 'Kubernetes', 'kubernetes': 'Kubernetes',
  'ci/cd': 'CI/CD', 'cicd': 'CI/CD', 'postgres': 'PostgreSQL', 'postgresql': 'PostgreSQL',
  'mongo': 'MongoDB', 'mongodb': 'MongoDB', 'sql': 'SQL', 'python': 'Python', 'django': 'Django',
  'flask': 'Flask', 'java': 'Java', 'spring': 'Spring', 'springboot': 'Spring Boot',
  'spring boot': 'Spring Boot', 'c++': 'C++', 'c#': 'C#', '.net': '.NET', 'go': 'Go', 'golang': 'Go',
  'ruby': 'Ruby', 'rails': 'Ruby on Rails', 'ruby on rails': 'Ruby on Rails', 'php': 'PHP',
  'laravel': 'Laravel', 'rust': 'Rust', 'swift': 'Swift', 'kotlin': 'Kotlin', 'rest': 'REST API',
  'restful': 'REST API', 'rest api': 'REST API', 'graphql': 'GraphQL', 'machine learning': 'Machine Learning',
  'ml': 'Machine Learning', 'ai': 'AI', 'artificial intelligence': 'AI', 'agile': 'Agile',
  'scrum': 'Scrum', 'git': 'Git', 'linux': 'Linux', 'terraform': 'Terraform', 'ansible': 'Ansible',
  'redis': 'Redis', 'kafka': 'Kafka', 'graphql api': 'GraphQL'
};

const MULTI_WORD_PHRASES = [
  'machine learning', 'data analysis', 'rest api', 'rest apis', 'ci/cd',
  'amazon web services', 'google cloud', 'ruby on rails', 'spring boot',
  'artificial intelligence', 'system design', 'computer science', 'front end',
  'back end', 'full stack', 'project management', 'agile methodology', 'test automation',
  'unit testing', 'continuous integration', 'continuous deployment'
];

const ACTION_VERBS = new Set([
  'developed', 'built', 'implemented', 'designed', 'deployed', 'optimized', 'automated', 
  'migrated', 'managed', 'led', 'architected', 'created', 'engineered', 'launched', 'delivered',
  'spearheaded', 'orchestrated', 'reduced', 'increased', 'improved', 'decreased', 'accelerated',
  'saved', 'grew', 'scaled', 'generated'
]);

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s\+\#\.\/\-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function analyzeMetrics(text: string): boolean {
  // Recognize percentages, money, multipliers, sizes, times
  const metricRegex = /\b(\d+(?:\.\d+)?(?:%|k\+|m\+|b|x|ms|s|m|k|b)?|\$\d+(?:[kmb])?)\b/i;
  const impactWords = /\b(reduced|increased|improved|decreased|accelerated|saved|grew|scaled|generated|delivered|users|clients|customers|latency)\b/i;
  return metricRegex.test(text.replace(/\s/g, '')) || impactWords.test(text);
}

function classifyJDPriority(sentence: string): 'high' | 'medium' | 'low' {
  const s = sentence.toLowerCase();
  if (s.includes('required') || s.includes('must have') || s.includes('minimum') || s.includes('qualifications') || s.includes('proficient')) {
    return 'high';
  }
  if (s.includes('preferred') || s.includes('nice to have') || s.includes('plus')) {
    return 'low';
  }
  return 'medium'; // responsibilities, etc.
}

function extractKeywordsFromJD(jdText: string) {
  const sentences = jdText.split(/[.?!;\n]/);
  const keywordPriorities = new Map<string, 'high' | 'medium' | 'low'>();

  sentences.forEach(sentence => {
    if (!sentence.trim()) return;
    const priority = classifyJDPriority(sentence);
    const lowerSent = normalizeText(sentence);
    
    // Check multi-word phrases first
    MULTI_WORD_PHRASES.forEach(phrase => {
      if (lowerSent.includes(phrase)) {
        const canonical = TECH_CANONICAL_MAP[phrase] || phrase;
        const existing = keywordPriorities.get(canonical);
        if (!existing || priority === 'high') { // Upgrade to high if found in a high priority sentence
          keywordPriorities.set(canonical, priority);
        }
      }
    });

    // Check single words using heuristic to avoid false positive prose
    const origWords = sentence.split(/\s+/).filter(w => w.length > 1);
    origWords.forEach((origWord, idx) => {
      const w = normalizeText(origWord);
      if (!w || STOP_WORDS.has(w)) return;
      
      let isKeyword = false;
      let canonical = TECH_CANONICAL_MAP[w];
      
      if (canonical) {
        isKeyword = true;
      } else {
        // Heuristic for unknown tech:
        // 1. Contains numbers or specific tech symbols
        // 2. Or is Capitalized in the middle of a sentence (proper noun)
        const hasSpecialChars = /[0-9#\+\-\.]/.test(origWord);
        const cleanWord = origWord.replace(/^[^\w]+|[^\w]+$/g, ''); // strip surrounding punctuation
        const isCapitalized = /^[A-Z]/.test(cleanWord);
        
        if (hasSpecialChars || (isCapitalized && idx > 0)) {
           isKeyword = true;
           canonical = cleanWord;
           // Ensure it has at least some letters
           if (!/[a-zA-Z]/.test(canonical)) isKeyword = false;
           if (canonical.length <= 2 && canonical !== canonical.toUpperCase()) isKeyword = false;
        }
      }

      if (isKeyword && canonical && canonical.length > 1 && !/^\d+$/.test(canonical) && !STOP_WORDS.has(canonical.toLowerCase())) {
         const finalCanonical = TECH_CANONICAL_MAP[canonical.toLowerCase()] || canonical;
         const existing = keywordPriorities.get(finalCanonical);
         if (!existing || priority === 'high') {
           keywordPriorities.set(finalCanonical, priority);
         }
      }
    });
  });

  return keywordPriorities;
}

function assessContextualStrength(termVariations: string[], textBlocks: string[]): 'STRONG' | 'SUPPORTED' | 'MENTIONED' | 'NOT_FOUND' {
  let isStrong = false;
  let isSupported = false;

  textBlocks.forEach(block => {
    const lowerBlock = block.toLowerCase();
    let termFound = false;
    termVariations.forEach(term => {
      if (termFound) return;
      if (!term) return;
      const regex = new RegExp(`(?<![a-z0-9])${escapeRegExp(term)}(?![a-z0-9])`, 'i');
      if (regex.test(lowerBlock)) {
        termFound = true;
      }
    });

    if (termFound) {
      isSupported = true;
      // Check if there's an action verb nearby (naive window approach)
      const words = lowerBlock.split(/\s+/);
      const termIdx = words.findIndex(w => termVariations.some(t => w.includes(t.toLowerCase())));
      if (termIdx !== -1) {
        const windowStart = Math.max(0, termIdx - 8);
        const windowEnd = Math.min(words.length, termIdx + 8);
        const windowWords = words.slice(windowStart, windowEnd);
        if (windowWords.some(w => ACTION_VERBS.has(w))) {
          isStrong = true;
        }
      }
    }
  });

  if (isStrong) return 'STRONG';
  if (isSupported) return 'SUPPORTED';
  return 'NOT_FOUND';
}

function checkDateConsistency(data: PortfolioData, recommendations: Recommendation[]) {
  const items = [...(data.experience || []), ...(data.education || [])];
  let inconsistentFound = false;

  items.forEach(item => {
    if (item.startDate && item.endDate) {
       if (item.endDate.toLowerCase() === 'present' || item.endDate.toLowerCase() === 'current') return;
       // Very basic heuristic: if both have 4-digit years, check if end < start
       const startYearMatch = item.startDate.match(/\b(19|20)\d{2}\b/);
       const endYearMatch = item.endDate.match(/\b(19|20)\d{2}\b/);
       if (startYearMatch && endYearMatch) {
         const startYear = parseInt(startYearMatch[0], 10);
         const endYear = parseInt(endYearMatch[0], 10);
         if (endYear < startYear) {
           inconsistentFound = true;
         }
       }
    }
  });

  if (inconsistentFound) {
    recommendations.push({ 
      id: 'date-inconsistency', 
      priority: 'low', 
      message: 'Detected an end date that appears to be earlier than the start date. Verify your chronology.',
      tabTarget: 'experience'
    });
  }
}

export function analyzeResumeATS(data: PortfolioData, jobDescription: string = ''): ATSAnalysisResult {
  const recommendations: Recommendation[] = [];
  
  // 1. Structure Analysis (Base Completeness & ATS Compatibility)
  let structureScore = 100;
  let atsCompatibility = 100;
  let structureExplanations = [];
  let atsExplanations = [];
  
  // Contact check
  const hasEmail = Boolean(data.basicInfo?.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.basicInfo.email.trim()));
  const hasPhone = Boolean(data.basicInfo?.phone?.trim());
  const hasName = Boolean(data.basicInfo?.name?.trim());
  
  if (!hasEmail) {
    structureScore -= 15;
    atsCompatibility -= 20;
    recommendations.push({ id: 'missing-email', priority: 'high', message: 'Valid contact email address is missing. ATS systems cannot link you without an email.', tabTarget: 'basic' });
    atsExplanations.push('Missing valid email address (-20)');
  }
  if (!hasPhone) {
    structureScore -= 10;
    atsCompatibility -= 10;
    recommendations.push({ id: 'missing-phone', priority: 'high', message: 'Phone number is missing. Essential for ATS parsing.', tabTarget: 'basic' });
    atsExplanations.push('Missing phone number (-10)');
  }
  if (!hasName) {
    structureScore -= 20;
    atsCompatibility -= 30;
    recommendations.push({ id: 'missing-name', priority: 'high', message: 'Full name is missing.', tabTarget: 'basic' });
    atsExplanations.push('Missing name (-30)');
  }
  
  // Section Checks
  const experienceCount = (data.experience || []).filter(e => e.role?.trim() && e.org?.trim()).length;
  const educationCount = (data.education || []).filter(e => e.institution?.trim()).length;
  const skillsCount = (data.skills || []).filter(s => s.trim()).length;
  const projectsCount = (data.projects || []).filter(p => p.title?.trim()).length;
  
  if (experienceCount === 0 && educationCount === 0 && projectsCount === 0) {
    structureScore -= 30;
    atsCompatibility -= 30;
    recommendations.push({ id: 'missing-core-sections', priority: 'high', message: 'Resume must have Experience, Education, or Projects.', tabTarget: 'experience' });
    structureExplanations.push('Missing all core sections (Experience, Education, Projects)');
  } else if (experienceCount === 0) {
    if (educationCount > 0 && projectsCount > 0) {
      recommendations.push({ id: 'no-experience-student', priority: 'low', message: 'No professional work experience found. Ensure your projects clearly demonstrate your technical skills.', tabTarget: 'projects' });
      structureExplanations.push('No work experience (mitigated by Projects/Education)');
    } else {
      structureScore -= 15;
      recommendations.push({ id: 'missing-experience', priority: 'medium', message: 'Adding work experience is highly recommended if applicable.', tabTarget: 'experience' });
      structureExplanations.push('Missing Experience section (-15)');
    }
  }
  
  if (skillsCount === 0) {
    structureScore -= 15;
    atsCompatibility -= 15;
    recommendations.push({ id: 'missing-skills', priority: 'high', message: 'No skills added. ATS keyword parsers heavily rely on your skills inventory.', tabTarget: 'skills' });
    atsExplanations.push('Missing Skills section (-15)');
  }

  // 2. Content Quality (Metrics, Action Verbs, Depth)
  let contentQuality = 100;
  let totalBullets = 0;
  let metricBullets = 0;
  let weakBullets = 0;
  
  const allExperienceBullets = (data.experience || []).flatMap(e => e.bullets || []);
  const allProjectBullets = (data.projects || []).flatMap(p => p.bullets || []);
  
  [...allExperienceBullets, ...allProjectBullets].forEach(bullet => {
    totalBullets++;
    if (analyzeMetrics(bullet)) metricBullets++;
    if (bullet.trim().split(/\s+/).length < 5) {
       weakBullets++;
    }
  });

  if (totalBullets > 0) {
    const metricRatio = metricBullets / totalBullets;
    if (metricRatio < 0.2) {
      contentQuality -= 15;
      recommendations.push({ id: 'low-metrics', priority: 'medium', message: `Only ${metricBullets} of ${totalBullets} bullets contain measurable outcomes. Add numbers/impact metrics to quantify your impact.`, tabTarget: 'experience' });
    }
    if (weakBullets > 0) {
      contentQuality -= (weakBullets * 2);
      recommendations.push({ id: 'weak-bullets', priority: 'medium', message: `${weakBullets} bullet(s) are very short. Expand on what you did, how you did it, and the result.`, tabTarget: 'experience' });
    }
  } else if (experienceCount > 0 || projectsCount > 0) {
    contentQuality -= 25;
    recommendations.push({ id: 'no-bullets', priority: 'high', message: 'Use bullet points in Experience and Projects to describe your impact clearly for parsers.', tabTarget: 'experience' });
  }

  // Duplicates check
  const uniqueBullets = new Set([...allExperienceBullets, ...allProjectBullets].map(b => b.toLowerCase().trim()));
  if (uniqueBullets.size < totalBullets && totalBullets > 0) {
    contentQuality -= 10;
    recommendations.push({ id: 'duplicate-bullets', priority: 'medium', message: `Possible duplicate bullet points detected. Ensure each bullet is unique.`, tabTarget: 'experience' });
  }

  checkDateConsistency(data, recommendations);

  // 3. Keyword / Job Description Match
  const hasJd = Boolean(jobDescription && jobDescription.trim().length > 10);
  let jobMatch: number | null = null;
  let experienceRelevance = 100;
  
  const keywordAnalysis = {
    matched: [] as KeywordResult[],
    partial: [] as KeywordResult[],
    missing: [] as KeywordResult[]
  };

  let jobMatchExplanations = [];
  let expRelExplanations = [];

  if (hasJd) {
    const jdKeywords = extractKeywordsFromJD(jobDescription);
    
    const skillsText = normalizeText((data.skills || []).join(' '));
    const summaryText = normalizeText(data.basicInfo?.summary || '');
    const experienceBlocks = (data.experience || []).flatMap(e => [e.role, e.org, ...(e.bullets || [])]).filter(Boolean);
    const projectsBlocks = (data.projects || []).flatMap(p => [p.title, p.description || '', ...(p.tech || []), ...(p.bullets || [])]).filter(Boolean);
    const fullResumeText = skillsText + ' ' + summaryText + ' ' + experienceBlocks.join(' ') + ' ' + projectsBlocks.join(' ');

    let totalWeight = 0;
    let earnedWeight = 0;
    let expEvidenceCount = 0;
    let requiredMissingCount = 0;

    const keywordsToEvaluate = Array.from(jdKeywords.entries()).slice(0, 40); // Top 40
    
    if (keywordsToEvaluate.length > 0) {
      keywordsToEvaluate.forEach(([canonicalName, priority]) => {
        const origToken = Object.keys(TECH_CANONICAL_MAP).find(k => TECH_CANONICAL_MAP[k] === canonicalName) || canonicalName;
        const termVariations = [
          origToken.toLowerCase(),
          canonicalName.toLowerCase(),
          origToken.replace(/[\.\-\s]/g, '')
        ];

        let inSkills = false;
        let inSummary = false;
        let foundAnywhere = false;

        termVariations.forEach(term => {
          if (!term) return;
          const regex = new RegExp(`(?<![a-z0-9])${escapeRegExp(term)}(?![a-z0-9])`, 'i');
          if (regex.test(skillsText)) inSkills = true;
          if (regex.test(summaryText)) inSummary = true;
          if (regex.test(fullResumeText)) foundAnywhere = true;
        });

        const expStrength = assessContextualStrength(termVariations, experienceBlocks);
        const projStrength = assessContextualStrength(termVariations, projectsBlocks);
        
        let contextualStrength: 'STRONG' | 'SUPPORTED' | 'MENTIONED' | 'NOT_FOUND' = 'NOT_FOUND';
        if (expStrength === 'STRONG' || projStrength === 'STRONG') contextualStrength = 'STRONG';
        else if (expStrength === 'SUPPORTED' || projStrength === 'SUPPORTED') contextualStrength = 'SUPPORTED';
        else if (inSkills || inSummary) contextualStrength = 'MENTIONED';

        const evidence: KeywordResult['evidence'] = [];
        if (inSkills) evidence.push('skills');
        if (inSummary) evidence.push('summary');
        if (expStrength !== 'NOT_FOUND') evidence.push('experience');
        if (projStrength !== 'NOT_FOUND') evidence.push('projects');

        const weight = priority === 'high' ? 3 : priority === 'medium' ? 2 : 1;
        totalWeight += weight;

        if (foundAnywhere) {
          if (contextualStrength === 'STRONG' || contextualStrength === 'SUPPORTED') {
            expEvidenceCount++;
            earnedWeight += weight;
            keywordAnalysis.matched.push({ term: canonicalName, evidence, priority, contextualStrength });
          } else {
            // Mentioned only (Skills/Summary without Experience/Projects support)
            earnedWeight += (weight * 0.4); // Partial credit
            keywordAnalysis.partial.push({ term: canonicalName, evidence, priority, contextualStrength });
          }
        } else {
          if (priority === 'high') requiredMissingCount++;
          keywordAnalysis.missing.push({ term: canonicalName, evidence, priority, contextualStrength });
        }
      });

      jobMatch = Math.round((earnedWeight / totalWeight) * 100);
      experienceRelevance = Math.round((expEvidenceCount / keywordsToEvaluate.length) * 100);
      
      jobMatchExplanations.push(`Matched ${keywordAnalysis.matched.length} terms, partially matched ${keywordAnalysis.partial.length} terms out of ${keywordsToEvaluate.length} weighted job requirements.`);
      if (requiredMissingCount > 0) {
        jobMatchExplanations.push(`${requiredMissingCount} high-priority requirements are missing.`);
      }

      expRelExplanations.push(`${expEvidenceCount} terms were strongly supported by Action Verbs in Experience/Projects.`);

      if (requiredMissingCount > 0) {
        const missingHigh = keywordAnalysis.missing.filter(k => k.priority === 'high').slice(0, 3).map(k => k.term).join(', ');
        recommendations.push({ id: 'missing-high-priority', priority: 'high', message: `Missing required terms: ${missingHigh}. If you genuinely have these skills, demonstrate them in your experience or projects.` });
      }
      
      const partialHigh = keywordAnalysis.partial.filter(k => k.priority === 'high').slice(0, 3);
      if (partialHigh.length > 0) {
        experienceRelevance -= 15;
        recommendations.push({ id: 'skill-without-evidence', priority: 'medium', message: `${partialHigh.map(t => t.term).join(', ')} appear in Skills but lack strong demonstration in Experience/Projects.` });
        expRelExplanations.push(`Penalty: High-priority skills mentioned but not demonstrated in experience.`);
      }
    } else {
      jobMatch = 0;
      jobMatchExplanations.push('Could not extract meaningful requirements from JD.');
    }
  } else {
    experienceRelevance = contentQuality;
    expRelExplanations.push('No Job Description provided. Experience relevance is estimated based on content quality.');
  }

  // Bounds
  structureScore = Math.max(0, Math.min(100, structureScore));
  contentQuality = Math.max(0, Math.min(100, contentQuality));
  atsCompatibility = Math.max(0, Math.min(100, atsCompatibility));
  if (jobMatch !== null) jobMatch = Math.max(0, Math.min(100, jobMatch));
  experienceRelevance = Math.max(0, Math.min(100, experienceRelevance));

  if (atsExplanations.length === 0) atsExplanations.push('Contact info is parseable and standard structure is maintained.');
  if (structureExplanations.length === 0) structureExplanations.push('All core sections present and well-structured.');

  let overallScore = 0;
  if (hasJd) {
    overallScore = Math.round(
      atsCompatibility * 0.20 +
      jobMatch! * 0.35 +
      experienceRelevance * 0.20 +
      structureScore * 0.10 +
      contentQuality * 0.15
    );
  } else {
    overallScore = Math.round(
      atsCompatibility * 0.40 +
      structureScore * 0.30 +
      contentQuality * 0.30
    );
  }

  let overallStatus = 'Incomplete';
  if (overallScore >= 85) overallStatus = 'Strong Match';
  else if (overallScore >= 70) overallStatus = 'Good Match';
  else if (overallScore >= 50) overallStatus = 'Needs Improvement';
  else overallStatus = 'Weak Match';

  return {
    overallScore,
    overallStatus,
    hasJd,
    atsCompatibility: { score: atsCompatibility, label: 'ATS Compatibility', explanation: atsExplanations.join(' ') },
    jobMatch: { score: jobMatch, label: 'Job Match', explanation: jobMatchExplanations.join(' ') },
    experienceRelevance: { score: experienceRelevance, label: 'Exp. Relevance', explanation: expRelExplanations.join(' ') },
    structureScore: { score: structureScore, label: 'Structure', explanation: structureExplanations.join(' ') },
    contentQuality: { score: contentQuality, label: 'Content Quality', explanation: `Metrics found in ${metricBullets}/${totalBullets} bullets. ${weakBullets > 0 ? `Detected ${weakBullets} weak bullets.` : 'Strong action verbs detected.'}` },
    keywordAnalysis,
    recommendations
  };
}
