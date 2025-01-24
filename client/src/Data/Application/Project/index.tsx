import { IProject } from "@/interfaces/Project.interface";

export const ProjectListData = [
  {
    id: 1,
    title: "Endless admin Design",
    badge: "Doing",
    image: "3.jpg",
    sites: "Themeforest, australia",
    description:
      "Endless Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "12",
    resolved: "5",
    comment: "7",
    like: "10",
    progress: 70,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "70%",
  },
  {
    id: 2,
    title: "Universal admin Design",
    badge: "Done",
    image: "3.jpg",
    sites: "Envato, australia",
    description:
      "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "100%",
  },
  {
    id: 3,
    title: "Poco admin Design",
    badge: "Done",
    image: "3.jpg",
    sites: "Envato, australia",
    description:
      "Universal Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "100%",
  },
  {
    id: 4,
    title: "Universal admin Design",
    badge: "Done",
    image: "3.jpg",
    sites: "Envato, australia",
    description:
      "Poco Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "24",
    resolved: "24",
    comment: "40",
    like: "3",
    progress: 100,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "100%",
  },
  {
    id: 5,
    title: "Endless admin Design",
    badge: "Doing",
    image: "3.jpg",
    sites: "Themeforest, australia",
    description:
      "Xolo Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "12",
    resolved: "5",
    comment: "7",
    like: "10",
    progress: 70,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "70%",
  },
  {
    id: 6,
    title: "Poco admin Design",
    badge: "Done",
    image: "6.jpg",
    sites: "Envato, australia",
    description:
      "Zeta Admin is a full featured, multipurpose, premium bootstrap admin template.",
    issue: "40",
    resolved: "40",
    comment: "20",
    like: "2",
    progress: 100,
    customers_img1: "3.jpg",
    customers_img2: "5.jpg",
    customers_img3: "1.jpg",
    projectLevel: "100%",
  },
];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NewProjectInitialValue: IProject = {
  title: "",
  description: "",
  client: "",
  location: "",
  startDate: new Date(),
  endDate: new Date(), // current date + 1 day
  images: [],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  category: "",
  status: "pending",
  published: false,
  projectProgress: 0,
  title_ar: "",
  description_ar: "",
  client_ar: "",
  location_ar: "",
  createdAt: ""
};

// // @ts-ignore
// export const NewProductInitialValue: IProduct = {

// };
