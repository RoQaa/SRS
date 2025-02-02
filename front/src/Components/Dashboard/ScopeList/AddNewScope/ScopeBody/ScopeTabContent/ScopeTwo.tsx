import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddScopeSlice";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import ScopeMainImageUpload from "./ScopeMainImageUpload";

const ScopeIconUpload = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();

  // Handle file changes and dispatch iconImg
  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);

    const validFiles = incomingFiles.filter((file) => file.valid === true);
    if (validFiles.length > 0) {
      dispatch(setFormValue({ name: "iconImg", value: validFiles[0].file }));
    } else {
      dispatch(setFormValue({ name: "iconImg", value: "" }));
    }
  };

  // Remove specific file by ID
  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <>
      <div className="sidebar-body mt-3">
        <div className="scope-icon-upload mb-3">
          <p>
            Icon Image<span className="txt-danger"> *</span>
          </p>
          <Dropzone
            onChange={(files) => updateFiles(files)}
            value={files}
            maxFiles={1}
            header={false}
            footer={false}
            minHeight="80px"
            name="iconImg"
          >
            {files.map((file: ExtFile) => (
              <FileMosaic
                key={file.id}
                {...file}
                onDelete={removeFile}
                info={true}
              />
            ))}
            {files.length === 0 && (
              <div className="dz-message needsclick">
                <SVG iconId="file-upload" />
                <h5>
                  Drag your icon here, or
                  <Link className="txt-primary" href={Href}>
                    &nbsp;browse
                  </Link>
                </h5>
                <span className="note needsclick">SVG, PNG, JPG, or GIF</span>
              </div>
            )}
          </Dropzone>
        </div>
        <ScopeMainImageUpload />
      </div>
    </>
  );
};

export default ScopeIconUpload;
