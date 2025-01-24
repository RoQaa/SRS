import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { PublishedSection } from "./PublishedSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import { CardBody, Spinner } from "reactstrap";
import {
  fetchClientCarouselById,
  selectClientsCarouselLoading,
  selectCurrentClientCarousel,
  updateClientCarousel,
} from "@/Redux/Reducers/ClientsCarouselsSlice";
import { IClientCarousel } from "@/interfaces/ClientsCarousel.interface";

const EditCarouselForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentCarousel = useAppSelector(selectCurrentClientCarousel);
  const carouselLoading = useAppSelector(selectClientsCarouselLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchClientCarouselById(id));
    }
  }, [id, dispatch]);

  const initialFormValues = {
    title: currentCarousel?.title || "",
    title_ar: currentCarousel?.title_ar || "",
    image: currentCarousel?.image || "",
    published: currentCarousel?.published || false,
  };

  const handleSubmit = async (values: IClientCarousel) => {
    const formData = new FormData();
    (Object.keys(values) as (keyof IClientCarousel)[]).forEach((key) => {
      if (
        key !== "image" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(String(key), String(values[key]));
      }
    });

    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("type", "ClientCarousel");

    try {
      await dispatch(
        updateClientCarousel({ id: id, updatedItem: formData })
      ).unwrap();
      toast.success("Carousel Updated successfully!");
      router.push("/dashboard/edit-home/clients-carousel/");
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message || "Error Updating Carousel.");
      }else {
        toast.error("Error Updating Carousel.");
      }
    }
  };

  return (
    <>
      {carouselLoading ? (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <Spinner color="primary" />
        </CardBody>
      ) : (
        <Formik
          initialValues={initialFormValues}
          validationSchema={EditMediaValidation}
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
              <ButtonSection id={id} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditCarouselForm;

export const EditMediaValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  published: Yup.boolean().required("Published status is required"),
});
