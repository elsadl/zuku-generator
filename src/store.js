import { writable } from 'svelte/store';

export const gridSize = writable({
    cols: 10,
    rows: 10,
  });

export const gridComposition = writable([]);

export const colors = writable([]);
