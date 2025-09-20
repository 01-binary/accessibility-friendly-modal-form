// Z-index management
let zIndexCounter = 1000;

export const getNextZIndex = (): number => ++zIndexCounter;

export const resetZIndex = (): void => {
  zIndexCounter = 1000;
};

export const getCurrentZIndex = (): number => zIndexCounter;