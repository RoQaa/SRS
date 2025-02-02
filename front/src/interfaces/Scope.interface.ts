import { Document } from "mongoose";

export interface IScope extends Document {
  service: string;
  service_ar: string;
  details: string;
  details_ar: string;
  iconImg: string;
  mainImg: string;
  slug: string;
  slug_ar: string;
  published: boolean;
}
