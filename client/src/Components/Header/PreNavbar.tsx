import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { contactInfo, socialLinks } from "@/staticData/preNavbar";

const PreNavbar = () => {
  return (
    <div className="pre-header">
      <div className="row">
        <div className="col-12 col-lg-6">
          {contactInfo.map((item, index) => (
            <a key={index} href={item.href}>
              <Image
                src={item.src}
                width="18"
                height="18"
                alt={item.alt}
                title={item.title}
              />
              <span>{item.text}</span>
            </a>
          ))}
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-end">
          <div>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                prefetch={false}
                href={link.href}
                target="_blank"
              >
                <i className={link.iconClass}></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreNavbar;
