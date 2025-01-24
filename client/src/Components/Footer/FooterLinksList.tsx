interface Link {
  href: string;
  label: string;
  icon?: string;
}

interface FooterLinksListProps {
  links: Link[];
  isSocial?: boolean;
}

const FooterLinksList: React.FC<FooterLinksListProps> = ({
  links,
  isSocial = false,
}) => {

  return (
    <ul
      className={isSocial ? "social-links" : "fotter-links mt-4"}
      style={{ marginTop: "32px" }}
    >
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            {isSocial ? (
              <i className={link?.icon}></i>
            ) : (
              link?.icon && <i className={link?.icon + " " + "ms-2"}></i>
            )}
            {!isSocial && link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinksList;
