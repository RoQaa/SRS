"use client";
import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import SweetAlert from "sweetalert2";
import DataSourceTable from "@/Components/Dashboard/DataSourceTable";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import {
  deleteSeoByPage,
  fetchAllSeoPages,
  SeoData,
} from "@/Redux/Reducers/SeoSlice";
import Link from "next/link";
import { useLocale } from "next-intl";

const SeoPagesList = () => {
  const dispatch = useAppDispatch();
  const { allSeoData, loading } = useAppSelector((state) => state.seo);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllSeoPages());
    };
    fetchData();
  }, [dispatch]);

  // Warning Alert for Deletion
  const showWarningAlert = (seoPage: string) => {
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
        dispatch(deleteSeoByPage(seoPage))
          .unwrap()
          .then(() => {
            SweetAlert.fire({
              icon: "success",
              text: "Item has been deleted!",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error: { message: string }) => {
            SweetAlert.fire({
              icon: "error",
              title: "Error!",
              text: error.message || "Failed to delete the item.",
            });
          });
      }
    });
  };

  // Table Columns for SEO Data
  const columnsSeo = [
    {
      name: "Page",
      selector: (row: SeoData) => row.page,
      sortable: true,
    },
    {
      name: "Title (EN)",
      selector: (row: SeoData) => row.title_en,
      sortable: true,
    },
    {
      name: "Meta Description (EN)",
      selector: (row: SeoData) =>
        row.meta_description_en
          ? row.meta_description_en.slice(0, 48) + "..."
          : "N/A",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: SeoData) => (
        <ul className="action simple-list d-flex flex-row">
          <li className="edit">
            <Link
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/seo/edit?page=${row.page}`}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="delete" style={{ cursor: "pointer" }}>
            <a onClick={() => showWarningAlert(row.page)}>
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
        {loading ? (
          <Col sm="12" className="text-center">
            <Spinner color="primary" />
            <p>Loading SEO data...</p>
          </Col>
        ) : (
          <>
            <Col sm="12" className="mb-3 d-flex justify-content-end">
              <Link href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/seo/add`}>
                <Button size="md" color="primary">
                  Create SEO
                </Button>
              </Link>
            </Col>
            <Col sm="12">
              <DataSourceTable
                data={allSeoData || []}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                columns={columnsSeo}
                filterKey="page"
                title="SEO Pages"
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default SeoPagesList;
