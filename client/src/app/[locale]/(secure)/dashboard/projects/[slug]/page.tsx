"use client";
import NewProjectContainer from "@/Components/Dashboard/projects/NewProject";
import { useSearchParams } from "next/navigation";

const EditProjectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <NewProjectContainer slug={id as string} />;
};

export default EditProjectPage;
