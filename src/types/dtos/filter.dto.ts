import { IFilterResponse } from '@/types/responses/filter';
import { TFilterItem } from '../IFilter';

export class FilterDTO {
  title: string;
  items: TFilterItem[];
  id: string;
  constructor(filter: IFilterResponse) {
    this.title = filter.title;
    this.id = filter._id;
    this.items = filter.items.map((item) => {
      return {
        id: item._id,
        title: item.title,
        parent: item.parent,
      };
    });
  }
}
