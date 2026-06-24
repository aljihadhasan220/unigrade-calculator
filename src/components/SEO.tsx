import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | string;
  image?: string;
  schema?: any;
  breadcrumbs?: BreadcrumbItem[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const SEO = memo(({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  image = 'https://unigrade.site/og-image.png',
  schema,
  breadcrumbs,
  publishedTime,
  modifiedTime,
  author
}: SEOProps) => {
  const siteTitle = "UniGrade – Universal Grade Calculator";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = "https://unigrade.site";
  
  // Clean canonical link
  const cleanCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : siteUrl;

  // 1. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://unigrade.site/#organization",
    "name": "UniGrade",
    "url": "https://unigrade.site",
    "logo": {
      "@type": "ImageObject",
      "url": "https://unigrade.site/logo.svg",
      "width": "512",
      "height": "512"
    },
    "sameAs": []
  };

  // 2. Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://unigrade.site/#website",
    "name": "UniGrade",
    "alternateName": "UniGrade Calculator",
    "url": "https://unigrade.site",
    "description": "Calculate GPA, CGPA, and grade percentages with UniGrade. Supporting 15+ international grading systems with precision analytics.",
    "publisher": {
      "@id": "https://unigrade.site/#organization"
    }
  };

  // Build the list of schemas to output
  const schemasToRender: any[] = [];

  // Add the base organization and website schema on the homepage
  if (cleanCanonical === siteUrl || cleanCanonical === `${siteUrl}/`) {
    schemasToRender.push(organizationSchema);
    schemasToRender.push(websiteSchema);
  }

  // 3. Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
      }))
    };
    schemasToRender.push(breadcrumbListSchema);
  }

  // 4. Custom passed schema
  if (schema) {
    if (Array.isArray(schema)) {
      schemasToRender.push(...schema);
    } else {
      schemasToRender.push(schema);
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={cleanCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="UniGrade" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteTitle} />

      {/* Article Specific Meta Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@UniGrade" />
      <meta name="twitter:creator" content="@UniGrade" />

      {/* Structured Data (JSON-LD) */}
      {schemasToRender.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
});
