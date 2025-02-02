import { useAppDispatch } from "@/Redux/Hooks";
import { deleteProject } from "@/Redux/Reducers/ProjectSlice";
import SweetAlert from "sweetalert2";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useLocale } from "next-intl";

interface DashBoardCommonDropdownProps {
  projectSlug: string;
  projectId: string;
}

export const CommonDropdown: React.FC<DashBoardCommonDropdownProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectSlug,
  projectId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dispatch = useAppDispatch();
  const locale = useLocale()
  
  const showWarningAlert = (projectId: string) => {
    SweetAlert.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, this item cannot be recovered!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProject(projectId))
          .unwrap()
          .then(() => {
            SweetAlert.fire({
              icon: "success",
              text: "Item has been deleted!",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error) => {
            SweetAlert.fire({
              icon: "error",
              title: "Error!",
              text: error.message || "Failed to delete the item.",
            });
          });
      }
    });
  };

  return (
    <Dropdown
      className="icon-dropdown"
      isOpen={dropdownOpen}
      toggle={toggle}
      style={{ position: "absolute", top: "6px", right: "34px" }}
    >
      <DropdownToggle caret color="transparent" className="border-0 pe-0">
        <i className="icon-more-alt pe-0" />
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-end">
        <DropdownItem
          tag="a"
          href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/projects/edit?id=${projectId}`}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          style={{ cursor: "pointer" }}
          tag="a"
          onClick={() => showWarningAlert(projectId)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
