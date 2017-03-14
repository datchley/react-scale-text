/**
 * @file utils.js
 * @description DOM utility functions
 */
import values from 'lodash/values';

// Camelcase a dashed string, ie do-thing => doThing
export const camelize = (str) =>
  str.replace(/\-(\w)/g, (s, letter) => letter.toUpperCase());

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

// Detect if child overflows parent either veritcally or horizontally
// for chilcdren that are absolutely positioned
export const getOverflow = (parent, child) => {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  return {
    vertical: (parentRect.bottom < childRect.bottom) ||
      (parentRect.top > childRect.top),
    horizontal: (parentRect.right < childRect.right) ||
      (parentRect.left > child.left)
  };
};

// Wrapper for checking for 'any' overflow of parent by child
export const hasOverflow = (parent, child) => {
  if (getStyle(child, 'position') === 'absolute') {
    return values(getOverflow(parent, child)).some(v => v);
  }
  return (parent.clientWidth < parent.scrollWidth || parent.clientHeight < parent.scrollHeight);
};
