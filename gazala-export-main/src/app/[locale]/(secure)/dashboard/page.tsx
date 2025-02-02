"use client";
import React, { useEffect, useState, FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/Redux/Reducers/UserSlice";
import { useLocale } from "next-intl";

const DashboardPage: FunctionComponent = () => {
  const [DashboardOverView, setDashboardOverView] =
    useState<FunctionComponent | null>(null);
  const { loading } = useAppSelector((state) => state.user);
  const router = useRouter();
  const authToken = Cookies.get("auth_token");
  const dispatch = useAppDispatch();
  const locale = useLocale();

  useEffect(() => {
    let user;
    try {
      user = JSON.parse(window.localStorage.getItem("user") as string);
    } catch {
      user = {};
    }
    if (user) dispatch(setUser(user));
    if ((authToken && user?.role === "admin") || "editor") {
      const loadComponent = async () => {
        if (typeof window !== "undefined") {
          // eslint-disable-next-line @next/next/no-assign-module-variable
          const module = await import("@/Components/DashboardOverView/index");
          setDashboardOverView(() => module.default);
        }
      };

      loadComponent();
    } else {
      router.push(`/${locale}/auth/login`);
      return;
    }
  }, [authToken, dispatch, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return DashboardOverView ? <DashboardOverView /> : null;
};

export default DashboardPage;
