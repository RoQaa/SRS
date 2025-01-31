"use client";
import { Card, CardBody, Col, Container, Row, Button } from "reactstrap";
import { DescriptionMyGallery } from "./DescriptionMyGallery";
import { PlusSquare } from "react-feather";
import { useRouter } from "next/navigation";
import CommonCarouselHeader from "../CommonCarouselHeader";
import { useLocale } from "next-intl";

const MainCarouselsContainer = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleButtonClick = () => {
    router.push(`/${locale}/dashboard/edit-home/main-carousels/add`);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCarouselHeader title="Main Carousels">
              <Button
                color="primary"
                onClick={handleButtonClick}
                className="d-flex align-items-center mt-sm-0 mt-2"
              >
                <PlusSquare className="me-2" />
                Add Carousel
              </Button>
            </CommonCarouselHeader>
            <CardBody className="my-gallery gallery-with-description ">
              <Row className="justify-content-center justify-content-md-start">
                <DescriptionMyGallery />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainCarouselsContainer;
