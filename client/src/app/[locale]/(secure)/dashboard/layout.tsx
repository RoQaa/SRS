"use client";
import Footer from "@/Layout/Footer/Footer";
import { SideBar } from "@/Layout/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import "@/index.scss";
import { Header } from "@/Layout/Header/Header";
import TapTop from "@/Layout/TapTop";
import { useEffect, useState } from "react";
import { setToggleSidebar } from "@/Redux/Reducers/LayoutSlice";
import { setLayout } from "@/Redux/Reducers/ThemeCustomizerSlice";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const compactSidebar = () => {
    const windowWidth = window.innerWidth;
    if (layout === "compact-wrapper") {
      if (windowWidth < 1200) {
        dispatch(setToggleSidebar(true));
      } else {
        dispatch(setToggleSidebar(false));
      }
    } else if (layout === "horizontal-wrapper") {
      if (windowWidth < 992) {
        dispatch(setToggleSidebar(true));
        dispatch(setLayout("compact-wrapper"));
      } else {
        dispatch(setToggleSidebar(false));
        dispatch(setLayout(localStorage.getItem("layout")));
      }
    }
  };

  useEffect(() => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      router.push("/auth/login"); // Redirect if no token
      return;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(authToken);
      
      if (decodedToken.exp < Date.now() / 1000) {
        Cookies.remove("auth_token");
        window.localStorage.removeItem("user");
        router.push("/auth/login");
        return;
      }

      setToken(authToken);
    } catch {
      Cookies.remove("auth_token");
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [compactSidebar, layout]);

  return (
    <>
      {token && (
        <>
          <div className={`page-wrapper ${layout}`} id="pageWrapper">
            <Header />
            <div className="page-body-wrapper">
              <SideBar />
              <div className="page-body">{children}</div>
              <Footer />
            </div>
          </div>
          <TapTop />
        </>
      )}
    </>
  );
}
