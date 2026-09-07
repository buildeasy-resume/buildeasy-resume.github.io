import { Article, ArticleSection } from './articles/types';
import { GROUP1_ARTICLES } from './articles/group1';
import { GROUP2_ARTICLES } from './articles/group2';
import { GROUP3_ARTICLES } from './articles/group3';
import { GROUP4_ARTICLES } from './articles/group4';

export type { Article, ArticleSection };

export const ARTICLES: Article[] = [
  ...GROUP1_ARTICLES,
  ...GROUP2_ARTICLES,
  ...GROUP3_ARTICLES,
  ...GROUP4_ARTICLES,
];

export const ARTICLE_CATEGORIES = [
  'All',
  'RECRUITER INSIGHTS',
  'RESUME BASICS',
  'ATS & FORMATTING',
  'WRITING & CONTENT',
  'CAREER STARTERS',
  'TEMPLATES & DESIGN',
  'STRATEGY & CHECKLISTS',
] as const;

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return ARTICLES.slice(0, limit);

  // First try to match explicit relatedSlugs
  const explicit = current.relatedSlugs
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is Article => a !== undefined);

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  // Fallback to same category articles
  const sameCategory = ARTICLES.filter(
    (a) => a.category === current.category && a.slug !== current.slug && !explicit.some((e) => e.slug === a.slug)
  );

  const combined = [...explicit, ...sameCategory];
  if (combined.length >= limit) {
    return combined.slice(0, limit);
  }

  // Fallback to remaining articles
  const remaining = ARTICLES.filter((a) => a.slug !== current.slug && !combined.some((c) => c.slug === a.slug));
  return [...combined, ...remaining].slice(0, limit);
}

export function getPrevAndNextArticles(slug: string): { prevArticle?: Article; nextArticle?: Article } {
  const index = ARTICLES.findIndex((a) => a.slug === slug);
  if (index === -1) return {};

  const prevArticle = index > 0 ? ARTICLES[index - 1] : ARTICLES[ARTICLES.length - 1];
  const nextArticle = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : ARTICLES[0];

  return { prevArticle, nextArticle };
}

export function searchArticles(query: string = '', category: string = 'All'): Article[] {
  let filtered = ARTICLES;

  if (category && category !== 'All') {
    filtered = filtered.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}
