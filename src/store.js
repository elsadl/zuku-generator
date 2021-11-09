import { writable } from 'svelte/store';

export const gridSize = writable({
    cols: 4,
    rows: 4,
  });

export const gridComposition = writable([]);

export const colors = writable([]);
