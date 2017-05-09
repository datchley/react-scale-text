/**
 * @file utils.js
 * @description DOM utility functions
 */

// Simple way to generate a unique id
let id = 0;
export const uniqId = () => `uid-${Date.now()}-${id++}`;

// Camelcase a dashed string, ie do-thing => doThing
export const camelize = str =>
  str.replace(/-(\w)/g, (s, letter) => letter.toUpperCase());

/* eslint-disable no-param-reassign, guard-for-in, no-restricted-syntax */
// Set multiple css properties on an element `el` by
// passing in a `style` object that defines what properties
// to set and their value
export const css = (el, styles) => {
  for (const property in styles) {
    el.style[property] = styles[property];
  }
};
/* eslint-enable no-param-reassign, guard-for-in, no-restricted-syntax */


// Get the current style property value for the given element
export function getStyle(el, styleProp) {
  if (el.currentStyle) {
    return el.currentStyle[camelize(styleProp)];
  }
  else if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView
      .getComputedStyle(el, null)
      .getPropertyValue(styleProp);
  }
  return el.style[camelize(styleProp)];
}

export function getOverflow(el) {
  return [
    el.clientWidth < el.scrollWidth,
    el.clientHeight < el.scrollHeight
  ];
}

export const hasOverflow = el => getOverflow(el).some(v => v === true);

