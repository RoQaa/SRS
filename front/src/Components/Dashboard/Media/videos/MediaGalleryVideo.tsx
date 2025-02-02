import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import SweetAlert from "sweetalert2";
import { RootState } from "@/Redux/Store";
import { Button, CardBody, Spinner } from "reactstrap";
import {
  deleteMediaItem,
  fetchMediaItems,
  selectMediaByType,
} from "@/Redux/Reducers/MediaSlice";
import { extractEmbedUrl } from "@/utils/getYoutubeVideoEmbededLink";

export const MediaGalleryVideo = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.media);

  // Fetch media items on mount
  useEffect(() => {
    dispatch(fetchMediaItems());
  }, [dispatch]);

  // Get video media items using the selector
  const videoMediaItems = useAppSelector(selectMediaByType("Video"));

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
    width: "450px",
    height: "500px",
    margin: "10px",
    overflow: "hidden",
    position: "relative" as const,
  };

  return (
    <Gallery withCaption>
      {loading ? (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <Spinner color="primary" />
        </CardBody>
      ) : videoMediaItems?.length > 0 ? (
        videoMediaItems.map((item, index) => (
          <figure
            key={index}
            className="col-xl-3 col-md-4 col-sm-6 m-0"
            itemProp="caption description"
            style={figureStyle}
          >
            <Item
              original={`${item?.video}`}
              width="1500"
              height="850"
              caption={item.title}
            >
              {() => (
                <>
                  <div>
                    <Link href={"#"} onClick={(e) => e.preventDefault()}>
                      <Suspense fallback={<p>Loading video...</p>}>
                        <iframe
                          width="100%"
                          height="315"
                          src={extractEmbedUrl(item?.video || "") || ""}
                          title={item?.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </Suspense>
                      <div className="caption border-top-0 p-2">
                        <h4>{item?.title}</h4>
                        <ul className="action simple-list d-flex flex-row">
                          <li className="delete" style={{ cursor: "pointer" }}>
                            <a onClick={() => showWarningAlert(item?._id as string)}>
                              <Button className="btn btn-sm btn-danger" size="sm" color="danger">Delete</Button>
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
          <p>No video items available to display.</p>
        </CardBody>
      )}
    </Gallery>
  );
};
