import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface ProductPageCardProps {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  highlight?: boolean;
}

const ProductPageCard: React.FC<ProductPageCardProps> = ({
  imgSrc,
  title,
  description,
  link,
  highlight = false,
}) => {
  const t = useTranslations("products")
  return (
    <div className={`pro-sec-bx ${highlight ? "prod-proj-bx" : ""}`}>
      <div className={`img-p-bx ${highlight ? "img-vis" : ""}`}>
        <Image
          src={imgSrc}
          alt={title}
          width={80}
          height={80}
          style={{ maxWidth: "100%" }}
        />
      </div>
      <h4 style={{ color: highlight ? "#F7941D" : "" }}>{title}</h4>
      <p>{description}</p>
      <a href={link}>
        {t("learn_more")} <i className="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  );
};

export default ProductPageCard;
