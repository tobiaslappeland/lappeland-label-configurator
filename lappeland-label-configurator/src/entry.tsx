import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import type { Config } from './types';

(function mount() {
  const el = document.querySelector('#lappeland-label-app');
  if (!el) return;

  const cfg: Config = {
    productId: Number(el.getAttribute('data-product-id') || '0'),
    currency: el.getAttribute('data-currency') || 'NOK',
    maxLines: 3,
    maxCharsPerLine: Number(el.getAttribute('data-max-chars') || '17'),
    labelSize: { widthMm: 30, heightMm: 13 },
    packSizes: JSON.parse(el.getAttribute('data-pack-sizes') || '[{"qty":130,"price":179},{"qty":195,"price":199},{"qty":330,"price":249}]'),
    backgroundsEndpoint: el.getAttribute('data-backgrounds-endpoint') || undefined,
    iconsEndpoint: el.getAttribute('data-icons-endpoint') || undefined,
    addToCartEndpoint: el.getAttribute('data-add-to-cart-endpoint') || undefined,
    wpNonce: (window as any)?._llNonce || undefined
  };

  const root = ReactDOM.createRoot(el as HTMLElement);
  root.render(<App config={cfg} />);
})();
