import React from 'react';
import type { Design, Background, Icon, FontOption, Config } from '@/types';
import { mmToPx } from '@/utils';
import { clsx } from 'clsx';

export function Preview({ design, backgrounds, icons, fonts, config }: {
  design: Design;
  backgrounds: Background[];
  icons: Icon[];
  fonts: FontOption[];
  config: Config;
}) {
  const bg = backgrounds.find((b) => b.id === design.backgroundId);
  const icon = icons.find((i) => i.id === design.iconId);
  const font = fonts.find((f) => f.id === design.fontId);

  const w = mmToPx(config.labelSize.widthMm, 96);
  const h = mmToPx(config.labelSize.heightMm, 96);

  const base = Math.max(10, Math.floor(h * 0.35));
  const lineHeights = [1, 0.9, 0.85];

  return (
    <div className=\"ll-preview\" style={{ width: w, height: h }} aria-label=\"Forhåndsvisning\">
      {bg ? (
        <img src={bg.imageUrl} alt={bg.name} className=\"ll-bg\" />
      ) : (
        <div className=\"ll-bg-placeholder\" />
      )}
      {icon && <img src={icon.imageUrl} alt=\"Ikon\" className=\"ll-icon\" />}
      <div className=\"ll-text\" style={{ fontFamily: font?.css, color: design.textColor }}>
        {design.lines.map((line, idx) => (
          <div key={idx} className={clsx('ll-line', { hidden: !line })} style={{ fontSize: base * lineHeights[idx] }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
