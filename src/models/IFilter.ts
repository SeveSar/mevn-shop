import type { TFilterItemResponse } from "@/api/types/responses/IFilterResponse";

export type TFilterItem = TFilterItemResponse & {
  id: string;
};
