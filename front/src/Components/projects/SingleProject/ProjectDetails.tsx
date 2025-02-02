/* eslint-disable @typescript-eslint/ban-ts-comment */
import SideMenu from "@/Components/SingleItem/SideMenu";
import SingleItemDetails from "@/Components/SingleItem/SingleItemDetails";

interface Project {
  title: string;
  description: string;
  details: string[];
  otherProducts: OtherProduct[];
}

interface OtherProduct {
  name: string;
  link: string;
  active?: boolean;
}

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-9">
    {/* @ts-ignore */}
        <SingleItemDetails item={project} />
      </div>
      <div className="col-12 col-lg-3">
        <div className="pro-side-menu">
          <h2>Other Products</h2>
          {/* @ts-ignore */}
          <SideMenu otherItems={project.otherProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
