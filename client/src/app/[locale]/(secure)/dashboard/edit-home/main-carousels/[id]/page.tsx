import NewCarouselContainer from "@/Components/Dashboard/MainCarousels/NewCarousel";

const EditMainCarouselPage = ({ params }: { params: { id: string } }) => {
  return <NewCarouselContainer id={params.id} />;
};

export default EditMainCarouselPage;
