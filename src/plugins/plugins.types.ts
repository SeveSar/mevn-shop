export interface IToast {
  id: number;
  text: string;
  type: TypeToast;
}

export type TypeToast = "error" | "info";
