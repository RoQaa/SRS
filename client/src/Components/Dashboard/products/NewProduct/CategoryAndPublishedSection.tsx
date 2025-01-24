import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { ErrorMessage, Field } from "formik";
import { useEffect } from "react";
import { Col, FormGroup, Label, Row, Spinner } from "reactstrap";

export const CategoryAndPublishedSection = () => {
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
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label check>Category</Label>
              <Field
                as="select"
                name="parentProductId"
                className="form-control form-select"
              >
                <option value="null">Select Category</option>
                {productsData.length > 0 &&
                  productsData.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name?.toUpperCase()}
                      </option>
                    );
                  })}
              </Field>
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
      )}
    </>
  );
};
