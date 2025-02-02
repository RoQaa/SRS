import { Document } from "mongoose";

export interface IMainCarousel extends Document {
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  image: string;
  link: string;
  published: boolean;
}
