export type TMaskKeys = keyof typeof masks;

const masks = {
  phone: {
    mask: '+{7} (000) 000-00-00',
    lazy: false,
  },
};

export function getMask(key: TMaskKeys) {
  return masks[key];
}
