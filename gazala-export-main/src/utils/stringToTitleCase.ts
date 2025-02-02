// Function to convert string to title case
export const stringToTitleCase = (str: string) => {
  if (typeof str !== "string" || !str) {
    return ""; // Return an empty string or handle this case as needed
  }

  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
