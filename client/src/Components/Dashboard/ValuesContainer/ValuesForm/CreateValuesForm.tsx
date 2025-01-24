import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "@/Redux/Hooks";
import { addValue } from "@/Redux/Reducers/ValuesSlice";
import { LinkAndPublishedSection } from "./LinkAndPublishedSection";
import { DescriptionSection } from "./DescriptionSection";

const CreateValuesForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialFormValues = {
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    main: "",
    rotate: "",
    link: "",
    published: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    // Append text fields to FormData
    Object.keys(values).forEach((key) => {
      if (
        key !== "main" &&
        key !== "icon" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(key, String(values[key]));
      }
    });

    // Append Images as a file object
    if (values.main) {
      formData.append("main", values.main);
    }
    if (values.rotate) {
      formData.append("rotate", values.rotate);
    }

    try {
      await dispatch(addValue(formData)).unwrap();
      toast.success("Value Created successfully!");
      router.push("/dashboard/edit-home/values/");
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message || "Error Creating Carousel.");
        console.error("Error Creating Carousel:", error.message);
      }
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={NewValueValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue}) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          <DescriptionSection lang="en" />
          <LinkAndPublishedSection />
          <UploadImage imgName={"main"} setFieldValue={setFieldValue} />
          <UploadImage imgName={"rotate"} setFieldValue={setFieldValue} />
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

export default CreateValuesForm;

export const NewValueValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic Description is required"),
  link: Yup.string().url().required("Button Link is required"),
  published: Yup.boolean().required("Published status is required"),
});
