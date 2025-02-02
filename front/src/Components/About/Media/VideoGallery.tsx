"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchMediaItems } from "@/Redux/Reducers/MediaSlice";
import { extractEmbedUrl } from "@/utils/getYoutubeVideoEmbededLink";
import { useLocale } from "next-intl";
import { Suspense, useEffect } from "react";

const VideoGallery = () => {
  const { mediaItems } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();
  const locale = useLocale();

  useEffect(() => {
    if (mediaItems?.length < 1) {
      dispatch(fetchMediaItems());
    }
  }, [dispatch, mediaItems?.length]);

  const videosItems = mediaItems.length
    ? mediaItems.filter((video) => video.type === "Video" && video.published)
    : [];

  return (
    <div className="image-gallery">
      <div className="container">
        <div className="content">
          <div className="video-gallery">
            {videosItems.length > 0 &&
              videosItems.map((video, index) => (
                <div className="gallery-item" key={index}>
                  <Suspense fallback={<p>Loading video...</p>}>
                    <iframe
                      width="100%"
                      height="315"
                      src={extractEmbedUrl(video?.video || "") || ""}
                      title={
                        locale === "en" ? video?.title : video?.title_ar || ""
                      }
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </Suspense>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
