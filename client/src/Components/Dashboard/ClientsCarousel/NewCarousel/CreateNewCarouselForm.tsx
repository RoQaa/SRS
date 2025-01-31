import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { PublishedSection } from "./PublishedSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "@/Redux/Hooks";
import { addClientCarousel } from "@/Redux/Reducers/ClientsCarouselsSlice";
import { IClientCarousel } from "@/interfaces/ClientsCarousel.interface";
import { useLocale } from "next-intl";

const CreateNewCarouselForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const initialFormValues = {
    title: "",
    title_ar: "",
    image: "",
    published: false,
  };

  const handleSubmit = async (values: IClientCarousel) => {
    const formData = new FormData();

    // Append text fields to FormData
    (Object.keys(values) as (keyof IClientCarousel)[]).forEach((key) => {
      if (
        key !== "image" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(String(key), String(values[key]));
      }
    });

    // Append Image as a file object
    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("type", "ClientCarousel");

    try {
      await dispatch(addClientCarousel(formData)).unwrap();
      toast.success("Carousel Created successfully!");
      router.push(`/${locale}/dashboard/edit-home/clients-carousel/`);
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message || "Error Creating Carousel.");
      } else {
        toast.error("Error Creating Carousel.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={NewMediaValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          <PublishedSection />
          <UploadImage setFieldValue={setFieldValue} />
          <h3 className="py-2 my-3">
            <span className="text-danger">*</span>Add Details In Arabic
          </h3>
          <TitleSection lang="ar" />
          <ButtonSection id="" />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewCarouselForm;

export const NewMediaValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  published: Yup.boolean().required("Published status is required"),
});
