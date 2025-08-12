import React from 'react';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import { Summary } from './components/Summary';
import { useStore, StoreProvider } from './components/useStore';
import type { Config } from './types';
import './styles.css';

function Inner() {
  const { state } = useStore();
  const d = state.designs[state.activeIndex];
  return (
    <div className=\"ll-wrap\">
      <div className=\"ll-left\">
        <Preview design={d} backgrounds={state.backgrounds} icons={state.icons} fonts={state.fonts} config={state.config} />
      </div>
      <div className=\"ll-right\">
        <Controls />
        <Summary />
      </div>
    </div>
  );
}

export default function App({ config }: { config: Config }) {
  return (
    <StoreProvider config={config}>
      <Inner />
    </StoreProvider>
  );
}
