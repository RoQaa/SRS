import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { CategoryAndPublishedSection } from "./CategoryAndPublishedSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { IProduct } from "@/interfaces/Products.interface";
import {
  fetchProductById,
  updateProduct,
} from "@/Redux/Reducers/ProductsSlice";
import { useEffect, useState } from "react";
import { Col, Spinner } from "reactstrap";

interface EditProductFormProps {
  slug: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ slug }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { formValues, loading} = useAppSelector(
    (state) => state.products
  ) as { formValues: IProduct; loading: boolean; error: string | null };

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductById(slug));
      setIsDataLoaded(true);
    })();
  }, [dispatch, slug]);

  if (loading && !isDataLoaded) {
    return (
      <Col sm="12" className="text-center">
        <Spinner color="primary" />
        <p>Loading...</p>
      </Col>
    );
  }

  const handleSubmit = async (values: IProduct) => {
    const formData = new FormData();

    // Append text fields to FormData
    Object.keys(values).forEach((key) => {
      if (
        key !== "thumbnail" &&
        key !== "images" &&
        values[key as keyof IProduct] !== undefined &&
        values[key as keyof IProduct] !== null
      ) {
        formData.append(key, String(values[key as keyof IProduct]));
      }
    });

    // Append images to FormData
    if (Array.isArray(values.images)) {
      values.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append thumbnail as a file object
    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    }

    try {
      const resultAction = await dispatch(
        updateProduct({ formData, slug })
      ).unwrap();
      if (resultAction.status) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/products/");
      }
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error?.message || "Error updating product.");
        console.error("Error updating product:", error);
      }else {
        toast.error("Error updating product.");
      }
    }
  };

  const initialValues = formValues || {
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    parentProductId: null,
    published: false,
    thumbnail: null,
    images: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NewProductValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          <DescriptionSection lang="en" />
          <CategoryAndPublishedSection />
          <UploadImage
            setFieldValue={setFieldValue}
            oldThumbnail={
              formValues?.thumbnail?.length > 0 ? formValues?.thumbnail : ""
            }
            oldImages={formValues?.images?.length > 0 ? formValues.images : []}
          />
          <h3 className="py-2 my-3">
            <span className="text-danger">*</span>Add Details In Arabic
          </h3>
          <TitleSection lang="ar" />
          <DescriptionSection lang="ar" />
          <ButtonSection />
        </Form>
      )}
    </Formik>
  );
};

export default EditProductForm;

export const NewProductValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  name_ar: Yup.string().required("Arabic name is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic description is required"),
  parentProductId: Yup.string().nullable().optional(),
  published: Yup.boolean().required("Published status is required"),
});
