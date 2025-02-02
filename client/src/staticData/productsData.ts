
interface Product {
  imgSrc: string;
  title: string;
  description: string;
  btnLink: string;
  btnText: string;
}

interface Project {
  title: string;
  description: string;
  imgSrc: string;
  btnText: string;
  btnLink: string;
}
export const products: Product[] = [
  {
    imgSrc: "/imgs/products/p1.png",
    title: "STEEL STRUCTURE",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
    btnLink: "#",
    btnText: "Learn More",
  },
  {
    imgSrc: "/imgs/products/p2.png",
    title: "SEMI-TRAILERS",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
    btnLink: "#",
    btnText: "Learn More",
  },
  {
    imgSrc: "/imgs/products/p3.png",
    title: "TRANSMISSION TOWERS",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
    btnLink: "#",
    btnText: "Learn More",
  },
  {
    imgSrc: "/imgs/products/p4.png",
    title: "PLATE WORK",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
    btnLink: "#",
    btnText: "Learn More",
  },
  {
    imgSrc: "/imgs/products/p5.png",
    title: "ELECTROMECHANICAL",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
    btnLink: "#",
    btnText: "Learn More",
  },
];

export const project: Project = {
  title: "OUR PROJECTS",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores.",
  imgSrc: "/imgs/project-box.jpg",
  btnText: "Learn More",
  btnLink: "#",
};