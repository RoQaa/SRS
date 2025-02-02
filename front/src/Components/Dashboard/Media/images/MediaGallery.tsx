import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import SweetAlert from "sweetalert2";
import { RootState } from "@/Redux/Store";
import { Button, CardBody, Spinner } from "reactstrap";
import {
  deleteMediaItem,
  fetchMediaItems,
  selectMediaByType,
} from "@/Redux/Reducers/MediaSlice";

export const MediaGallery = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.media);

  // Fetch media items on mount
  useEffect(() => {
    dispatch(fetchMediaItems());
  }, [dispatch]);

  // Get image media items using the selector
  const imageMediaItems = useAppSelector(selectMediaByType("Image"));

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteMediaItem(id)).unwrap();
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

  const showWarningAlert = (mediaId: string) => {
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
        handleDelete(mediaId);
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
      ) : imageMediaItems?.length > 0 ? (
        imageMediaItems.map((item, index) => (
          <figure
            key={index}
            className="col-xl-3 col-md-4 col-sm-6 m-0"
            itemProp="caption description"
            style={figureStyle}
          >
            <Item
              original={`${item?.full}`}
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
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.thumbnail}`}
                        style={imgStyle}
                        alt="media-item-img"
                      />
                      <div className="caption border-top-0 p-2">
                        <h4>{item?.title}</h4>
                        <ul className="action simple-list d-flex flex-row">
                          <li className="delete" style={{ cursor: "pointer" }}>
                            <a
                              onClick={() =>
                                showWarningAlert(item?._id as string)
                              }
                            >
                              <Button className="btn btn-sm btn-danger" color="danger" size="sm">Delete</Button>
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
          <p>No media items available to display.</p>
        </CardBody>
      )}
    </Gallery>
  );
};
