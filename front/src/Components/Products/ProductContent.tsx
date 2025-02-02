interface ProductContentProps {
  title: string;
  description: string;
}

const ProductContent: React.FC<ProductContentProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
};

export default ProductContent;
