import { MenuItem } from "@/Types/LayoutTypes";

export const MenuList: MenuItem[] | undefined = [
  // Over view
  {
    title: "Over View",
    lanClass: "lan-1",
    menucontent: "Dashboard",
    Items: [
      {
        title: "Dashboard",
        id: 1,
        icon: "widget",
        type: "link",
        lanClass: "lan-1",
        active: false,
        path: "/dashboard",
      },
    ],
  },
  // Content-Management
  {
    title: "Content Management",
    lanClass: "lan-2",
    menucontent: "Content,Management",
    Items: [
      {
        title: "Home",
        id: 20,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        active: false,
        children: [
          {
            title: "Carousels",
            type: "sub",
            children: [
              {
                path: "/dashboard/edit-home/main-carousels",
                title: "Main Carousel",
                type: "link",
              },
              {
                path: "/dashboard/edit-home/clients-carousel",
                title: "Clients Carousel",
                type: "link",
              },
            ],
          },
          {
            path: "/dashboard/edit-home/counter",
            title: "Counter",
            type: "link",
          },
          {
            path: "/dashboard/edit-home/values",
            title: "Values",
            type: "link",
          },
          {
            path: "/dashboard/edit-home/middle-section",
            title: "Middle Section",
            type: "link",
          },
        ],
      },
      {
        title: "News",
        id: 3,
        icon: "blog",
        type: "sub",
        lanClass: "lan-3",
        active: false,
        children: [
          { path: "/dashboard/news/", title: "All News", type: "link" },
          {
            path: "/dashboard/news/add",
            title: "Add News",
            type: "link",
          },
        ],
      },
      {
        title: "Media",
        id: 5,
        icon: "gallery",
        type: "sub",
        lanClass: "lan-5",
        active: false,
        children: [
          {
            title: "Videos",
            type: "sub",
            children: [
              {
                path: "/dashboard/media/videos",
                title: "All Videos",
                type: "link",
              },
              {
                path: "/dashboard/media/videos/add",
                title: "Add Video",
                type: "link",
              },
            ],
          },
          {
            title: "Images",
            type: "sub",
            children: [
              {
                path: "/dashboard/media/images",
                title: "All Images",
                type: "link",
              },
              {
                path: "/dashboard/media/images/add",
                title: "Add Image",
                type: "link",
              },
            ],
          },
        ],
      },
      {
        title: "Scopes",
        id: 6,
        icon: "file",
        type: "usb",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/dashboard/edit-scope",
            title: "Scopes",
            type: "link",
          },
          {
            path: "/dashboard/edit-scope/add",
            title: "Add Scope",
            type: "link",
          },
        ],
      },
      {
        title: "Products",
        id: 7,
        icon: "ecommerce",
        type: "sub",
        lanClass: "lan-7",
        active: false,
        children: [
          {
            path: "/dashboard/products/",
            title: "Products",
            type: "link",
          },
          {
            path: "/dashboard/products/add",
            title: "Add Product",
            type: "link",
          },
        ],
      },
      {
        title: "Projects",
        id: 8,
        icon: "project",
        type: "sub",
        lanClass: "lan-8",
        active: false,
        children: [
          {
            path: "/dashboard/projects",
            title: "Projects",
            type: "link",
          },
          {
            path: "/dashboard/projects/add",
            title: "Add Project",
            type: "link",
          },
        ],
      },
    ],
  },
  // User Management
  {
    title: "Users",
    menucontent: "users",
    Items: [
      {
        title: "Users",
        id: 11,
        icon: "user",
        type: "link",
        active: false,
        path: "/dashboard/users",
      },
    ],
  },
  // SEO
  {
    title: "SEO",
    menucontent: "seo",
    Items: [
      {
        title: "SEOs",
        id: 27,
        icon: "button",
        type: "link",
        active: false,
        path: "/dashboard/seo",
      },
    ],
  },
];
