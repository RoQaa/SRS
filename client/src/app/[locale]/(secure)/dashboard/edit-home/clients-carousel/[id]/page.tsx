import NewClientsCarouselContainer from "@/Components/Dashboard/ClientsCarousel/NewCarousel";

const EditClientsCarouselPage = ({ params }: { params: { id: string } }) => {
  return <NewClientsCarouselContainer id={params.id} />;
};

export default EditClientsCarouselPage;
