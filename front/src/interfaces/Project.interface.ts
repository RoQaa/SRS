import { IProduct } from "./Products.interface";

export interface IProject {
  name: string | undefined;
  createdAt: string | number | Date;
  _id?: string,
  title: string;
  description: string;
  client: string;
  location: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  category?: IProduct;
  status: "pending" | "in progress" | "completed"; // Enum for status
  published: boolean;
  projectProgress: number; // 0 to 100
  title_ar?: string;
  description_ar?: string;
  client_ar?: string;
  location_ar?: string;
  slug?: string;
  slug_ar?: string;
}
