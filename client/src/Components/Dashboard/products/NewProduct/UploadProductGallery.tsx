import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/CommonComponent/SVG";
import { ErrorMessage } from "formik";

interface UploadProductGalleryProps {
  setFieldValue: (field: string, value: unknown) => void;
}

const UploadProductGallery = ({ setFieldValue }: UploadProductGalleryProps) => {
  const [files, setFiles] = useState<ExtFile[]>([]);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);

    const incomingFilesValid = incomingFiles
      .filter((file) => file.valid)
      .map((file) => file.file);

    // Directly set the value in Formik
    setFieldValue("images", incomingFilesValid);
  };

  const removeFile = (id: string | number | undefined) => {
    const updatedFiles = files.filter((x: ExtFile) => x.id !== id);
    setFiles(updatedFiles);

    const remainingFiles = updatedFiles.map((file) => file.file);
    setFieldValue("images", remainingFiles);
  };

  return (
    <div className="product-upload mt-2">
      <p>
        Product Gallery<span className="txt-danger"> *</span>
      </p>
      <Dropzone
        onChange={(files) => updateFiles(files)}
        value={files}
        maxFiles={5}
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
