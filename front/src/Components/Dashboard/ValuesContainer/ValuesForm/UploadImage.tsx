import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { ErrorMessage } from "formik";

interface UploadImageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
  imgName: string;
}

const UploadImage = ({ setFieldValue, imgName }: UploadImageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [thumbnail, setThumbnail] = useState<ExtFile | null>(null);

  const updateThumbnail = (file: ExtFile) => {
    setThumbnail(file);

    setFieldValue(imgName, file.file);
  };


  const removeThumbnail = () => {
    setThumbnail(null);
    setFieldValue(imgName, null);
  };

  return (
    <div className="sidebar-body mt-4">
      <div className="product-upload">
        <p>
        {imgName} Image<span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => {
            if (files.length > 0) {
              updateThumbnail(files[0]);
            }
          }}
          value={thumbnail ? [thumbnail] : []}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name={imgName}
        >
          {thumbnail && (
            <FileMosaic
              key={thumbnail.id}
              {...thumbnail}
              onDelete={removeThumbnail}
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
        <ErrorMessage name={imgName} component="span" className="text-danger" />
        <br />
      </div>
    </div>
  );
};

export default UploadImage;
