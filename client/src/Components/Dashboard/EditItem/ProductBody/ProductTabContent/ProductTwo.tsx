import ProductGallery from "./ProductGallery";
import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";

const ProductTwo = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.editNews);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [convertItem, setConvertItem] = useState(false);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
    const validFiles = incomingFiles.filter((file) => file.valid === true);
    dispatch(setFormValue({ name: "thumbnail", value: validFiles[0].file }));
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  useEffect(() => {
    setConvertItem(true);
    const fetchThumbnail = async () => {
      if (formValue.thumbnail && !Array.isArray(formValue.thumbnail)) {
        try {
          const file = await convertUrlToFile(
            process.env.NEXT_PUBLIC_API_URL + "/" + formValue.thumbnail,
            getFileNameFromUrl(process.env.NEXT_PUBLIC_API_URL + "/" + formValue.thumbnail)
          );

          const UpdatedOldFiles = {
            id: file.name,
            name: file.name,
            size: file.size,
            type: file.type,
            valid: true,
            file:file,
            preview: true,
          };
          setFiles([UpdatedOldFiles]); // Set the file to the state
        } catch (error) {
          console.error("Failed to convert thumbnail URL to file:", error);
        }
      }
    };

    fetchThumbnail();
  }, []);

  return (
    <div className="sidebar-body">
      <div className="product-upload">
        <p>
          News Thumbnail<span className="txt-danger"> *</span>{" "}
        </p>
        <Dropzone
          onChange={(files) => updateFiles(files)}
          value={files}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="thumbnail"
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
                Drag your Thumbnail here, or
                <Link className="txt-primary" href={Href}>
                  &nbsp;browser
                </Link>
              </h5>
              <span className="note needsclick">SVG,PNG,JPG or GIF</span>
            </div>
          )}
        </Dropzone>
      </div>
      <ProductGallery />
    </div>
  );
};

export default ProductTwo;
