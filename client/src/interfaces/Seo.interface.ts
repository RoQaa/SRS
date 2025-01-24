export interface ISeo {
  page: string;
  title_en: string;
  title_ar: string;
  meta_description_en?: string;
  meta_description_ar?: string;
  keywords_en?: string[];
  keywords_ar?: string[];
  og_title_en?: string;
  og_title_ar?: string;
  og_description_en?: string;
  og_description_ar?: string;
  og_image?: string;
  updatedAt?: Date;
}
