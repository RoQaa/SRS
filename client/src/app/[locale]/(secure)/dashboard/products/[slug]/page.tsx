"use client";
import EditProductContainerPage from "@/Components/Dashboard/products/EditProductPage";
import { useSearchParams } from "next/navigation";

const EditProductsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <EditProductContainerPage slug={id as string} />;
};

export default EditProductsPage;
