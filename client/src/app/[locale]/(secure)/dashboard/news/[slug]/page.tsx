"use client";
import EditProductContainer from "@/Components/Dashboard/EditItem";
import { useSearchParams } from "next/navigation";

const EditNewsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <EditProductContainer slug={id as string} />; 
};

export default EditNewsPage;
