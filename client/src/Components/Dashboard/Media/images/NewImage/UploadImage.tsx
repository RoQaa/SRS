import { useState, useEffect } from "react";
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
  imgName: string;
  label: string;
  oldImage: string;
}

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxFileSize = 5 * 1024 * 1024; // 5 MB

const UploadImage = ({
  setFieldValue,
  imgName,
  label,
  oldImage,
}: UploadImageProps) => {
  const [files] = useState<ExtFile[]>([]);
  const [image, setImage] = useState<ExtFile | null>(null);
  
  // File validation
  const validateFile = (file: ExtFile): boolean => {
    if (file.file) {
      if (!allowedFileTypes.includes(file.file.type)) {
        toast.error(
          "Invalid file type. Allowed types are PNG, JPEG, GIF, and WebP."
        );
        return false;
      }
      if (file.file.size > maxFileSize) {
        toast.error("File size exceeds 5 MB limit.");
        return false;
      }
    }
    return true;
  };

  // Update image when selected from Dropzone
  const updateImage = (file: ExtFile) => {
    setImage(file);
    setFieldValue(imgName, file.file);
  };

  // Remove image handler
  const removeImage = () => {
    setImage(null);
    setFieldValue(imgName, null);
  };

  // Load existing image (if any) from URL
  useEffect(() => {
    const loadImage = async () => {
      if (oldImage.length > 0) {
        try {
          const fileName = getFileNameFromUrl(oldImage);
          const file = await convertUrlToFile(oldImage, fileName);

          if (file instanceof File) {
            const imageFile = {
              id: file.name,
              file: file,
              name: file.name,
              size: file.size,
              type: file.type,
              preview: true,
            };

            setImage(imageFile);
          } else {
            console.error("Image is not a valid file.");
          }
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      }
    };

    loadImage();
  }, [oldImage]);

  return (
    <div className="sidebar-body mt-4">
      <div className="product-upload">
        <p>
          {label} <span className="txt-danger"> *</span>
        </p>
        <Dropzone
          onChange={(files) => {
            const validFiles = files.filter(validateFile);
            if (validFiles.length > 0) {
              updateImage(validFiles[0]);
            }
          }}
          value={image ? [image] : []} // Show the selected image or loaded image
          maxFiles={1}
          header={false}
          footer={false}
          minHeight="80px"
          name={imgName}
        >
          {image && (
            <FileMosaic
              key={image.id}
              {...image}
              onDelete={removeImage} // Remove the image
              info={true}
              preview
            />
          )}
          {files.length === 0 && !image && (
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
