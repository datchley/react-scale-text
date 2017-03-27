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

// generate a ref function for components
// allows us to externalize this and mock it for unit testing
/* eslint-disable no-param-reassign */
export const setRef = (name, context) => (c) => { context[name] = c; };
/* eslint-enable no-param-reassign */

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

/* eslint-disable no-param-reassign */
// Determine the font-size to set on the element `el` that will
// allow the first child of that element to fill the maximum height
// and width without causing overflow
export function getFillSize(el, minFontSize, maxFontSize, factor = 1) {
  // Make an initial guess at font-size that fits width
  let fontSize = Math.min(
    Math.max(
      Math.min(Number(el.offsetWidth) / (factor * 10), maxFontSize),
      minFontSize
    )
  );

  const step = 1;
  let complete;

  while (!complete) {
    el.style.fontSize = `${fontSize}px`;
    const wrap = el.getBoundingClientRect();
    const child = el.firstChild.getBoundingClientRect();

    const overflowHeight = ((wrap.top > child.top) || (wrap.bottom < child.bottom));
    const overflowWidth = ((wrap.left > child.left) || (wrap.right < child.right));

    if (overflowHeight || overflowWidth) {
      if (fontSize <= minFontSize) {
        fontSize = minFontSize;
        complete = true;
      }
      else {
        fontSize -= step;
        complete = true;
      }
    }
    else if (fontSize >= maxFontSize) {
      fontSize = maxFontSize;
      complete = true;
    }
    else if (!complete) {
      fontSize += step;
    }
  }
  return fontSize;
}
/* eslint-enable no-param-reassign */
