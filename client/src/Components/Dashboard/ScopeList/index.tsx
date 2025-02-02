"use client";
import React, { useEffect } from "react";
import { Alert, Badge, Col, Container, Row, Spinner } from "reactstrap";
import SweetAlert from "sweetalert2";
import ScopeListHead from "./ScopeListHead";
import { IScope } from "@/interfaces/Scope.interface";
import DataSourceTable from "@/Components/Dashboard/DataSourceTable";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { fetchScopes, deleteScope } from "@/Redux/Reducers/ScopeSlice";
import Link from "next/link";
import { useLocale } from "next-intl";

const ScopeListContainer = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { scopesData, activeTab, loading, error } = useAppSelector(
    (state) => state.scopes
  );

  useEffect(() => {
    dispatch(fetchScopes());
  }, [dispatch]);

  // Warning Alert Fire
  const showWarningAlert = (scopeId: string) => {
    SweetAlert.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, this item cannot be recovered!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteScope(scopeId))
          .unwrap() // Unwrap the promise to catch errors
          .then(() => {
            SweetAlert.fire({
              icon: "success",
              text: "Item has been deleted!",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error) => {
            SweetAlert.fire({
              icon: "error",
              title: "Error!",
              text: error.message || "Failed to delete the item.",
            });
          });
      }
    });
  };

  // Filter scopeData based on activeTab [Published, Unpublished]
  const filteredScopeData =
    Array.isArray(scopesData) &&
    scopesData.filter((scope) => {
      if (activeTab === "1") return true; // All scopes
      if (activeTab === "2") return scope.published; // Published scopes
      if (activeTab === "3") return !scope.published; // Unpublished scopes
      return true;
    });

  // Table Columns
  const columnsScope = [
    {
      name: "Service",
      selector: (row: IScope) => row.service,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row: IScope) => row.details.slice(0, 48) + "...",
      sortable: true,
    },
    {
      name: "Icon",
      selector: (row: IScope) => (
        <img
          src={process.env.NEXT_PUBLIC_API_URL + "/" + row.iconImg}
          alt="Scope Image"
          width={50}
        />
      ),
      sortable: false,
    },
    {
      name: "Status",
      cell: (row: IScope) => (
        <Badge pill color={row.published ? "success" : "danger"}>
          {row.published ? "Published" : "Unpublished"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: IScope) => (
        <ul className="action simple-list d-flex flex-row">
          <li className="edit">
            <Link
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/edit-scope/edit?id=${row._id}`}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="delete" style={{ cursor: "pointer" }}>
            <a onClick={() => showWarningAlert(row._id as string)}>
              <i className="icon-trash" />
            </a>
          </li>
        </ul>
      ),
      sortable: false,
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md="12" className="project-list">
          <ScopeListHead activeTab={activeTab} />
        </Col>

        {loading ? (
          <Col sm="12" className="text-center">
            <Spinner color="primary" />
            <p>Loading scope data...</p>
          </Col>
        ) : error ? (
          <Col sm="12">
            <Alert color="danger">
              {error || "An error occurred while fetching scope data."}
            </Alert>
          </Col>
        ) : (
          <Col sm="12">
            <DataSourceTable
              data={filteredScopeData || []}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              columns={columnsScope}
              filterKey="service"
              title="Scopes"
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ScopeListContainer;
