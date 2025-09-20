// Focus trap utilities
export const FOCUSABLE_ELEMENT_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input[type="text"]:not([disabled])',
  'input[type="radio"]:not([disabled])',
  'input[type="checkbox"]:not([disabled])',
  'input[type="submit"]:not([disabled])',
  'input[type="button"]:not([disabled])',
  'input[type="email"]:not([disabled])',
  'input[type="password"]:not([disabled])',
  'input[type="tel"]:not([disabled])',
  'input[type="url"]:not([disabled])',
  'input[type="search"]:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

// Get all focusable elements within a container
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
  ) as HTMLElement[];
};

// Get the first focusable element in a container
export const getFirstFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
};

// Get the last focusable element in a container
export const getLastFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
};

// Check if an element is currently focused
export const isElementFocused = (element: HTMLElement): boolean => {
  return document.activeElement === element;
};

// Focus an element with optional auto-focus selector
export const focusElement = (container: HTMLElement, autoFocusSelector = '[data-autofocus]'): void => {
  const autoFocusElement = container.querySelector(autoFocusSelector) as HTMLElement;
  if (autoFocusElement) {
    autoFocusElement.focus();
    return;
  }

  const firstFocusable = getFirstFocusableElement(container);
  firstFocusable?.focus();
};