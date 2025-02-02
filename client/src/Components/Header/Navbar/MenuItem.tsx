import React from "react";
import SubMenuItem from "./SubMenuItem";
import Link from "next/link";

interface SubMenuItemType {
  title: string;
  link: string;
}

interface MenuItemProps {
  item: {
    title: string;
    link: string;
    dropdown?: SubMenuItemType[];
  };
  openDropdowns: { [key: string]: boolean };
  toggleDropdown: (key: string, e: React.MouseEvent) => void;
  openSubDropdowns: { [key: string]: boolean };
  toggleSubDropdown: (key: string, e: React.MouseEvent) => void;
  isMobileMenuOpen: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  openDropdowns,
  toggleDropdown,
  openSubDropdowns,
  toggleSubDropdown,
  isMobileMenuOpen
}) => (
  <li className={`nav-item ${item.dropdown ? "has-dropdown" : ""}`}>
    <Link
      className="nav-link"
      href={item.link}
    >
      {item.title}
      {item.dropdown && <i className="fa-solid fa-chevron-down" onClick={item.dropdown ? (e) => toggleDropdown(item.title, e) : undefined}></i>}
    </Link>
    {item.dropdown && (
      <ul
        className={`dropdown-menu ${openDropdowns[item.title] ? "opened" : ""}`}
      >
        {item.dropdown.map((subItem, subIndex) => (
          <SubMenuItem
            key={subIndex}
            subItem={subItem}
            openSubDropdowns={openSubDropdowns}
            toggleSubDropdown={toggleSubDropdown}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        ))}
      </ul>
    )}
  </li>
);

export default MenuItem;
