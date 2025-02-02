import React, { Fragment } from "react";
import { CardHeader } from "reactstrap";
import { ReactNode } from "react";

interface CommonCarouselHeaderProp {
  title: string;
  span?: { text: string; code?: string; mark?: string }[];
  headClass?: string;
  icon?: ReactNode;
  tagClass?: string;
  children?: ReactNode;
}

const CommonCarouselHeader: React.FC<CommonCarouselHeaderProp> = ({
  title,
  span,
  headClass,
  icon,
  tagClass,
  children,
}) => {
  return (
    <>
      <CardHeader className={headClass ? headClass : ""}>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
          <h4 className={tagClass ? tagClass : ""}>
            {icon && icon} {title}
          </h4>
          {/* Render the children (button or other elements) here */}
          {children && <div>{children}</div>}
        </div>
        {span && (
          <p className="f-m-light mt-1">
            {span.map((data, index) => (
              <Fragment key={index}>
                {data?.text} {data.code && <code>{data.code}</code>}
                {data.mark && <mark>{data.mark}</mark>}
              </Fragment>
            ))}
          </p>
        )}
      </CardHeader>
    </>
  );
};

export default CommonCarouselHeader;
