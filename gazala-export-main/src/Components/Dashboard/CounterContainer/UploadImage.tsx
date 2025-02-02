/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";
import { Href } from "@/Constant";
import { ErrorMessage } from "formik";
import { convertUrlToFile } from "@/utils/convertUrlToFile";
import { getFileNameFromUrl } from "@/utils/getFileNameFromUrl";
import { toast } from "react-toastify";

interface UploadImageProps {
  setFieldValue: (field: string, value: unknown) => void;
  oldThumbnail: string;
}

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxFileSize = 5 * 1024 * 1024; // 5 MB

const UploadImage = ({
  setFieldValue,
  oldThumbnail,
}: UploadImageProps) => {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [thumbnail, setThumbnail] = useState<ExtFile | null>(null);

  const validateFile = (file: ExtFile): boolean => {
    if (file.file) {
      if (!allowedFileTypes.includes(file.file.type)) {
        toast.error(
          "Invalid file type. Allowed types are PNG, JPEG, GIF, and WebP."
        );
        return false;
      }
      if (file.file.size > maxFileSize) {
        toast.error("File size exceeds 2 MB limit.");
        return false;
      }
    }
    return true;
  };



  const updateThumbnail = (file: ExtFile) => {
    if (file.file instanceof File) {
      setThumbnail(file);
      setFieldValue("image", file.file);
    } else {
      console.error("Invalid file provided for Image.");
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setFieldValue("image", null);
  };

  useEffect(() => {
    const loadThumbnail = async () => {
      if (oldThumbnail) {
        try {
          const fileName = getFileNameFromUrl(oldThumbnail);
          const file = await convertUrlToFile(oldThumbnail, fileName);

          if (file instanceof File) {
            const thumbnailFile = {
              id: file.name,
              file: file,
              name: file.name,
              size: file.size,
              type: file.type,
              preview: true,
            };

            setThumbnail(thumbnailFile);
          } else {
            console.error("Image is not a valid file.");
          }
        } catch (error) {
          console.error("Failed to load Image:", error);
        }
      }
    };

    loadThumbnail();
  }, [oldThumbnail]);


  return (
    <div className="sidebar-body mt-4">
      <div className="product-upload">
        <p>
          Counter Image<span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => {
            const validFiles = files.filter(validateFile);
            if (validFiles.length > 0) {
              updateThumbnail(validFiles[0]);
            }
          }
        }
          value={thumbnail ? [thumbnail] : []} // Show the selected thumbnail
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="image"
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
          name="image"
          component="span"
          className="text-danger"
        />
        <br />
      </div>
    </div>
  );
};

export default UploadImage;
