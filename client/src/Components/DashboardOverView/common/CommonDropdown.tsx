import { Href } from "@/Constant";
import { DashBoardCommonDropdown } from "@/Types/DashboardType";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

export const CommonDropdown: React.FC<DashBoardCommonDropdown> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      className="icon-dropdown text-center"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret color="transparent" className="border-0 pe-0">
        <i className="icon-more-alt pe-0" />
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-end">
        <DropdownItem tag="a" href={Href}>
          View
        </DropdownItem>
        <DropdownItem tag="a" href={Href}>
          Edit
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
