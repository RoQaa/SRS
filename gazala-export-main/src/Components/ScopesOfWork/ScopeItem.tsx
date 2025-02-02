interface ScopeItemProps {
  title: string;
  description: string;
  link: string;
  imgSrc: string;
}

const ScopeItem: React.FC<ScopeItemProps> = ({
  title,
  description,
  link,
  imgSrc,
}) => {
  return (
    <div className="col-12 col-lg-6 mt-5">
      <div className="scope-box">
        <div className="scp-img">
          <img src={imgSrc} alt={title} loading="lazy" />
        </div>
        <div className="scp-data">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <a href={link} className="scp-more">
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default ScopeItem;
