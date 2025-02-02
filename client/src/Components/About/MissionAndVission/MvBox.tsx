interface MvBoxProps {
  icon: string;
  label: string;
  title: string;
  content: string;
  locale: string;
}

const MvBox: React.FC<MvBoxProps> = ({
  icon,
  label,
  title,
  content,
  locale,
}) => {
  return (
    <div className="acc-box m-2">
      <div
        className="acc-header"
        style={{ marginRight: locale === "ar" ? "0px" : "" }}
      >
        <i className={icon}></i>
        <h2>{label}</h2>
      </div>
      <div
        className="acc-content"
        style={{ marginRight: locale === "ar" ? "20px" : "" }}
      >
        <p>
          <strong>{title}</strong>
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MvBox;
