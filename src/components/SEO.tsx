import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  schema?: any;
}

export const SEO = memo(({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  schema 
}: SEOProps) => {
  const siteTitle = "UniGrade – Universal Grade Calculator";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = "https://unigrade.site";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
});
