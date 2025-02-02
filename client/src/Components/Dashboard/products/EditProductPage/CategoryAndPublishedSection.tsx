"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { ErrorMessage, Field } from "formik";
import { useEffect } from "react";
import { Col, FormGroup, Label, Row, Spinner } from "reactstrap";

export const CategoryAndPublishedSection = () => {
  const dispatch = useAppDispatch();
  const { productsData, loading } = useAppSelector((state) => state.products);
  const { currentProduct } = useAppSelector((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!productsData.length) {
        await dispatch(fetchProducts());
      }
    };
    fetchCategories();
  }, [dispatch, productsData]);

  // Check if currentProduct exists before trying to access _id
  const filteredProducts = currentProduct
    ? productsData.filter((product) => product._id !== currentProduct._id)
    : productsData;

  return (
    <Row>
      <Col sm="6">
        <FormGroup>
          <Label check>Category</Label>
          {loading ? (
            <div className="text-center">
              <Spinner size="sm" color="primary" />
            </div>
          ) : (
            <Field
              as="select"
              name="parentProductId"
              className="form-control form-select"
            >
              <option value="">Select Category</option>
              {filteredProducts.length > 0 &&
                filteredProducts.map((product) => (
                  <option key={product._id} value={product?._id?.toString()}>
                    {product.name.toUpperCase()}
                  </option>
                ))}
            </Field>
          )}
          <ErrorMessage
            name="parentProductId"
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <Label>Publish</Label>
          <Field
            name="published"
            as="select"
            className="form-control form-select"
          >
            <option value="true">Publish</option>
            <option value="false">Un Publish</option>
          </Field>
        </FormGroup>
      </Col>
    </Row>
  );
};
