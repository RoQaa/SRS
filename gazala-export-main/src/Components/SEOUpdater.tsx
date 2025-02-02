// Client-side SEO updater component
'use client';

import { useEffect } from "react";

const SEOUpdater = ({ locale, page }: { locale: string, page: string }) => {
  useEffect(() => {
    const updateSEO = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/findByPage/${page}`);
        const seoData = await res.json();
        
        if (seoData.data) {
          // Update document metadata
          document.title = locale === 'en' ? seoData.data.title_en : seoData.data.title_ar;
          
          // Update description meta tag
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute(
              'content',
              locale === 'en' 
                ? seoData.data.meta_description_en 
                : seoData.data.meta_description_ar
            );
          }

          // Update keywords meta tag
          const metaKeywords = document.querySelector('meta[name="keywords"]');
          if (metaKeywords) {
            const keywords = locale === 'en' 
              ? seoData.data.keywords_en?.join(', ') 
              : seoData.data.keywords_ar?.join(', ');
            
            metaKeywords.setAttribute('content', keywords || '');
          }

          // Update Open Graph tags
          ['og:title', 'og:description', 'og:image'].forEach(type => {
            const meta = document.querySelector(`meta[property="${type}"]`);
            if (meta) {
              const value = type === 'og:image' ? seoData.data.og_image : 
                locale === 'en' ? seoData.data[`${type.split(':')[1]}_en`] : 
                seoData.data[`${type.split(':')[1]}_ar`];
              meta.setAttribute('content', value);
            }
          });
        }
      } catch (error) {
        console.error('Error updating SEO:', error);
      }
    };

    updateSEO();
  }, [locale, page]);

  return null;
};

export default SEOUpdater;