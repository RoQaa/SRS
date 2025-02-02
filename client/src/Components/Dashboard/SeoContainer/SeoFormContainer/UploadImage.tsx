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
  oldImage: string;
}

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxFileSize = 5 * 1024 * 1024; // 5 MB

const UploadImage = ({ setFieldValue, oldImage }: UploadImageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      setFieldValue("og_image", file.file);
    } else {
      console.error("Invalid file provided for og_image.");
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setFieldValue("og_image", null);
  };

  useEffect(() => {
    setThumbnail(null);
    setFiles([]);
    const loadThumbnail = async () => {
      if (oldImage) {
        try {
          const fileName = getFileNameFromUrl(
            `${process.env.NEXT_PUBLIC_API_URL}/${oldImage}`
          );
          const file = await convertUrlToFile(
            `${process.env.NEXT_PUBLIC_API_URL}/${oldImage}`,
            fileName
          );

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
            console.error("og_image is not a valid file.");
          }
        } catch (error) {
          console.error("Failed to load og_image:", error);
        }
      }
    };

    loadThumbnail();
  }, [oldImage]);

  return (
    <div className="sidebar-body mt-4">
      <div className="product-upload">
        <p>
          Open Graph Image<span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => {
            const validFiles = files.filter(validateFile);
            if (validFiles.length > 0) {
              updateThumbnail(validFiles[0]);
            }
          }}
          value={thumbnail ? [thumbnail] : []}
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name="og_image"
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
        <ErrorMessage
          name="og_image"
          component="span"
          className="text-danger"
        />
      </div>
    </div>
  );
};

export default UploadImage;
