interface SingleItem {
  // scopes
  scope?: {
    service?: string;
    service_ar?: string;
    details?: string;
    details_ar?: string;
    // features?: string[];
  };
  // projects
  project?: {
    title?: string;
    title_ar?: string;
    description?: string;
    description_ar?: string;
  };
  // product
  product?: {
    name: string;
    name_ar: string;
    description: string;
    description_ar: string;
  };
}

interface SingleItemDetailsProps {
  item: SingleItem;
  locale: string;
}

const SingleItemDetails: React.FC<SingleItemDetailsProps> = ({
  item,
  locale,
}) => {
  const currentLocale = locale || "en";
  const project = item?.project ? item?.project : "";
  const product = item?.product ? item?.product : "";
  const scope = item?.scope ? item?.scope : "";

  const itemTitle = project
    ? project?.title
    : product
    ? product?.name
    : scope
    ? scope?.service
    : "";
  const itemTitle_ar = project
    ? project?.title_ar
    : product
    ? product?.name_ar
    : scope
    ? scope?.service_ar
    : "";
  const itemDescription = project
    ? project?.description
    : product
    ? product?.description
    : scope
    ? scope?.details
    : "";
  const itemDescription_ar = project
    ? project?.description_ar
    : product
    ? product.description_ar
    : scope
    ? scope?.details_ar
    : "";

  return (
    <div className="pr-steel-txt">
      <h2>{item && currentLocale === "en" ? itemTitle : itemTitle_ar}</h2>
      <p>
        {item && currentLocale === "en" ? itemDescription : itemDescription_ar}
      </p>
      {/* <ul>
        {item?.features &&
          item?.features.map((detail, idx) => <li key={idx}>{detail}</li>)}
      </ul> */}
    </div>
  );
};

export default SingleItemDetails;
