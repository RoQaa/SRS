/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikValues,
  ErrorMessage,
} from "formik";
import { Button, Input, FormGroup, Label, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { ButtonSection } from "./ButtonSection";
import * as Yup from "yup";
import {
  ICounterData,
  ICounterValues,
} from "@/interfaces/CounterData.interface";
import UploadImage from "./UploadImage";
import { useAppDispatch } from "@/Redux/Hooks";
import {
  addCounterData,
  fetchCounterData,
  updateCounterData,
} from "@/Redux/Reducers/CounterSlice";

export const CounterForm: React.FC<{ counters: ICounterData[] }> = ({
  counters,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Ensure default values for arrays
  const initialValues = {
    image: `${counters[0]?.image}` || "",
    counters: counters[0]?.counters || {},
  };

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "counters") {
        (values.counters as ICounterValues[]).forEach(
          (counter: ICounterValues, index) => {
            formData.append(`counters[${index}][label]`, counter.label);
            formData.append(`counters[${index}][label_ar]`, counter.label_ar);
            formData.append(
              `counters[${index}][value]`,
              counter.value.toString()
            );
          }
        );
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      // Fetch existing counter data
      const existingCounters = await dispatch(fetchCounterData()).unwrap();

      if (!existingCounters || existingCounters.length === 0) {
        // No counter data exists, create a new counter
        await dispatch(addCounterData(formData)).unwrap();
        toast.success("Counter created successfully!");
        await dispatch(fetchCounterData()).unwrap();
      } else {
        // Counter data exists, update the first counter
        const counterId = existingCounters[0]._id;
        await dispatch(updateCounterData({ formData, id: counterId })).unwrap();
        toast.success("Counter updated successfully!");
        await dispatch(fetchCounterData()).unwrap();
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while handling the counter."
      );
      console.error("Error handling counter data:", error.message);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CounterValidation}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="theme-form">
          <UploadImage
            setFieldValue={setFieldValue}
            oldThumbnail={`${process.env.NEXT_PUBLIC_API_URL}/${counters[0]?.image}` || ""}
          />

          {/* Counters */}
          <FormGroup>
            <Label for="counter">Counters</Label>
            <FieldArray
              name="counters"
              render={(arrayHelpers) => (
                <>
                  {Array.isArray(values.counters) &&
                  values.counters.length > 0 ? (
                    values.counters.map((counter, index) => (
                      <div key={index}>
                        <Row>
                          <Col md={4}>
                            <Label>Label</Label>
                            <Field name={`counters[${index}][label]`}>
                              {({ field }: any) => (
                                <div>
                                  <Input {...field} placeholder="Enter Label" />
                                  {/* Show validation error message for 'label' */}
                                  <ErrorMessage
                                    name={`counters[${index}][label]`}
                                    component="div"
                                    className="text-danger"
                                  >
                                    {(msg) => (
                                      <div className="text-danger">{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={4}>
                            <Label>Label (Ar)</Label>
                            <Field name={`counters[${index}][label_ar]`}>
                              {({ field }: any) => (
                                <div>
                                  <Input
                                    {...field}
                                    placeholder="Enter Label In Arabic"
                                  />
                                  {/* Show validation error message for 'label_ar' */}
                                  <ErrorMessage
                                    name={`counters[${index}][label_ar]`}
                                    component="div"
                                    className="text-danger"
                                  >
                                    {(msg) => (
                                      <div className="text-danger">{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col md={4}>
                            <Label>Count</Label>
                            <Field name={`counters[${index}][value]`}>
                              {({ field }: any) => (
                                <div>
                                  <Input
                                    {...field}
                                    placeholder="Enter Count"
                                    type="number"
                                  />
                                  {/* Show validation error message for 'value' */}
                                  <ErrorMessage
                                    name={`counters[${index}][value]`}
                                    component="div"
                                    className="text-danger"
                                  >
                                    {(msg) => (
                                      <div className="text-danger">{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              )}
                            </Field>
                          </Col>
                        </Row>
                        <Button
                          className="mt-2 mb-3"
                          type="button"
                          color="danger"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove Counter
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div>No Counters available</div>
                  )}
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => arrayHelpers.push({ label: "", value: "" })}
                    className="mt-3 px-4 py-2 btn ms-2"
                  >
                    Add Counter
                  </Button>
                </>
              )}
            />
          </FormGroup>

          <ButtonSection loading={loading} />
        </Form>
      )}
    </Formik>
  );
};

export default CounterForm;

// Validation schema for the counter form
export const CounterValidation = Yup.object({
  image: Yup.mixed().required("Image URL is required"),
  counters: Yup.array()
    .of(
      Yup.object({
        label: Yup.string()
          .required("Counter label is required")
          .min(1, "Counter label must be at least 1 character long"),
        label_ar: Yup.string()
          .required("Counter label ar is required")
          .min(1, "Counter label must be at least 1 character long"),
        value: Yup.number()
          .required("Counter value is required")
          .min(1, "Counter value must be greater than 0"),
      })
    )
    .min(1, "Counter Must Contain At Least 1 Item"),
});
