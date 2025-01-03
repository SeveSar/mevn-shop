const mask = {
  phone: {
    lazy: false,
    mask: '+{7} (000) 000-00-00',
  },
  date: {
    lazy: false,
    mask: '00.00.0000 00:00',
  },
  number: {
    mask: Number,
  },
} as const;

export type TMaskKeys = keyof typeof mask;

export function getMask(key: TMaskKeys) {
  return mask[key];
}
