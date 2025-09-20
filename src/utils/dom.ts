// SSR safe check
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

import { useEffect, useLayoutEffect } from 'react';

// Custom hooks for SSR safety
export const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

// Check if we're in development mode
export const isDev = () => {
  return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
};