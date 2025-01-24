"use client";
import { Card, CardBody, Col, Container, Row, Button } from "reactstrap";
import { PlusSquare } from "react-feather";
import { useRouter } from "next/navigation";
import CommonCarouselHeader from "../../CommonCarouselHeader";
import { MediaGalleryVideo } from "./MediaGalleryVideo";

const MediaVideosContainer = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/dashboard/media/videos/add");
  };

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCarouselHeader title="Media Video">
              <Button
                color="primary"
                onClick={handleButtonClick}
                className="d-flex align-items-center mt-sm-0 mt-2"
              >
                <PlusSquare className="me-2" />
                Add Video
              </Button>
            </CommonCarouselHeader>
            <CardBody className="my-gallery gallery-with-description">
              <Row className="justify-content-center justify-content-md-start">
                <MediaGalleryVideo />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MediaVideosContainer;
