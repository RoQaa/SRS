"use client";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
// import { PublishedSection } from "./PublishedSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "@/Redux/Hooks";
import { addMediaItem } from "@/Redux/Reducers/MediaSlice";
import { IMedia } from "@/interfaces/Media.interface";
import { LinkSection } from "./LinkSection";

const CreateNewImageForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialFormValues = {
    title: "",
    title_ar: "",
    type: type === "Image" ? "Image" : "Video",
    thumbnail: "",
    fullImage: "",
    video: "",
    published: true,
  };

  const handleSubmit = async (values: IMedia) => {
    const formData = new FormData();

    // Append text fields to FormData
    (Object.keys(values) as (keyof IMedia)[]).forEach((key) => {
      if (
        key !== "thumbnail" &&
        key !== "fullImage" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(key, String(values[key]));
      }
    });

    // Append Image as a file object
    if (type === "Image") {
      if (values.thumbnail) {
        formData.append("thumbnail", values.thumbnail);
      }
      if (values.fullImage) {
        formData.append("fullImage", values.fullImage);
      }
      formData.delete("video");
    } else {
      if (values.video) {
        // formData.append("video", values.video);
        formData.delete("thumbnail");
        formData.delete("fullImage");
      }
    }
    
    try {
      await dispatch(addMediaItem(formData)).unwrap();
      toast.success("Media Created successfully!");
      if (type === "Image") {
        router.push("/dashboard/media/images");
      } else {
        router.push("/dashboard/media/videos");
      }
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message || "Error Creating Media.");
        console.error("Error Creating Media:", error.message);
      } else {
        toast.error("Error Creating Media.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialFormValues as IMedia}
      validationSchema={
        type === "Image" ? NewMediaValidation : NewMediaValidationWithVideo
      }
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          {/* <PublishedSection /> */}
          {type === "Image" ? (
            <>
              <UploadImage
                oldImage={""}
                imgName="thumbnail"
                label="Thumbnail Image"
                setFieldValue={setFieldValue}
              />
              <UploadImage
                oldImage={""}
                imgName="fullImage"
                label="Full Image"
                setFieldValue={setFieldValue}
              />
            </>
          ) : (
            <LinkSection />
          )}
          <h3 className="py-2 my-3">
            <span className="text-danger">*</span>Add Details In Arabic
          </h3>
          <TitleSection lang="ar" />
          <ButtonSection id="" type={type} />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewImageForm;

export const NewMediaValidation = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .matches(
      /^[A-Za-z0-9\s.,:;!?'"()\[\]{}\-…&]+$/u,
      "English Title contains invalid characters"
    ),
  title_ar: Yup.string()
    .required("Arabic Title is required")
    .matches(
      /^[\u0600-\u06FF0-9\s.,،؛:؟!"'()\[\]{}\-…&]+$/u,
      "Arabic Title contains invalid characters"
    ),
  published: Yup.boolean().required("Published status is required"),
});

export const NewMediaValidationWithVideo = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .matches(
      /^[A-Za-z0-9\s.,:;!?'"()\[\]{}\-…&]+$/u,
      "English Title contains invalid characters"
    ),
  title_ar: Yup.string()
    .required("Arabic Title is required")
    .matches(
      /^[\u0600-\u06FF0-9\s.,،؛:؟!"'()\[\]{}\-…&]+$/u,
      "Arabic Title contains invalid characters"
    ),
  video: Yup.string().url().required("Video Link is required"),
  published: Yup.boolean().required("Published status is required"),
});
