export const fallbackLng = "en";
export const languages = ["en", "ae"];
export const defaultNS = "translation";

export function getOptions( ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
