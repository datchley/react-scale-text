// __mocks__/utils.js

const utils = require.requireActual('../utils');

const elementMap = {};

// Takes an object with the following properties
// { 'parent': { width, height, top, left }, ... }
const __setMockElements = (mapping) => {
  /* eslint-disable no-param-reassign */
  const elements = Object.keys(mapping).reduce((acc, key) => {
    const styles = mapping[key].styles || {};
    acc[key] = Object.assign({}, mapping[key], {
      clientWidth: mapping[key].width || 0,
      clientHeight: mapping[key].height || 0,
      offsetWidth: mapping[key].width || 0,
      offsetHeight: mapping[key].height || 0,
      scrollWidth: mapping[key].width || 0,
      scrollHeight: mapping[key].height || 0,
      _styles: {},
      style: {
        lineHeight: '1',
        fontSize: '16px',
        ...styles
      },
      getBoundingClientRect() {
        return {
          top: mapping[key].top || 0,
          bottom: this.offsetHeight,
          left: mapping[key].left || 0,
          right: this.offsetWidth
        };
      }
    });

    // Treat fontSize special, inc/dec the width for testing purposes
    acc[key]._styles.fontSize = styles.fontSize || '16px';
    /* eslint-disable object-shorthand */
    Object.defineProperty(acc[key].style, 'fontSize', {
      get: function() { return elementMap[key]._styles.fontSize; },
      set: function(val) {
        const curSize = parseFloat(elementMap[key]._styles.fontSize);
        const newSize = parseFloat(val);
        const adj = (newSize - curSize) / 10;
        if (curSize < newSize) {
          elementMap[key].offsetWidth += adj;
          elementMap[key].clientWidth += adj;
          elementMap[key].scrollWidth += adj;
        }
        if (curSize > newSize) {
          elementMap[key].offsetWidth += adj;
          elementMap[key].clientWidth += adj;
          elementMap[key].scrollWidth += adj;
        }
        elementMap[key]._styles.fontSize = val;
      },
      enumerable: true,
      configurable: true
    });
    return acc;
  }, {});

  Object.assign(elementMap, elements);
};
utils.__setMockElements = __setMockElements;

utils.__getMockElement = (key) => elementMap[key];

utils.setRef = (name, context) => () => {
  context[name] = elementMap[name];
};
utils.setRef._isMock = true;

utils.getStyle = (el, prop) => elementMap[el.className][utils.camelize(prop)];


module.exports = utils;
