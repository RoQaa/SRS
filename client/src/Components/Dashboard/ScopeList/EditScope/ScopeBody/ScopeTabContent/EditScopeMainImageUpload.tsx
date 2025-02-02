import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/EditScopeSlice"; // Updated Redux slice
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";

const EditScopeImageUpload = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.editScope); // Use EditScopeSlice for scope editing

  const updateFiles = (incomingFiles: ExtFile[]) => {
    if (incomingFiles.length > 0) {
      setFiles(incomingFiles);
      const validFiles = incomingFiles.filter((file) => file.valid === true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setFormValue({ name: "mainImg", value: validFiles[0]?.file })); // Update main image
    }
  };

  const removeFile = (id: string | number | undefined) => {
    if (files.length > 0) {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
      dispatch(setFormValue({ name: "mainImg", value: "" })); // Clear image when removed
    }
  };

  useEffect(() => {
    const fetchMainImg = async () => {
      if (
        formValue?.mainImg &&
        !Array.isArray(formValue.mainImg) &&
        typeof formValue.mainImg === "string"
      ) {
        try {
          const file = await convertUrlToFile(
            `${process.env.NEXT_PUBLIC_API_URL}/${formValue.mainImg}`,
            getFileNameFromUrl(
              `${process.env.NEXT_PUBLIC_API_URL}/${formValue.mainImg}`
            )
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
          console.error("Failed to convert main image URL to file:", error);
        }
      }
    };

    fetchMainImg();
  }, [formValue?.mainImg]);

  return (
    <div className="sidebar-body">
      <div className="product-upload">
        <p>
          Scope Main Image<span className="txt-danger"> *</span>{" "}
        </p>
        <Dropzone
          onChange={(files) => updateFiles(files)}
          value={files}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="mainImg"
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
                Drag your main image here, or
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
  );
};

export default EditScopeImageUpload;
