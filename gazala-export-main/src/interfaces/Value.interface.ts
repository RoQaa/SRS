export interface IValue {
  _id?: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  link: string;
  images: {
    main: string;
    rotate: string;
  };
  published: boolean;
}
