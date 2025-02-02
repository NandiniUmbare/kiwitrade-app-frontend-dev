import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';

export const HomePage = (): JSX.Element => {
  const { t } = useTranslation();

  const seoData = {
    title: t('home.seo.title', 'KiwiTrade - Modern Trading Platform'),
    description: t('home.seo.description', 'Trade with confidence using KiwiTrade'),
    canonical: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'KiwiTrade Home',
      description: 'Modern trading platform for serious traders',
    },
  };

  return (
    <>
      <SEOHead {...seoData} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{t('home.title', 'Welcome to KiwiTrade')}</h1>
        <p className="text-lg text-gray-600">
          {t('home.description', 'Start trading with our advanced platform')}
        </p>
      </main>
    </>
  );
};
