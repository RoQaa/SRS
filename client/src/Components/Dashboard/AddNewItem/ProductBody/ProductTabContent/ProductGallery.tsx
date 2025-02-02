import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { setFormValue } from "@/Redux/Reducers/AddNewsSlice";
import SVG from "@/CommonComponent/SVG";
import { useAppDispatch } from "@/Redux/Hooks";

const ProductGallery = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    const incomingFilesValid = incomingFiles
      .filter((file) => file.valid)
      .map((file) => file.file);
    dispatch(setFormValue({ name: "images", value: incomingFilesValid }));
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

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
            <span className="note needsclick">Add News Gallery Images</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProductGallery;
