"use client";
import { Card, Spinner } from "reactstrap";
import { useEffect } from "react";
import { RootState } from "@/Redux/Store";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchCounterData } from "@/Redux/Reducers/CounterSlice";
import CounterForm from "./CounterForm";

// Custom hook to handle contacts logic
const useCounter = () => {
  const dispatch = useAppDispatch();
  const counters = useAppSelector((state: RootState) => state.counter.counters);
  const loading = useAppSelector((state: RootState) => state.counter.loading);
  const error = useAppSelector((state: RootState) => state.counter.error);

  useEffect(() => {
    dispatch(fetchCounterData());
  }, [dispatch]);

  return { counters, loading, error, dispatch };
};

const UpdateCounterContainer = () => {
  const { counters, loading } = useCounter();

  return (
    <>
      {loading ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          <h3 className="font-weight-bold text-xl mb-8 text-center my-4">
            Counter Section
          </h3>

          <Card body>
            <CounterForm counters={counters ?? []} />
          </Card>
        </div>
      )}
    </>
  );
};

export default UpdateCounterContainer;
