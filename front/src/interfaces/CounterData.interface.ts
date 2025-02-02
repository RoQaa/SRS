export interface ICounterData {
  _id?: string;
  image: string;
  counters: ICounterValues[];
}
export interface ICounterValues {
  value: number;
  label: string;
  label_ar: string;
}
