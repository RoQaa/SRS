"use client";
import React, { useEffect } from "react";
import { Badge, Col, Container, Row, Spinner } from "reactstrap";
import SweetAlert from "sweetalert2";
import ProductListHead from "./ProductsListHead";
import { IProduct } from "@/interfaces/Products.interface";
import DataSourceTable from "@/Components/Dashboard/DataSourceTable";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { fetchProducts, deleteProduct } from "@/Redux/Reducers/ProductsSlice";
import Link from "next/link";
import { useLocale } from "next-intl";

const ProductListContainer = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { productsData, activeTab, loading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
    };

    fetchData();
  }, [dispatch]);

  // Warning Alert for Deletion
  const showWarningAlert = (productId: string) => {
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
        dispatch(deleteProduct(productId))
          .unwrap() // Unwrap the promise to catch errors
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

  // Filter productsData based on activeTab
  const filteredProductsData =
    Array.isArray(productsData) &&
    productsData.filter((product) => {
      if (activeTab === "1") return true; // All products
      if (activeTab === "2") return product.published; // published products
      if (activeTab === "3") return !product.published; // unpublished products
      return true;
    });

  // Table Columns for Products
  const columnsProducts = [
    {
      name: "Product Name",
      selector: (row: IProduct) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: IProduct) =>
        stripHtmlTags(row.description).slice(0, 48) + "...",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row: IProduct) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.thumbnail}`}
          alt="Product Image"
          width={50}
        />
      ),
      sortable: false,
    },
    {
      name: "Status",
      cell: (row: IProduct) => (
        <Badge pill color={row.published === true ? "success" : "danger"}>
          {row.published === true ? "Published" : "UnPublished"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: IProduct) => (
        <ul className="action simple-list d-flex flex-row">
          <li className="edit">
            <Link
              prefetch={true}
              href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/products/edit?id=${row._id}`}
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
          <ProductListHead activeTab={activeTab} />
        </Col>

        {loading ? (
          // Show loading indicator
          <Col sm="12" className="text-center">
            <Spinner color="primary" />
            <p>Loading products data...</p>
          </Col>
        ) : (
          // Display the product list if no loading or error
          <Col sm="12">
            <DataSourceTable
              data={filteredProductsData || []}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              columns={columnsProducts}
              filterKey="name"
              title="Products"
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductListContainer;
