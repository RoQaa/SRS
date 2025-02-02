export const convertUrlToFile = async (
  url: unknown,
  fileName: string
): Promise<File> => {
  if (url instanceof File) {
    return url; // Directly return the File if it's already in the correct format
  }
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided: " + url);
  }

  // Proceed only if the URL is valid and the file can be fetched
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Log a message but proceed gracefully
      if (response.status === 404) {
        console.warn(`File not found at URL: ${url}`);
        return new File([], fileName); // Or handle with a default file if necessary
      }
      throw new Error(`Failed to fetch image from URL: ${url}`);
    }

    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return new File([], fileName); // Return a fallback file or handle differently
  }
};
