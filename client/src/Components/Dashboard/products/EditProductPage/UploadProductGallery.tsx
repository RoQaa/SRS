import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/CommonComponent/SVG";
import { ErrorMessage } from "formik";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";

interface UploadProductGalleryProps {
  setFieldValue: (field: string, value: unknown) => void;
  oldImages: string[];
}

const UploadProductGallery = ({
  setFieldValue,
  oldImages,
}: UploadProductGalleryProps) => {
  const [files, setFiles] = useState<ExtFile[]>([]);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);

    // Filter valid files and map them to file objects
    const incomingFilesValid = incomingFiles
      .filter((file) => file.valid) 
      .map((file) => file.file); 

    // Directly set the value in Formik
    setFieldValue("images", incomingFilesValid); 
  };

  const removeFile = (id: string | number | undefined) => {
    // Filter out the deleted file from the state
    const updatedFiles = files.filter((x: ExtFile) => x.id !== id);
    setFiles(updatedFiles);

    const validFiles = updatedFiles
      .filter((file) => file.valid)
      .map((file) => file.file);
    setFieldValue("images", validFiles);
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (oldImages && Array.isArray(oldImages)) {
        const updatedFiles = await Promise.all(
          oldImages.map(async (imageUrl) => {
            try {
              const file = await convertUrlToFile(
                `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`,
                getFileNameFromUrl(`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`)
              );
              return {
                id: file.name,
                name: file.name,
                size: file.size,
                type: file.type,
                valid: true,
                file: file,
                preview: true,
              };
            } catch (error) {
              console.error("Failed to convert image URL to file:", error);
              return null;
            }
          })
        );

        // Filter out any null results
        setFiles(updatedFiles.filter((file) => file !== null) as ExtFile[]);
      }
    };

    fetchImages();
  }, [oldImages]); // Add dependency on images array

  return (
    <div className="product-upload mt-2">
      <p>
        Product Gallery<span className="txt-danger"> *</span>
      </p>
      <Dropzone
        onChange={(files) => updateFiles(files)}
        value={files} // Display selected files
        maxFiles={5} // Limit to 5 files
        header={false} // Disable header
        footer={false} // Disable footer
        minHeight="80px"
        name="images" // Ensure the field name is "images"
      >
        {files.map((file: ExtFile) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={() => removeFile(file.id)} // Handle file removal
            info={true}
            preview
          />
        ))}
        {files.length === 0 && (
          <div className="dz-message needsclick">
            <SVG iconId="file-upload1" />
            <h5>Drag Images here</h5>
            <span className="note needsclick">Add Product Gallery Images</span>
          </div>
        )}
      </Dropzone>
      <ErrorMessage name="images" component="span" className="text-danger" />
    </div>
  );
};

export default UploadProductGallery;
