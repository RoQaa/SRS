import { Document } from "mongoose";

export interface INews extends Document {
  _id: string;
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  images: string[]; 
  published?: boolean;
  // ar
  title_ar: string;
  description_ar: string;
  author: string;
  slug: string;
  slug_ar: string;
}