import React, { useEffect } from "react";
import { Alert, Badge, Col, Container, Row, Spinner } from "reactstrap";
import SweetAlert from "sweetalert2";
import NewsListHead from "./NewsListHead";
import { INews } from "@/interfaces/News.interface";
import DataSourceTable from "@/Components/Dashboard/DataSourceTable";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { fetchNews, deleteNews } from "@/Redux/Reducers/NewsSlice";
import Link from "next/link";
import { useLocale } from "next-intl";

const NewsListContainer = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { newsData, activeTab, loading, error } = useAppSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // Warning Alert Fire
  const showWarningAlert = (newsId: string) => {
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
        dispatch(deleteNews(newsId))
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

  // Filter newsData based on activeTab [Published, UnPublished]
  const filteredNewsData =
    Array.isArray(newsData) &&
    newsData.filter((news) => {
      if (activeTab === "1") return true; // All news
      if (activeTab === "2") return news.published; // Published news
      if (activeTab === "3") return !news.published; // Unpublished news
      return true;
    });

  // Table Columns
  const columnsNews = [
    {
      name: "Title",
      selector: (row: INews) => row.title,
      sortable: true,
    },
    {
      name: "Content",
      selector: (row: INews) =>
        stripHtmlTags(row.description).slice(0, 48) + "...",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row: INews) => (
        <img
          src={process.env.NEXT_PUBLIC_API_URL + "/" + row.thumbnail}
          alt="News Image"
          width={50}
        />
      ),
      sortable: false,
    },
    {
      name: "Status",
      cell: (row: INews) => (
        <Badge pill color={row.published ? "success" : "danger"}>
          {row.published ? "Published" : "Unpublished"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: INews) => (
        <ul className="action simple-list d-flex flex-row">
          <li className="edit">
            <Link
              href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/news/edit?id=${row._id}`}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="delete" style={{ cursor: "pointer" }}>
            <a onClick={() => showWarningAlert(row._id)}>
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
          <NewsListHead activeTab={activeTab} />
        </Col>

        {loading ? (
          // Show loading indicator
          <Col sm="12" className="text-center">
            <Spinner color="primary" />
            <p>Loading news data...</p>
          </Col>
        ) : error ? (
          // Show error message
          <Col sm="12">
            <Alert color="danger">
              {error || "An error occurred while fetching news data."}
            </Alert>
          </Col>
        ) : (
          // Display the news list if no loading or error
          <Col sm="12">
            <DataSourceTable
              data={filteredNewsData || []}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              columns={columnsNews}
              filterKey="title"
              title="News"
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default NewsListContainer;
