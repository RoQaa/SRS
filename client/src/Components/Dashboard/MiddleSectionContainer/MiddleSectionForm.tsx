/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, FormikValues, ErrorMessage } from "formik";
import { Input, FormGroup, Label, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { ButtonSection } from "./ButtonSection";
import * as Yup from "yup";
import UploadImage from "./UploadImage";
import { useAppDispatch } from "@/Redux/Hooks";
import {
  createMiddleSection,
  updateMiddleSection,
} from "@/Redux/Reducers/MiddleSectionSlice";

export const MiddleSectionForm: React.FC<{ middleSection: any }> = ({
  middleSection,
}) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Initial values
  const initialValues = middleSection
    ? {
        titleOne: middleSection[0]?.titleOne || "",
        titleOne_ar: middleSection[0]?.titleOne_ar || "",
        titleTwo: middleSection[0]?.titleTwo || "",
        titleTwo_ar: middleSection[0]?.titleTwo_ar || "",
        backgroundImg: middleSection[0]?.backgroundImg || "",
      }
    : {
        titleOne: "",
        titleOne_ar: "",
        titleTwo: "",
        titleTwo_ar: "",
        backgroundImg: "",
      };

  // Submit handler
  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    try {
      if (middleSection.length === 0) {
        // Create MiddleSection If No Data Exist
        const res = await dispatch(createMiddleSection(formData)).unwrap();

        if (res.status) {
          toast.success("Middle Section created successfully!");
        } else {
          toast.error("Failed to create Middle Section");
        }
      } else {
        // Update Data if middleSection Exist
        await dispatch(
          updateMiddleSection({
            updatedData: formData,
            id: middleSection[0]?._id,
          })
        ).unwrap();

        toast.success("Middle Section updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating Middle Section.");
      console.error("Error updating Middle Section:", error);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MiddleSectionValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          {/* Title One */}
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="titleOne">Title One</Label>
                <Field name="titleOne">
                  {({ field }: any) => (
                    <div>
                      <Input {...field} placeholder="Enter Title One" />
                      <ErrorMessage
                        name="titleOne"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  )}
                </Field>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="titleOne_ar">Title One (Ar)</Label>
                <Field name="titleOne_ar">
                  {({ field }: any) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Enter Title One In Arabic"
                      />
                      <ErrorMessage
                        name="titleOne_ar"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  )}
                </Field>
              </FormGroup>
            </Col>
          </Row>

          {/* Title Two */}
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="titleTwo">Title Two</Label>
                <Field name="titleTwo">
                  {({ field }: any) => (
                    <div>
                      <Input {...field} placeholder="Enter Title Two" />
                      <ErrorMessage
                        name="titleTwo"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  )}
                </Field>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="titleTwo_ar">Title Two (Ar)</Label>
                <Field name="titleTwo_ar">
                  {({ field }: any) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Enter Title Two In Arabic"
                      />
                      <ErrorMessage
                        name="titleTwo_ar"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  )}
                </Field>
              </FormGroup>
            </Col>
          </Row>

          {/* Background Image */}
          <UploadImage
            setFieldValue={setFieldValue}
            oldThumbnail={
              middleSection.length > 0
                ? `${process.env.NEXT_PUBLIC_API_URL}/${middleSection[0]?.backgroundImg}`
                : ""
            }
          />

          <ButtonSection loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default MiddleSectionForm;

// Validation schema for the Middle Section form
export const MiddleSectionValidation = Yup.object({
  titleOne: Yup.string()
    .required("Title One is required")
    .min(3, "Title One must be at least 3 characters long"),
  titleTwo: Yup.string()
    .required("Title Two is required")
    .min(3, "Title Two must be at least 3 characters long"),
  titleOne_ar: Yup.string()
    .required("Title One is required")
    .min(3, "Title One must be at least 3 characters long"),
  titleTwo_ar: Yup.string()
    .required("Title Two is required")
    .min(3, "Title Two must be at least 3 characters long"),
  backgroundImg: Yup.mixed().required("Background Image is required"),
});
