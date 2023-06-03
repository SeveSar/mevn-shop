export type TFilterItem = {
  title: string;
  parent: string;
  id: string;
};

export interface IFilter {
  title: string;
  items: TFilterItem[];
  id: string;
}
