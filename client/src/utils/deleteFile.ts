import { promises as fs } from "fs";
import path from "path";
// import path from "path"; // Use `path` to resolve the file system path

async function deleteFile(filePath: string): Promise<void> {
  try {
    // Remove the URL prefix if present, and make sure we're working with the file system path
    const filePathWithoutUrl = filePath.replace(/^https?:\/\/localhost:3000\//, "");

    // Resolve to the absolute file path
    const absolutePath = path.join(process.cwd(), `public/${filePathWithoutUrl}`);

    // Log the resolved path for debugging
    console.log('Resolved file path:', absolutePath);

    // Check if the file exists
    const fileExists = await fs
      .access(absolutePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      await fs.rm(absolutePath);
      console.log(`File deleted: ${absolutePath}`);
    } else {
      console.warn(`File not found (already deleted or moved): ${absolutePath}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
    throw new Error("File deletion failed.");
  }
}

export default deleteFile;
