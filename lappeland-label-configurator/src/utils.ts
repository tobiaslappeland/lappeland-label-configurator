export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function mmToPx(mm: number, dpi = 300) {
  return Math.round((mm / 25.4) * dpi);
}

export function priceForQty(pack: { qty: number; price: number }[], qty: number | null): number | null {
  if (!qty) return null;
  const found = pack.find((p) => p.qty === qty);
  return found ? found.price : null;
}
