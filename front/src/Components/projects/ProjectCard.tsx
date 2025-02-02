import Image from "next/image";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  link,
}) => {
  return (
    <>
      <div className="or-img">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
          alt={title}
          layout="responsive"
          width={512}
          height={512}
        />
      </div>
      <div className="overlay">
        <a href={link} className="content">
          <h3>{title}</h3>
          <p>{description}</p>
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
