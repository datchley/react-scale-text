import React, { Component, PropTypes } from 'react';
import { setRef, hasOverflow } from './utils';
import throttle from 'lodash/throttle';

class ScaleText extends Component {

  componentDidMount() {
    this.handleResize = throttle(this.scale.bind(this), 50, { leading: true });
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
    const factor = 1;
    const parse = font => parseFloat(font, 10);
    let fontSize = minFontSize;

    // Make educated guess at maximum font-size for our child element
    fontSize = Math.max(
      Math.min(wrapper.offsetWidth / (factor * 10), maxFontSize),
      minFontSize
    );
    el.style.lineHeight = '1';
    el.style.fontSize = `${fontSize}px`;

    if (fontSize < maxFontSize) {
      // Bump up the font-size as long as we don't have any overflow of our parent
      while (!hasOverflow(wrapper, el)) {
        el.style.fontSize = `${parse(el.style.fontSize) + 1}px`;
        if (parseFloat(el.style.fontSize, 10) <= minFontSize) {
          el.style.fontSize = `${minFontSize}px`;
          break;
        }
        if (parseFloat(el.style.fontSize, 10) >= maxFontSize) {
          el.style.fontSize = `${maxFontSize}px`;
          break;
        }
      }
      if (parseFloat(el.style.fontSize, 10) > minFontSize) {
        el.style.fontSize = `${parse(el.style.fontSize) - 1}px`;
      }
    }
  }

  render() {
    const { children } = this.props;
    const contentRef = setRef('content', this); //  (c) => { this.content = c; };
    const wrapperRef = setRef('wrapper', this); //  (c) => { this.wrapper = c; };
    const wrapStyle = {
      display: 'inline-block',
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    };

    return (
      <div className="scaletext-wrapper" ref={wrapperRef} style={wrapStyle}>
        { React.Children.map(children, (child) =>
            React.cloneElement(child, { ref: contentRef })
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
