/* eslint-disable no-param-reassign */
import { getOverflow } from './dom-utils';

// Determine the font-size to set on the element `el` that will
// allow the first child of that element to fill the maximum height
// and width without causing overflow
export default function getFillSize(el, minFontSize, maxFontSize, factor = 1) {
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
    const [overflowWidth, overflowHeight] = getOverflow(el);

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
