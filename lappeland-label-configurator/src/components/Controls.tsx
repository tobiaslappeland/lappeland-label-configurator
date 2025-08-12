import React from 'react';
import { useStore } from './useStore';
import type { Background, Icon, FontOption } from '@/types';
import { clamp } from '@/utils';

export function Controls() {
  const { state, actions } = useStore();
  const d = state.designs[state.activeIndex];
  if (!d) return null;

  const setLine = (i: 0 | 1 | 2, val: string) => {
    const max = state.config.maxCharsPerLine;
    const nextLines = [...d.lines] as [string, string?, string?];
    nextLines[i] = val.slice(0, max);
    actions.updateDesign(d.id, { lines: nextLines });
  };

  return (
    <div className=\"ll-controls\">
      <div className=\"ll-field\">
        <label>Linje 1</label>
        <input value={d.lines[0] ?? ''} onChange={(e) => setLine(0, e.target.value)} maxLength={state.config.maxCharsPerLine} />
      </div>
      <div className=\"ll-field\">
        <label>Linje 2</label>
        <input value={d.lines[1] ?? ''} onChange={(e) => setLine(1, e.target.value)} maxLength={state.config.maxCharsPerLine} />
      </div>
      <div className=\"ll-field\">
        <label>Linje 3</label>
        <input value={d.lines[2] ?? ''} onChange={(e) => setLine(2, e.target.value)} maxLength={state.config.maxCharsPerLine} />
      </div>

      <div className=\"ll-grid\">
        <Picker label=\"Bakgrunn\" items={state.backgrounds} selectedId={d.backgroundId} onChange={(id) => actions.updateDesign(d.id, { backgroundId: id })} />
        <Picker label=\"Motiv\" items={state.icons} selectedId={d.iconId} onChange={(id) => actions.updateDesign(d.id, { iconId: id })} />
      </div>

      <div className=\"ll-row\">
        <FontPicker fonts={state.fonts} value={d.fontId} onChange={(fontId) => actions.updateDesign(d.id, { fontId })} />
        <div className=\"ll-field\">
          <label>Tekstfarge</label>
          <input type=\"color\" value={d.textColor} onChange={(e) => actions.updateDesign(d.id, { textColor: e.target.value })} />
        </div>
      </div>

      <div className=\"ll-field\">
        <label>Antall i dette designet</label>
        <input type=\"number\" min={0} step={5} value={d.count} onChange={(e) => actions.updateDesign(d.id, { count: clamp(parseInt(e.target.value || '0', 10), 0, 1000) })} />
        <small>Du kan fordele totalpakken mellom opptil 4 design.</small>
      </div>

      <div className=\"ll-actions\">
        <button onClick={() => actions.addDesign()}>Legg til nytt design</button>
        {state.designs.length > 1 && <button className=\"danger\" onClick={() => actions.removeDesign(d.id)}>Slett dette designet</button>}
      </div>
    </div>
  );
}

function Picker({ label, items, selectedId, onChange }: {
  label: string;
  items: (Background | Icon)[];
  selectedId: string | null;
  onChange: (id: string | null) => void;
}) {
  return (
    <div className=\"ll-field\">
      <label>{label}</label>
      <div className=\"ll-picker\">
        {items.map((it) => (
          <button key={it.id} className={selectedId === it.id ? 'selected' : ''} onClick={() => onChange(it.id)}>
            <img src={it.imageUrl} alt={it.name} />
            <span>{it.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FontPicker({ fonts, value, onChange }: { fonts: FontOption[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className=\"ll-field\">
      <label>Skrifttype</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {fonts.map((f) => (
          <option key={f.id} value={f.id} style={{ fontFamily: f.css }}>
            {f.name}
          </option>
        ))}
      </select>
    </div>
  );
}
