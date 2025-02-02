import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  schema?: Record<string, unknown>;
}

export const SEOHead = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  schema,
}: SEOProps): JSX.Element => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'https://kiwitrade.com';
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={openGraph?.title || title} />
      <meta property="og:description" content={openGraph?.description || description} />
      {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
      <meta property="og:url" content={openGraph?.url || canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitter?.card || 'summary_large_image'} />
      <meta name="twitter:title" content={twitter?.title || title} />
      <meta name="twitter:description" content={twitter?.description || description} />
      {twitter?.image && <meta name="twitter:image" content={twitter.image} />}

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
