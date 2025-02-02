import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { ErrorMessage } from "formik";
import UploadProductGallery from "./UploadProductGallery";

interface UploadImageProps {
  setFieldValue: (field: string, value: unknown) => void;
}

const UploadImage = ({ setFieldValue }: UploadImageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [thumbnail, setThumbnail] = useState<ExtFile | null>(null);

  const updateThumbnail = (file: ExtFile) => {
    setThumbnail(file); // Set thumbnail separately

    // Update Formik's thumbnail field
    setFieldValue("thumbnail", file.file);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setFieldValue("thumbnail", null); 
  };

  return (
    <div className="sidebar-body mt-4">
      <div className="product-upload">
        <p>
          Product Thumbnail<span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => {
            if (files.length > 0) {
              updateThumbnail(files[0]); // Update thumbnail with the first file selected
            }
          }}
          value={thumbnail ? [thumbnail] : []} // Show the selected thumbnail
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="thumbnail"
        >
          {thumbnail && (
            <FileMosaic
              key={thumbnail.id}
              {...thumbnail}
              onDelete={removeThumbnail} // Remove the thumbnail
              info={true}
              preview
            />
          )}
          {files.length === 0 && !thumbnail && (
            <div className="dz-message needsclick">
              <SVG iconId="file-upload" />
              <h5>
                Drag your image here, or
                <Link className="txt-primary" href={Href}>
                  &nbsp;browse
                </Link>
              </h5>
              <span className="note needsclick">SVG, PNG, JPG or GIF</span>
            </div>
          )}
        </Dropzone>
        <ErrorMessage
          name="thumbnail"
          component="span"
          className="text-danger"
        />
        <br />
        <UploadProductGallery setFieldValue={setFieldValue} />
      </div>
    </div>
  );
};

export default UploadImage;
