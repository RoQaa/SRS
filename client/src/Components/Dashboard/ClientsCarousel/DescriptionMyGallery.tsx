/* eslint-disable @typescript-eslint/ban-ts-comment */
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import SweetAlert from "sweetalert2";
import { RootState } from "@/Redux/Store";
import { useRouter } from "next/navigation";
import { CardBody, Spinner } from "reactstrap";
import { deleteClientCarousel, fetchClientsCarousels } from "@/Redux/Reducers/ClientsCarouselsSlice";
import { useLocale } from "next-intl";

export const DescriptionMyGallery = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const { clientsCarousels, loading } = useAppSelector(
    (state: RootState) => state.clientsCarousel
  );
  

  useEffect(() => {
    dispatch(fetchClientsCarousels());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteClientCarousel(id)).unwrap();
      dispatch(fetchClientsCarousels());
      SweetAlert.fire({
        icon: "success",
        text: "Item has been deleted!",
        confirmButtonColor: "#3085d6",
      });
    } catch {
      SweetAlert.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the item.",
      });
    }
  };

  const showWarningAlert = (carouselId: string) => {
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
        handleDelete(carouselId);
      }
    });
  };

  const figureStyle = {
    width: "350px",
    height: "400px",
    margin: "10px",
    overflow: "hidden",
    position: "relative" as const,
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
    borderBottom: "1px solid #ddd",
  };

  return (
    <Gallery withCaption>
      {loading ? (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <Spinner color="primary" />
        </CardBody>
      ) : clientsCarousels?.length > 0 ? (
        clientsCarousels.map((item, index) => (
          <figure
            key={index}
            className="col-xl-3 col-md-4 col-sm-6 m-0"
            itemProp="caption description"
            style={figureStyle}
          >
            <Item
              original={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
              width="1500"
              height="850"
              caption={item.title}
            >
              {({ ref, open }) => (
                <>
                  <div>
                    <Link href={"#"} onClick={(e) => e.preventDefault()}>
                      <img
                        onClick={open}
                        className="img-thumbnail border-bottom-0 p-2 rounded-0 rounded-top-1"
                        ref={ref as React.MutableRefObject<HTMLImageElement>}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
                        style={imgStyle}
                        alt="client-logo-img"
                      />
                      <div className="caption border-top-0 p-2">
                        <h4>{item?.title}</h4>
                        <ul className="action simple-list d-flex flex-row">
                          <li className="edit">
                            <a
                              onClick={() =>
                                router.push(
                                  `/${locale}/dashboard/edit-home/clients-carousel/edit?id=${item?._id}`
                                )
                              }
                              href={"#"}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="icon-pencil-alt" />
                            </a>
                          </li>
                          <li className="delete" style={{ cursor: "pointer" }}>
                            {/* @ts-ignore */}
                            <a onClick={() => showWarningAlert(item?._id)}>
                              <i className="icon-trash" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </Item>
          </figure>
        ))
      ) : (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <p>No Carousels available to display.</p>
        </CardBody>
      )}
    </Gallery>
  );
};
