import React from "react";

interface ProjectCategoryProps {
  label: string;
  filter: string; // Assuming filter is a string; adjust as needed
  isActive: boolean;
  onClick: (filter: string) => void; // Function that takes a filter and returns void
}

const ProjectCategory: React.FC<ProjectCategoryProps> = ({
  label,
  filter,
  isActive,
  onClick,
}) => {
  return (
    <li
      className={isActive ? "active" : ""}
      onClick={() => onClick(filter)}
      style={{ cursor: "pointer" }}
    >
      {label}
    </li>
  );
};

export default ProjectCategory;
