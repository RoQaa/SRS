export const MenuItems = [
  {
    title: "home",
    link: "/",
  },
  {
    title: "about_us",
    link: "/about",
  },
  {
    title: "products",
    link: "/products",
    dropdown: [
      {
        title: "steel_structure",
        link: "/products/steel-structure",
      },
      {
        title: "semi_trailers",
        link: "#",
      },
      {
        title: "transmission_towers",
        link: "#",
      },
      {
        title: "plate_work",
        link: "#",
        subDropdown: [
          {
            title: "piping_and_fittings",
            link: "#",
          },
          {
            title: "semi_trailers",
            link: "#",
          },
        ],
      },
      {
        title: "electromechanical",
        link: "#",
      },
    ],
  },
  {
    title: "projects",
    link: "/projects",
  },
  {
    title: "scope_of_work",
    link: "/our-scopes",
    dropdown: [
      {
        title: "design_detailing",
        link: "/our-scopes/design-detailing",
      },
      {
        title: "project_management",
        link: "#",
      },
      {
        title: "supply_chain",
        link: "#",
      },
    ],
  },
  {
    title: "media",
    link: "/media",
    dropdown: [
      {
        title: "video_gallery",
        link: "/media/video-gallery",
      },
    ],
  },
  {
    title: "accreditations",
    link: "/accreditations",
  },
  {
    title: "news",
    link: "/news",
  },
  {
    title: "contact_us",
    link: "/contact-us",
  },
];
