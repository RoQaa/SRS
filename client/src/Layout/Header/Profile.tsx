import { Href, ImagePath, Logout } from "@/Constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { LogOut } from "react-feather";
import { stringToTitleCase } from "@/utils/stringToTitleCase";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export const Profile = () => {
  const storedUser = window.localStorage.getItem("user");
  const authUser = storedUser ? JSON.parse(storedUser) : "";
  const locale = useLocale();
  const router = useRouter();
  const logOut = async () => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      throw new Error("No authorization token found");
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      Cookies.remove("mofi_token");
      Cookies.remove("auth_token");
      window.localStorage.removeItem("user");
      router.push(`/${locale}/auth/login`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <img
          className="img-30"
          src={`${ImagePath}/dashboard/profile.png`}
          alt=""
        />
        <div className="flex-grow-1">
          <span>
            {authUser ? stringToTitleCase(authUser?.fName) : "UnKnown"}
          </span>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        <li onClick={logOut}>
          <Link href={Href} scroll={false}>
            <LogOut />
            <span>{Logout}</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};
