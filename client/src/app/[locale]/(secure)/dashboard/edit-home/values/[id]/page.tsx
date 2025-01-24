import ValuesFormContainer from "@/Components/Dashboard/ValuesContainer/ValuesForm";

const EditValuePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ValuesFormContainer id={id} />;
};

export default EditValuePage;
