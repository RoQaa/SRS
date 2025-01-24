import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

interface SubSubMenuItem {
  title: string;
  link: string;
}

interface SubMenuItemProps {
  subItem: {
    title: string;
    link: string;
    subDropdown?: SubSubMenuItem[];
  };
  openSubDropdowns: { [key: string]: boolean };
  toggleSubDropdown: (key: string, e: React.MouseEvent) => void;
  isMobileMenuOpen: boolean;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  subItem,
  openSubDropdowns,
  toggleSubDropdown,
  isMobileMenuOpen,
}) => {
  const locale = useLocale();

  return (
    <li
      className={`has-dropdown-sub ${
        !isMobileMenuOpen
          ? "has-dropdown-rght"
          : subItem.subDropdown
          ? "has-dropdown"
          : ""
      }`}
    >
      <Link className="dropdown-item" href={subItem.link}>
        {subItem.title}
        {subItem.subDropdown && subItem?.subDropdown?.length > 0 && (
          <i
            className="fa-solid fa-chevron-down"
            onClick={(e) => toggleSubDropdown(subItem.title, e)}
          ></i>
        )}
      </Link>
      {subItem.subDropdown && (
        <ul
          className={`${
            !isMobileMenuOpen
              ? locale === "en"
                ? "dropdown-menu-rght"
                : "dropdown-menu-rght ar"
              : openSubDropdowns[subItem.title]
              ? "dropdown-menu opened"
              : "dropdown-menu"
          }`}
        >
          {subItem.subDropdown.map((subSubItem, subSubIndex) => (
            <li key={subSubIndex}>
              <Link className="dropdown-item" href={subSubItem.link}>
                {subSubItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SubMenuItem;
