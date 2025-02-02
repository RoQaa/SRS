import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import { CardBody, Spinner } from "reactstrap";
import { DescriptionSection } from "./DescriptionSection";
import { LinkAndPublishedSection } from "./LinkAndPublishedSection";
import { fetchValueById, updateValue } from "@/Redux/Reducers/ValuesSlice";
import { useLocale } from "next-intl";

const EditValuesForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { selectedValue, isLoading } = useAppSelector((state) => state.values);

  useEffect(() => {
    if (id) {
      dispatch(fetchValueById(id));
    }
  }, [id, dispatch]);

  const initialFormValues = {
    title: selectedValue?.title || "",
    title_ar: selectedValue?.title_ar || "",
    description: selectedValue?.description || "",
    description_ar: selectedValue?.description_ar || "",
    link: selectedValue?.link || "",
    main: selectedValue?.images?.main || "",
    rotate: selectedValue?.images?.rotate || "",
    published: selectedValue?.published || false,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (
        key !== "main" &&
        key !== "rotate" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(key, String(values[key]));
      }
    });

    if (values.main) {
      formData.append("main", values.main);
    }
    if (values.rotate) {
      formData.append("rotate", values.rotate);
    }

    try {
      await dispatch(updateValue({ updatedValue: formData, id: id })).unwrap();
      toast.success("Value Updated successfully!");
      router.push(`/${locale}/dashboard/edit-home/values/`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Error Updating Value.");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <Spinner color="primary" />
        </CardBody>
      ) : (
        <Formik
          initialValues={initialFormValues}
          validationSchema={EditValueValidation}
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
              <ButtonSection id={id} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditValuesForm;

export const EditValueValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic Description is required"),
  link: Yup.string().url().required("Button Link is required"),
  published: Yup.boolean().required("Published status is required"),
});
