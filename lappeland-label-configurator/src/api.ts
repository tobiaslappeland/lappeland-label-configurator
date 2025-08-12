import type { Background, Icon, Config, Design } from './types';

export async function fetchBackgrounds(endpoint?: string, nonce?: string): Promise<Background[]> {
  if (!endpoint) return [];
  const res = await fetch(endpoint, { headers: nonce ? { 'X-WP-Nonce': nonce } : {} });
  if (!res.ok) throw new Error('Failed to load backgrounds');
  return res.json();
}

export async function fetchIcons(endpoint?: string, nonce?: string): Promise<Icon[]> {
  if (!endpoint) return [];
  const res = await fetch(endpoint, { headers: nonce ? { 'X-WP-Nonce': nonce } : {} });
  if (!res.ok) throw new Error('Failed to load icons');
  return res.json();
}

export async function addToCart(config: Config, designs: Design[], selectedQty: number) {
  if (config.addToCartEndpoint) {
    const res = await fetch(config.addToCartEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.wpNonce ? { 'X-WP-Nonce': config.wpNonce } : {})
      },
      body: JSON.stringify({
        product_id: config.productId,
        pack_qty: selectedQty,
        designs
      })
    });
    if (!res.ok) throw new Error('Kunne ikke legge i handlekurv');
    return res.json();
  }

  const payload = encodeURIComponent(JSON.stringify({ pack_qty: selectedQty, designs }));
  window.location.href = `/?add-to-cart=${config.productId}&ll_payload=${payload}`;
}
