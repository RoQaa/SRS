export enum MediaType {
  Image = "image",
  Video = "video",
}

export interface IMedia {
  _id?: string;
  title: string;
  title_ar?: string;
  published: boolean;
  type: MediaType;
  thumbnail?: string; 
  fullImage?: string; 
  video?: string;
}
