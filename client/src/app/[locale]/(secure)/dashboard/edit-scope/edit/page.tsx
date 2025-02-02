'use client'
import EditScopeContainer from "@/Components/Dashboard/ScopeList/EditScope";
import { useSearchParams } from "next/navigation";

const SingleScope = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  return <EditScopeContainer slug={id as string} />;
};

export default SingleScope;
