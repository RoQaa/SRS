import { Formik, Form, ErrorMessage, Field } from "formik";
import { useRouter } from "next/navigation";
import { ButtonSection } from "./ButtonSection";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import { Col, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import {
  updateSeo,
  addSeo,
  fetchSeoByPage,
  SeoData,
} from "@/Redux/Reducers/SeoSlice";
import UploadImage from "./UploadImage";

interface CreateNewProjectFormProps {
  page: string;
}

const CreateOrUpdateSeoForm: React.FC<CreateNewProjectFormProps> = ({
  page = "",
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { seoData, loading } = useAppSelector((state) => state.seo);

  useEffect(() => {
    const fetchSeo = async () => {
      await dispatch(fetchSeoByPage(page)).unwrap();
    };
    if (page) {
      fetchSeo();
    }
  }, [dispatch, page]);

  const InitialValue = page
    ? {
        page: seoData?.page,
        title_en: seoData?.title_en,
        title_ar: seoData?.title_ar,
        meta_description_en: seoData?.meta_description_en,
        meta_description_ar: seoData?.meta_description_ar,
        keywords_en: seoData?.keywords_en,
        keywords_ar: seoData?.keywords_ar,
        og_title_en: seoData?.og_title_en,
        og_title_ar: seoData?.og_title_ar,
        og_description_en: seoData?.og_description_en,
        og_description_ar: seoData?.og_description_ar,
        og_image: seoData?.og_image,
      }
    : {
        page: "",
        title_en: "",
        title_ar: "",
        meta_description_en: "",
        meta_description_ar: "",
        keywords_en: "",
        keywords_ar: "",
        og_title_en: "",
        og_title_ar: "",
        og_description_en: "",
        og_description_ar: "",
        og_image: "",
      };

  const handleSubmit = async (values: SeoData) => {
    const formData = new FormData();

    // Append text fields to FormData
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof SeoData];

      if (value !== undefined && value !== null) {
        if (key === "og_image" && value instanceof File) {
          // Handle file uploads specifically
          formData.append("og_image", value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      if (page) {
        const res = await dispatch(
          updateSeo({ formData: formData, page: page })
        ).unwrap();
        if (res.status) {
          toast.success("SEO Updated successfully!");
        }
      } else {
        const res = await dispatch(addSeo(formData)).unwrap();
        if (res.status) {
          toast.success("SEO Created successfully!");
        }
      }
      router.push(`/dashboard/seo/`);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        toast.error(error?.message || "An unknown error occurred please try again.");
    }
  };

  const validationSchema = Yup.object({
    page: Yup.string()
      .matches(
        /^[a-zA-Z0-9-_]+$/,
        "Page name can only include letters, numbers, hyphens, and underscores."
      )
      .required("Page name is required."),
    title_en: Yup.string().required("English title is required."),
    title_ar: Yup.string().required("Arabic title is required."),
    meta_description_en: Yup.string().max(
      160,
      "Meta description cannot exceed 160 characters."
    ),
    meta_description_ar: Yup.string().max(
      160,
      "Meta description cannot exceed 160 characters."
    ),
    keywords_en: Yup.string(),
    keywords_ar: Yup.string(),
    og_title_en: Yup.string(),
    og_title_ar: Yup.string(),
    og_description_en: Yup.string(),
    og_description_ar: Yup.string(),
    og_image: Yup.mixed().nullable(),
  });

  return (
    <>
      {loading ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <Formik
          initialValues={InitialValue as SeoData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label htmlFor="page">Page Name</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="page"
                      name="page"
                      placeholder="Enter page name"
                    />
                    <ErrorMessage
                      name="page"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="title_en">Title (EN)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="title_en"
                      name="title_en"
                      placeholder="Enter English title"
                    />
                    <ErrorMessage
                      name="title_en"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="title_ar">Title (AR)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="title_ar"
                      name="title_ar"
                      placeholder="Enter Arabic title"
                    />
                    <ErrorMessage
                      name="title_ar"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="meta_description_en">
                      Meta Description (EN)
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="meta_description_en"
                      name="meta_description_en"
                      placeholder="Enter English meta description"
                    />
                    <ErrorMessage
                      name="meta_description_en"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="meta_description_ar">
                      Meta Description (AR)
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="meta_description_ar"
                      name="meta_description_ar"
                      placeholder="Enter Arabic meta description"
                    />
                    <ErrorMessage
                      name="meta_description_ar"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="keywords_en">Keywords (EN)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="keywords_en"
                      name="keywords_en"
                      placeholder="Enter English keywords, comma-separated"
                    />
                    <ErrorMessage
                      name="keywords_en"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="keywords_ar">Keywords (AR)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="keywords_ar"
                      name="keywords_ar"
                      placeholder="Enter Arabic keywords, comma-separated"
                    />
                    <ErrorMessage
                      name="keywords_ar"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="og_title_en">OG Title (EN)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="og_title_en"
                      name="og_title_en"
                      placeholder="Enter OG title (EN)"
                    />
                    <ErrorMessage
                      name="og_title_en"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="og_title_ar">OG Title (AR)</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="og_title_ar"
                      name="og_title_ar"
                      placeholder="Enter OG title (AR)"
                    />
                    <ErrorMessage
                      name="og_title_ar"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="og_description_en">
                      OG Description (EN)
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="og_description_en"
                      name="og_description_en"
                      placeholder="Enter OG description (EN)"
                    />
                    <ErrorMessage
                      name="og_description_en"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="og_description_ar">
                      OG Description (AR)
                    </Label>
                    <Field
                      as={Input}
                      type="text"
                      id="og_description_ar"
                      name="og_description_ar"
                      placeholder="Enter OG description (AR)"
                    />
                    <ErrorMessage
                      name="og_description_ar"
                      component="div"
                      className="error-message text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={12}>
                  <UploadImage
                    setFieldValue={setFieldValue}
                    oldImage={(seoData?.og_image as string) || " "}
                  />
                </Col>
              </Row>

              <ButtonSection page={page} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateOrUpdateSeoForm;
