import { generateSlug } from "./generateSlug";

export const generateUniqueSlug = async (
  title: string,
  lang: "en" | "ar",
  dao: { slugExists: (slug: string, lang: "en" | "ar") => Promise<boolean> } // Expecting a DAO with a slugExists method
) => {
  // Generate slug based on the language
  const slug = generateSlug(title, lang);
  let uniqueSlug = slug;
  let count = 1;

  // Check for uniqueness in the respective language
  while (await dao.slugExists(uniqueSlug, lang)) {
    uniqueSlug = `${slug}-${count++}`;
  }

  return uniqueSlug;
};
