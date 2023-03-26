export type TFilterItem = {
  title: string;
  parent: string;
  _id: string;
};

export interface IFilter {
  title: string;
  items: TFilterItem[];
  _id: string;
}
