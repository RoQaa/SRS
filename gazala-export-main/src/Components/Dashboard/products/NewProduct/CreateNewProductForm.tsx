import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleSection } from "./TitleSection";
import { CategoryAndPublishedSection } from "./CategoryAndPublishedSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch } from "@/Redux/Hooks";
import { IProduct } from "@/interfaces/Products.interface";
import { createProduct } from "@/Redux/Reducers/ProductsSlice";
import { useLocale } from "next-intl";

type IProductForm = Omit<IProduct, "slug" | "slug_ar" | "_id">;

const CreateNewProductForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale()

  const initialFormValues: IProductForm = {
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    parentProductId: null,
    thumbnail: "",
    images: [],
    published: false,
  };

  const handleSubmit = async (values: IProductForm) => {
    const formData = new FormData();

    const completeValues: Partial<IProduct> = {
      ...values,
    };

    // Append text fields to FormData
    Object.keys(completeValues).forEach((key) => {
      const typedKey = key as keyof IProduct;
      if (
        typedKey !== "thumbnail" &&
        typedKey !== "images" &&
        completeValues[typedKey] !== undefined &&
        completeValues[typedKey] !== null
      ) {
        formData.append(typedKey, String(completeValues[typedKey]));
      }
    });

    // Append images to FormData
    if (Array.isArray(completeValues.images)) {
      completeValues.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append thumbnail as a file object
    if (completeValues.thumbnail) {
      formData.append("thumbnail", completeValues.thumbnail);
    }

    try {
      await dispatch(createProduct(formData)).unwrap();
      toast.success("Product Created successfully!");
      router.push(`/${locale}/dashboard/products/`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error?.message || "Error Creating Product.");
        console.error("Error Creating Product:", error);
    }
  };

  return (
    <Formik<IProductForm>
      initialValues={initialFormValues}
      validationSchema={NewProductValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <TitleSection lang="en" />
          <DescriptionSection lang="en" />
          <CategoryAndPublishedSection />
          <UploadImage setFieldValue={setFieldValue} />
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

export default CreateNewProductForm;

export const NewProductValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  name_ar: Yup.string().required("Arabic name is required"),
  description: Yup.string().required("Description is required"),
  description_ar: Yup.string().required("Arabic description is required"),
  parentProductId: Yup.string().nullable().optional(),
  published: Yup.boolean().required("Published status is required"),
});
