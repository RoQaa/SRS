export const setImageToUpload = async (file: {
  url: string;
  originFileObj?: Blob;
}): Promise<Blob> => {
  try {
    const response = await fetch(file.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file from the URL: ${file.url}`);
    }
    const actualFile = await response.blob();
    file.originFileObj = actualFile;
    return actualFile;
  } catch (error) {
    throw new Error(
      `Error while setting the image to upload: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
