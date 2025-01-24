import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { LinkAndPublishedSection } from "./LinkAndPublishedSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "@/Redux/Hooks";
import { IMainCarousel } from "@/interfaces/MainCarousel.interface";
import { addMainCarousel } from "@/Redux/Reducers/MainCarouselsSlice";

const CreateNewCarouselForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialFormValues = {
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    link: "",
    publish: true,
  };

  const handleSubmit = async (values: IMainCarousel) => {
    const formData = new FormData();

    // Append text fields to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Append Image as a file object
    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("type", "MainCarousel");
    
    try {
      await dispatch(addMainCarousel(formData)).unwrap();
      toast.success("Carousel Created successfully!");
      router.push("/dashboard/edit-home/main-carousels/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Error Creating Carousel.");
        console.error("Error Creating Carousel:", error);
      } else {
        toast.error("An unknown error occurred please try again.");
      }
    }
  };

  return (
    <Formik
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialValues={initialFormValues}
      validationSchema={NewProductValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          <DescriptionSection lang="en" />
          <LinkAndPublishedSection />
          <UploadImage setFieldValue={setFieldValue} />
          <h3 className="py-2 my-3">
            <span className="text-danger">*</span>Add Details In Arabic
          </h3>
          <TitleSection lang="ar" />
          <DescriptionSection lang="ar" />
          <ButtonSection id="" />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewCarouselForm;

export const NewProductValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic description is required"),
  link: Yup.string()
    .url("Link must be a valid URL")
    .required("Link is required"),
  publish: Yup.boolean().required("Published status is required"),
});
