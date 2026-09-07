import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string | string[];
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://buildeasy-resume.github.io/apple-touch-icon.png',
  keywords,
  noindex = false,
  breadcrumbs,
  structuredData,
}: SEOProps) {
  const fullCanonicalUrl = canonicalUrl
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `https://buildeasy-resume.github.io${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
    : undefined;

  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  // Generate breadcrumb structured data if breadcrumbs provided
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `https://buildeasy-resume.github.io${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`,
    })),
  } : null;

  const schemasToRender = [];
  if (breadcrumbSchema) {
    schemasToRender.push(breadcrumbSchema);
  }
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemasToRender.push(...structuredData);
    } else {
      schemasToRender.push(structuredData);
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      {keywordsString && <meta name="keywords" content={keywordsString} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data */}
      {schemasToRender.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
