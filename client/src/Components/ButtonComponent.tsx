import Link from "next/link";

interface ButtonComponent {
  href: string;
  btnText: string;
  extraClasses: string;
  target: string;
  rel: string;
}

const ButtonComponent: React.FC<ButtonComponent> = ({
  href,
  btnText,
  extraClasses = "",
  target = "_self",
  rel = "",
}) => {
  return (
    <Link
      href={href}
      className={`btn ${extraClasses}`}
      target={target}
      rel={rel}
      aria-label={btnText} 
    >
      {btnText}
    </Link>
  );
};

export default ButtonComponent;
