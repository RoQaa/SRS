export const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};
