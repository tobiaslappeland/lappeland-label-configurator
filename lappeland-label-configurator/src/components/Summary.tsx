import React, { useMemo } from 'react';
import { useStore } from './useStore';
import { priceForQty } from '@/utils';

export function Summary() {
  const { state, actions } = useStore();
  const { packSizes, currency } = state.config;
  const totalAllocated = state.designs.reduce((sum, d) => sum + d.count, 0);
  const price = useMemo(() => priceForQty(packSizes, state.selectedPackQty), [packSizes, state.selectedPackQty]);

  return (
    <div className=\"ll-summary\">
      <div className=\"ll-field\">
        <label>Velg pakke</label>
        <div className=\"ll-packs\">
          {packSizes.map((p) => (
            <button key={p.qty} className={state.selectedPackQty === p.qty ? 'selected' : ''} onClick={() => actions.setPackQty(p.qty)}>
              {p.qty} stk – {p.price} {currency}
            </button>
          ))}
        </div>
      </div>

      <div className=\"ll-info\">
        <div>Fordelt: {totalAllocated} / {state.selectedPackQty ?? 0} stk</div>
        <div>Pris: {price != null ? `${price} ${currency}` : '—'}</div>
      </div>

      <button disabled={!state.selectedPackQty || totalAllocated !== (state.selectedPackQty ?? 0)} onClick={() => window.dispatchEvent(new CustomEvent('ll:add-to-cart'))}>
        Legg i handlekurv
      </button>
      {state.selectedPackQty && totalAllocated !== state.selectedPackQty && (
        <small className=\"warn\">Fordel alle etikettene før du fortsetter.</small>
      )}
    </div>
  );
}
