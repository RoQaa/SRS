"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import ValuesListHead from "./ValuesListHead";
import { CardBody, Col, Container, Row, Spinner } from "reactstrap";
import ValueCard from "./ValueCard";
import { useEffect } from "react";
import { fetchValues } from "@/Redux/Reducers/ValuesSlice";

const ValuesContainer = () => {
  const { activeTab, values, isLoading } = useAppSelector(
    (state) => state.values
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchValues());
  }, [dispatch]);
  
  return (
    <Container fluid>
      <Row>
        <Col md="12" className="project-list">
          <ValuesListHead activeTab={activeTab} />
        </Col>
      </Row>
      {isLoading ? (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <Spinner color="primary" />
        </CardBody>
      ) : (
        <Row>
          <Col>
            <ValueCard values={values || []} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ValuesContainer;
