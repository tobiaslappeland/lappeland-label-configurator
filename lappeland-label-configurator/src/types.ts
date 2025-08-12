export type Background = {
  id: string;
  name: string;
  imageUrl: string;
};

export type Icon = {
  id: string;
  name: string;
  imageUrl: string;
};

export type FontOption = {
  id: string;
  name: string;
  css: string;
};

export type Design = {
  id: string;
  lines: [string, string?, string?];
  backgroundId: string | null;
  iconId: string | null;
  fontId: string;
  textColor: string;
  count: number;
};

export type Config = {
  productId: number;
  currency: string;
  maxLines: 3;
  maxCharsPerLine: number;
  labelSize: { widthMm: number; heightMm: number };
  packSizes: { qty: number; price: number }[];
  backgroundsEndpoint?: string;
  iconsEndpoint?: string;
  addToCartEndpoint?: string;
  wpNonce?: string;
};
