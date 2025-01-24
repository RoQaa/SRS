import SeoFormContainer from "@/Components/Dashboard/SeoContainer/SeoFormContainer";

const page = ({ params }: { params: { page: string } }) => {
  const { page } = params;
  return <SeoFormContainer page={page} />;
};

export default page;
