import React, { Component, PropTypes } from 'react';
import { hasOverflow } from './utils';
import debounce from 'lodash/debounce';

class ScaleText extends Component {

  componentDidMount() {
    this.handleResize = debounce(this.scale.bind(this), 0);
    window.addEventListener('resize', this.handleResize);
    this.scale();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  scale() {
    const el = this.content;
    const wrapper = this.wrapper;
    const { maxFontSize, minFontSize } = this.props;
    const factor = 1.3;
    let fontSize = minFontSize;

    const scaleFontBy = (elem, step) => {
      /* eslint-disable no-param-reassign */
      elem.style.fontSize = `${parseFloat(elem.style.fontSize, 10) + step}px`;
    };

    // Make educated guess at maximum font-size for our child element
    fontSize = Math.max(
      Math.min(wrapper.offsetWidth / (factor * 10), parseFloat(maxFontSize)),
      parseFloat(minFontSize)
    );

    el.style.fontSize = `${fontSize}px`;

    if (fontSize === minFontSize) {
      return;
    }

    if (fontSize < maxFontSize) {
      // Bump up the font-size as long as we don't have any overflow of our parent
      while (!hasOverflow(wrapper, el) && (parseFloat(el.style.fontSize) < maxFontSize)) {
        el.style.fontSize = scaleFontBy(el, +1);
      }
      el.style.fontSize = scaleFontBy(el, -1);
    }
  }

  render() {
    const { children } = this.props;
    const assignRef = (c) => { this.content = c; };
    // , width: '100%', height: '100%' };
    const wrapStyle = {
      display: 'inline-block',
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    };
    return (
      <div ref={c => { this.wrapper = c; }} style={wrapStyle}>
        { React.Children.map(children, (child) =>
            React.cloneElement(child, { ref: assignRef })
          )[0]
        }
      </div>
    );
  }
}


ScaleText.propTypes = {
  children: PropTypes.element.isRequired,
  minFontSize: PropTypes.number,
  maxFontSize: PropTypes.number,
};
ScaleText.defaultProps = {
  minFontSize: Number.NEGATIVE_INFINITY,
  maxFontSize: Number.POSITIVE_INFINITY,
};

export default ScaleText;
