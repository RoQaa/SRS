import Image from "next/image";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  style?: React.CSSProperties;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  style = {},
}) => {
  return fill ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      style={style}
    />
  ) : (
    <div className="ico-box mb-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        style={style}
      />
    </div>
  );
};

export default ImageComponent;
