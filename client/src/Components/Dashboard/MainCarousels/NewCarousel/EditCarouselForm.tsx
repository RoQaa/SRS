import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { LinkAndPublishedSection } from "./LinkAndPublishedSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { IMainCarousel } from "@/interfaces/MainCarousel.interface";
import {
  fetchMainCarouselById,
  selectCarouselLoading,
  selectCurrentCarousel,
  updateMainCarousel,
} from "@/Redux/Reducers/MainCarouselsSlice";
import { useEffect } from "react";
import { CardBody, Spinner } from "reactstrap";
import { useLocale } from "next-intl";

const EditCarouselForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentCarousel = useAppSelector(selectCurrentCarousel);
  const carouselLoading = useAppSelector(selectCarouselLoading);
  const locale = useLocale();

  useEffect(() => {
    if (id) {
      dispatch(fetchMainCarouselById(id));
    }
  }, [id, dispatch]);

  const initialFormValues = {
    title: currentCarousel?.title || "",
    title_ar: currentCarousel?.title_ar || "",
    description: currentCarousel?.description || "",
    description_ar: currentCarousel?.description_ar || "",
    link: currentCarousel?.link || "",
    image: currentCarousel?.image || "",
    publish: currentCarousel?.publish || false,
  };
  
  const handleSubmit = async (values: IMainCarousel) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("type", "MainCarousel");
    

    try {
      const res = await dispatch(
        updateMainCarousel({ id: id, updatedItem: formData })
      ).unwrap();

      if (res.status) {
        toast.success("Carousel Updated successfully!");
        router.push(`/${locale}/dashboard/edit-home/main-carousels/`);
      } else {
        toast.error(res.message || "Error Updating Carousel.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Error Updating Carousel.");
      } else {
        toast.error("An unknown error occurred please try again.");
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          initialValues={initialFormValues}
          validationSchema={EditCarouselFormValidation}
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
              <ButtonSection id={id} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditCarouselForm;

export const EditCarouselFormValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Arabic Title is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic description is required"),
  link: Yup.string()
    .url("Link must be a valid URL")
    .required("Link is required"),
  publish: Yup.boolean().required("Published status is required"),
});
