import { Branch } from "@/interfaces/Contact.interface";
import { useLocale } from "next-intl";

interface MapInfoProps {
  locations: Branch[];
}

const MapInfo: React.FC<MapInfoProps> = ({ locations }) => {
  const locale = useLocale();
  return (
    <>
      <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
        {locations.length > 0 &&
          locations.map((location, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <a
                className={`nav-link ${index === 0 ? "active" : ""}`}
                id={`ex1-tab-${index + 1}`}
                data-bs-toggle="tab"
                href={`#ex1-tabs-${index + 1}`}
                role="tab"
                aria-controls={`ex1-tabs-${index + 1}`}
                aria-selected={index === 0}
              >
                {locale === "en" ? location.name : location.name_ar}
              </a>
            </li>
          ))}
      </ul>
      <div className="tab-content" id="ex1-content">
        {locations.length > 0 &&
          locations.map((location, index) => (
            <div
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
              id={`ex1-tabs-${index + 1}`}
              role="tabpanel"
              aria-labelledby={`ex1-tab-${index + 1}`}
              key={index}
            >
              <iframe
                src={location.mapSrc}
                width="100%"
                height="350"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p>{locale === "en" ? location.address : location.address_ar}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default MapInfo;
