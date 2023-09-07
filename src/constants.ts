export const ORDER_STATUS = {
  PROCESSED: 'PROCESSED',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const;

export const ORDER_STATUS_MAP: Record<TOrderStatus, string> = {
  PROCESSED: 'Обрабатывается',
  DONE: 'Выполнен',
  CANCELED: 'Отменен',
} as const;

export const ORDER_TYPE_DELIVERY = {
  ADDRESS: 'ADDRESS',
  RESTAURANT: 'RESTAURANT',
} as const;

export const ORDER_TYPE_TIMING = {
  URGENT: 'URGENT',
  DATE: 'DATE',
} as const;

export const ORDER_PAYMENT = {
  CASH: 'CASH',
  CARD: 'CARD',
  APPLE: 'APPLE',
} as const;

export const ORDER_PAYMENT_MAP: Record<TOrderPayment, string> = {
  CASH: 'Наличкой',
  CARD: 'Картой',
  APPLE: 'ApplePay',
} as const;

export type TOrderPayment = (typeof ORDER_PAYMENT)[keyof typeof ORDER_PAYMENT];
export type TOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type TOrderTypeDelivery = (typeof ORDER_TYPE_DELIVERY)[keyof typeof ORDER_TYPE_DELIVERY];
export type TOrderTypeTiming = (typeof ORDER_TYPE_TIMING)[keyof typeof ORDER_TYPE_TIMING];
