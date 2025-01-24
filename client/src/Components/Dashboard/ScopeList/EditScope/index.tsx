/* eslint-disable */
"use client";
import React, { useEffect } from "react";
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
import ScopeBody from "./ScopeBody";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchScopeById } from "@/Redux/Reducers/ScopeSlice";
import { setFormValue } from "@/Redux/Reducers/EditScopeSlice";

const EditScopeContainer = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { currentScope, loading } = useAppSelector(
    (state) => state.scopes
  );
  

  useEffect(() => {
    dispatch(fetchScopeById(slug)); // Fetch scope by slug
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentScope) {
      Object.keys(currentScope).forEach((key) => {
        // Handle form values from currentScope, checking the key
        if (key === "date") {
          //  @ts-ignore
          const dateValue = new Date(currentScope[key]);
          // Only set if the dateValue is valid
          //  @ts-ignore
          if (!isNaN(dateValue.getTime())) {
            //  @ts-ignore
            dispatch(setFormValue({ name: key, value: dateValue }));
          } else {
            //  @ts-ignore
            console.error("Invalid date value:", currentScope[key]);
          }
        } else {
          //  @ts-ignore
          dispatch(setFormValue({ name: key, value: currentScope[key] }));
        }
      });
    }
  }, [currentScope, dispatch]);

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

  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
            </CardHeader>
            <CardBody>
              <ScopeBody slug={slug} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditScopeContainer;
