import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { ErrorMessage } from "formik";
import SVG from "@/CommonComponent/SVG";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";

interface UploadImageProps {
  setFieldValue: (field: string, value: unknown) => void;
  oldImages?: string[];
}

const UploadImage = ({ setFieldValue, oldImages = [] }: UploadImageProps) => {
  const [files, setFiles] = useState<ExtFile[]>([]);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);

    const validFiles = incomingFiles
      .filter((file) => file.valid)
      .map((file) => file.file);

    setFieldValue("images", validFiles);
  };

  const removeFile = (id: string | number | undefined) => {
    const updatedFiles = files.filter((file: ExtFile) => file.id !== id);
    setFiles(updatedFiles);

    const validFiles = updatedFiles
      .filter((file) => file.valid)
      .map((file) => file.file);

    setFieldValue("images", validFiles);
  };

  useEffect(() => {
    setFiles([]);
    const fetchImages = async () => {
      if (oldImages && Array.isArray(oldImages)) {
        const updatedFiles = await Promise.all(
          oldImages.map(async (imageUrl) => {
            try {
              const file = await convertUrlToFile(
                `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`,
                getFileNameFromUrl(
                  `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`
                )
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

        setFiles(updatedFiles.filter((file) => file !== null) as ExtFile[]);
      }
    };

    fetchImages();
  }, [oldImages]);

  return (
    <div className="sidebar-body">
      <div className="product-upload">
        <p>
          Project Image<span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => updateFiles(files)}
          value={files}
          maxFiles={4}
          header={false}
          footer={false}
          minHeight="80px"
          name="images"
        >
          {files.map((file: ExtFile) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={() => removeFile(file.id)}
              info={true}
              preview
            />
          ))}
          {files.length === 0 && (
            <div className="dz-message needsclick">
              <SVG iconId="file-upload" />
              <h5>
                Drag your image here, or
                <a className="txt-primary" href="#">
                  browse
                </a>
              </h5>
              <span className="note needsclick">SVG, PNG, JPG or GIF</span>
            </div>
          )}
        </Dropzone>
        <ErrorMessage name="images" component="span" className="text-danger" />
      </div>
    </div>
  );
};

export default UploadImage;
