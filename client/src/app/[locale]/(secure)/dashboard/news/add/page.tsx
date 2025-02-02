"use client";
import React, { FunctionComponent, useEffect, useState } from "react";

const AddNews = () => {
  const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof navigator !== "undefined") {
        const newClient = (await import("@/Components/Dashboard/AddNewItem")).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return MyAwesomeMap ? <MyAwesomeMap /> : "";
};

export default AddNews;
