import { useAppSelector } from "@/Redux/Hooks";
import { Fragment, useState } from "react";
import { MenuList } from "@/Data/Layout/Menu";
import { MenuItem } from "@/Types/LayoutTypes";
import Menulist from "./Menulist";
import { useTranslation } from "react-i18next";

const SidebarMenuList = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);

  const { t } = useTranslation("common");
  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) =>
      pinedMenu.includes(titles || "")
    );
  };

  // Check if the current user has an 'admin' role
  const user = window.localStorage.getItem("user");
  const authUser = user ? JSON.parse(user) : "";

  const isAdmin = authUser?.role === "admin" ? true : false;

  const filteredMenuList = MenuList?.map((menu) => {
    if (menu.title === "Users" && !isAdmin) {
      // If the current user is not an admin, exclude the "Users" menu
      return {
        ...menu,
        Items: [],
      };
    }
    return menu;
  });

  return (
    <>
      {filteredMenuList &&
        filteredMenuList.map((mainMenu: MenuItem, index) => (
          <Fragment key={index}>
            <li
              className={`sidebar-main-title ${
                shouldHideMenu(mainMenu) ? "d-none" : ""
              }`}
            >
              <div>
                <h6 className={mainMenu.lanClass ? mainMenu.lanClass : ""}>
                  {t(mainMenu.title)}
                </h6>
              </div>
            </li>
            <Menulist
              menu={mainMenu.Items}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              level={0}
            />
          </Fragment>
        ))}
    </>
  );
};

export default SidebarMenuList;
