export interface TFilterItemResponse {
  title: string
  parent: string
  _id: string
}

export interface IFilterResponse {
  title: string
  items: TFilterItemResponse[]
  _id: string
}
