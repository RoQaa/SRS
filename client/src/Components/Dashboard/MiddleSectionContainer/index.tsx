"use client";
import { Card, Spinner } from "reactstrap";
import { useEffect } from "react";
import { RootState } from "@/Redux/Store";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import MiddleSectionForm from "./MiddleSectionForm";
import { fetchMiddleSection } from "@/Redux/Reducers/MiddleSectionSlice";

// Custom hook to handle contacts logic
const useMiddleSection = () => {
  const dispatch = useAppDispatch();
  const middleSection = useAppSelector((state: RootState) => state.middleSection.data);
  const loading = useAppSelector((state: RootState) => state.middleSection.loading);
  const error = useAppSelector((state: RootState) => state.middleSection.error);

  useEffect(() => {
    dispatch(fetchMiddleSection());
  }, [dispatch]);

  return { middleSection, loading, error, dispatch };
};

const UpdateMiddleSectionContainer = () => {
  const { middleSection, loading } = useMiddleSection();

  return (
    <>
      {loading ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          <h3 className="font-weight-bold text-xl mb-8 text-center my-4">
            Middle Section
          </h3>

          <Card body>
            <MiddleSectionForm middleSection={middleSection ?? []} />
          </Card>
        </div>
      )}
    </>
  );
};

export default UpdateMiddleSectionContainer;
