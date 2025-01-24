import React, { useEffect } from "react";
import { CreateNews } from "@/Constant";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
} from "reactstrap";
import ProductBody from "./ProductBody";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchNewsById } from "@/Redux/Reducers/NewsSlice";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";

const EditProductContainer = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { currentNews, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsById(slug)); // Fetch news by slug
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentNews) {
      Object.keys(currentNews).forEach((key) => {
        // Check if the key is 'date' and ensure it's valid
        if (key === "date") {
          const dateValue = new Date(currentNews[key]);
          // Only set if the dateValue is valid
          if (!isNaN(dateValue.getTime())) {
            dispatch(setFormValue({ name: key, value: dateValue }));
          } else {
            console.error("Invalid date value:", currentNews[key]);
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch(setFormValue({ name: key, value: currentNews[key] }));
        }
      });
    }
  }, [currentNews, dispatch]);

  if (loading) {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" className="text-center">
            <Spinner color="primary" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Row>
          <Col xs="12">
            <Alert color="danger">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <h5>{CreateNews}</h5>
            </CardHeader>
            <CardBody>
              <ProductBody slug={slug} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductContainer;
