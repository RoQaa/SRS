import { Document } from "mongoose";

export interface IVisitorTransaction extends Document {
  visitorId?: string;
  ipAddress?: string;
  visitDate?: Date;
  pageVisited?: string;
  actions: {
    actionType: string;
    actionTime: Date;
  }[];
  userAgent: string;
  referrer: string;
  //// more
  pageUrl?: string;
  visitDuration?: number;
  transactionType?: "visit" | "click" | "formSubmit";
  pagesVisited?: string[];
  timestamp?: Date;
}
