export const getFileNameFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url); // Attempt to create a URL object
    return parsedUrl.pathname.split("/").pop() || "default_filename.png"; // Extract the file name
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Invalid URL provided:", url); // Log an error for debugging
    return "default_filename.png"; // Return a default file name if the URL is invalid
  }
};
