import slugify from "slugify";

export const generateSlug = (title: string, lang: 'en' | 'ar') => {
  const options = {
    lower: true,
    strict: true,
    locale: lang,
  };
  
  return slugify(title, options);
};
