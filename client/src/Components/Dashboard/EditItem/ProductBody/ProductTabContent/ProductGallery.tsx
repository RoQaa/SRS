import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";
import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";

const ProductGallery = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.editNews);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    const incomingFilesValid = incomingFiles
      .filter((file) => file.valid)
      .map((file) => file.file);
    dispatch(setFormValue({ name: "images", value: incomingFilesValid }));
  };

  const removeFile = (id: string | number | undefined) => {
    const updatedFiles = files.filter((x: ExtFile) => x.id !== id);
    setFiles(updatedFiles);

    // Update the Redux store with the new list of valid files
    const validFiles = updatedFiles
      .filter((file) => file.valid)
      .map((file) => file.file);
    dispatch(setFormValue({ name: "images", value: validFiles }));
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (formValue.images && Array.isArray(formValue.images)) {
        const updatedFiles = await Promise.all(
          formValue.images.map(async (imageUrl: string) => {
            try {
              const file = await convertUrlToFile(
                process.env.NEXT_PUBLIC_API_URL + "/" + imageUrl,
                getFileNameFromUrl(process.env.NEXT_PUBLIC_API_URL + "/" + imageUrl)
              );
              return {
                id: file.name,
                name: file.name,
                size: file.size,
                type: file.type,
                valid: true,
                preview: true,
                file: file,
              };
            } catch (error) {
              console.error("Failed to convert image URL to file:", error);
              return null; // or handle accordingly
            }
          })
        );

        // Filter out any null results
        setFiles(updatedFiles.filter((file) => file !== null) as ExtFile[]);
      }
    };

    fetchImages();
  }, []); // Add dependency on images array

  return (
    <div className="product-upload">
      <p>
        News Gallery<span className="txt-danger"> *</span>
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
            onDelete={removeFile}
            info={true}
            preview
          />
        ))}
        {files.length === 0 && (
          <div className="dz-message needsclick">
            <SVG iconId="file-upload1" />
            <h5>Drag Images here</h5>
            <span className="note needsclick">Update News Gallery Images</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProductGallery;
