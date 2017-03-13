/**
 * @file utils.js
 * @description DOM utility functions
 */
import values from 'lodash/values';

// Camelcase a dashed string, ie do-thing => doThing
const camelize = (str) =>
  str.replace(/\-(\w)/g, (s, letter) => letter.toUpperCase());

// Detect if child overflows parent either veritcally or horizontally
export const getOverflow = (parent, child) => {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  return {
    vertical: (parentRect.bottom < childRect.bottom) ||
      (parentRect.top > childRect.top) ||
      (child.scrollHeight > child.offsetHeight
    ),
    horizontal: (parentRect.right < childRect.right) ||
      (parentRect.left > child.left) ||
      (child.scrollWidth > child.offsetWidth)
  };
};

// Wrapper for checking for 'any' overflow of parent by child
export const hasOverflow = (parent, child) =>
  values(getOverflow(parent, child)).some(v => v);

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
