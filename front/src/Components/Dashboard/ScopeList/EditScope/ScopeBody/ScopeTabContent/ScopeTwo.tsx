import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/EditScopeSlice";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";
import ScopeMainImageUpload from "./EditScopeMainImageUpload";

const EditScopeIconImageUpload = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.editScope);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    if (incomingFiles.length > 0) {
      setFiles(incomingFiles);
      const validFiles = incomingFiles.filter((file) => file.valid === true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setFormValue({ name: "iconImg", value: validFiles[0].file }));
    }
  };

  const removeFile = (id: string | number | undefined) => {
    if (files.length > 0) {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
      dispatch(setFormValue({ name: "iconImg", value: "" }));
    }
  };

  useEffect(() => {
    const fetchIconImg = async () => {
      if (formValue?.iconImg && typeof formValue.iconImg === "string") {
        try {
          const file = await convertUrlToFile(
            `${process.env.NEXT_PUBLIC_API_URL}/${formValue.iconImg}`,
            getFileNameFromUrl(`${process.env.NEXT_PUBLIC_API_URL}/${formValue.iconImg}`)
          );

          const UpdatedOldFiles = {
            id: file.name,
            name: file.name,
            size: file.size,
            type: file.type,
            valid: true,
            file: file,
            preview: true,
          };
          setFiles([UpdatedOldFiles]); // Set the file to the state
        } catch (error) {
          console.error("Failed to convert icon image URL to file:", error);
        }
      }
    };

    fetchIconImg();
  }, [formValue?.iconImg]); 

  return (
    <>
      <div className="sidebar-body mb-4">
        <div className="icon-image-upload">
          <p>
            Scope Icon Image<span className="txt-danger"> *</span>
          </p>
          <Dropzone
            onChange={(files) => updateFiles(files)}
            value={files}
            maxFiles={1}
            header={false}
            footer={false}
            minHeight="80px"
            name="iconImg" // Changed to iconImg for scope
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
                <SVG iconId="file-upload" />
                <h5>
                  Drag your icon image here, or
                  <Link className="txt-primary" href={Href}>
                    &nbsp;browse
                  </Link>
                </h5>
                <span className="note needsclick">SVG,PNG,JPG or GIF</span>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <ScopeMainImageUpload />
    </>
  );
};

export default EditScopeIconImageUpload;

