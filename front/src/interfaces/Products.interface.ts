import { ObjectId } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  parentProductId?: ObjectId | null;
  thumbnail: string;
  images: string[];
  published: boolean;
  slug: string;
  slug_ar: string;
}
