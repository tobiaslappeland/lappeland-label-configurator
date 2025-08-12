import { create } from 'zustand';
import { Background, Icon, FontOption, Design, Config } from './types';

export type State = {
  config: Config;
  backgrounds: Background[];
  icons: Icon[];
  fonts: FontOption[];
  designs: Design[];
  activeIndex: number;
  selectedPackQty: number | null;
};

export type Actions = {
  setBackgrounds: (b: Background[]) => void;
  setIcons: (i: Icon[]) => void;
  setFonts: (f: FontOption[]) => void;
  addDesign: () => void;
  removeDesign: (id: string) => void;
  updateDesign: (id: string, patch: Partial<Design>) => void;
  setActiveIndex: (idx: number) => void;
  setPackQty: (qty: number) => void;
};

export const makeId = () => Math.random().toString(36).slice(2, 10);

export const createStore = (config: Config) =>
  create<State & Actions>((set, get) => ({
    config,
    backgrounds: [],
    icons: [],
    fonts: [
      { id: 'rounded', name: 'Rounded', css: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
      { id: 'hand', name: 'Handwritten', css: '"Comic Sans MS", "Comic Sans", cursive' },
      { id: 'serif', name: 'Serif', css: 'Georgia, "Times New Roman", serif' }
    ],
    designs: [
      {
        id: makeId(),
        lines: ['Navn', 'Telefon', 'Klasse'],
        backgroundId: null,
        iconId: null,
        fontId: 'rounded',
        textColor: '#000000',
        count: 0
      }
    ],
    activeIndex: 0,
    selectedPackQty: null,

    setBackgrounds: (b) => set({ backgrounds: b }),
    setIcons: (i) => set({ icons: i }),
    setFonts: (f) => set({ fonts: f }),

    addDesign: () => set((s) => ({
      designs: [
        ...s.designs,
        {
          id: makeId(),
          lines: ['Navn', '', ''],
          backgroundId: s.designs[s.activeIndex]?.backgroundId ?? null,
          iconId: s.designs[s.activeIndex]?.iconId ?? null,
          fontId: s.designs[s.activeIndex]?.fontId ?? 'rounded',
          textColor: s.designs[s.activeIndex]?.textColor ?? '#000000',
          count: 0
        }
      ],
      activeIndex: s.designs.length
    })),

    removeDesign: (id) => set((s) => ({ designs: s.designs.filter((d) => d.id !== id), activeIndex: 0 })),

    updateDesign: (id, patch) => set((s) => ({
      designs: s.designs.map((d) => (d.id === id ? { ...d, ...patch } : d))
    })),

    setActiveIndex: (idx) => set({ activeIndex: idx }),
    setPackQty: (qty) => set({ selectedPackQty: qty })
  }));
