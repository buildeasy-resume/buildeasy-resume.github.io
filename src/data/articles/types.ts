export interface ArticleSection {
  h2?: string;
  h3?: string;
  text?: string;
  paragraphs?: string[];
  listItems?: string[];
  orderedListItems?: string[];
  exampleBox?: {
    title: string;
    before?: string;
    after?: string;
    items?: string[];
  };
  callout?: {
    title: string;
    text: string;
    type?: 'tip' | 'warning' | 'info';
  };
  internalLink?: {
    text: string;
    url: string;
    anchorText: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  metaTitle: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[];
  tags: string[];
  relatedSlugs: string[];
  sections: ArticleSection[];
  headerPattern?: 'minimal' | 'modern' | 'corporate' | 'creative' | 'technical';
}
