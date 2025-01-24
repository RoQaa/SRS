"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { ErrorMessage, Field } from "formik";
import { useEffect } from "react";
import { Col, FormGroup, Label, Row, Spinner } from "reactstrap";

export const CategoryAndLocationSection = ({
  lang = "en",
  category = true,
}) => {
  const dispatch = useAppDispatch();
  const { productsData, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(fetchProducts());
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <>
      {
        loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <>
                  <Row>
        <Col sm="12">
          <FormGroup>
            <Label check>
              {lang === "en" ? "Location" : "Location (Arabic)"}
            </Label>
            <Field
              type="text"
              name={lang === "en" ? "location" : "location_ar"}
              className="form-control"
              placeholder="Enter Location"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {category && (
          <Col sm="6">
            <FormGroup>
              <Label check>
                {lang === "en" ? "Category" : "Category (Arabic)"}
              </Label>
              <Field
                as="select"
                name={lang === "en" ? "category" : "category_ar"}
                className="form-control form-select"
              >
                <option value="">Select Category</option>
                {productsData.length > 0 &&
                  productsData.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
              </Field>
              <ErrorMessage
                name={lang === "en" ? "category" : "category_ar"}
                component="span"
                className="text-danger"
              />
            </FormGroup>
          </Col>
        )}
      </Row>
          </>
        )
      }
    </>
  );
};
