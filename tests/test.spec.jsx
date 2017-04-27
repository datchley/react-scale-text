import React from 'react';
import chai, { expect } from 'chai';
import { render, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import Hello from './hello';
import ScaleText from '../src/index';

chai.use(chaiEnzyme());
chai.use(chaiJsx);

// Create root node to render to
const root = document.createElement('div');
root.setAttribute('id', 'test');
document.body.appendChild(root);

const options = {
  attachTo: document.querySelector('#test')
};
// original screen dimensions
let windowWidth = window.outerWidth;
let windowHeight = window.outerHeight;

// testing utility functions
const isOverflowing = el => el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
const getFontSize = el => parseFloat(window.getComputedStyle(el).fontSize, 10);
const resetWindowSize = () => window.resizeTo(windowWidth, windowHeight);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

//
// Tests
//

describe('ScaleText', () => {

  before(() => {
    windowWidth = window.outerWidth;
    windowHeight = window.outerHeight;
  });

  afterEach((done) => {
    resetWindowSize();
    setTimeout(done, 500);
  });

  it('can be rendered', () => {
    const wrapper = mount(<ScaleText className="test-1"><span>text</span></ScaleText>, options);
    expect(wrapper).to.exist;
    expect(wrapper.length).to.be.equal(1);
    wrapper.detach();
  });

  it('changes font-size of child when resized', async () => {
    const style = {
      display: 'inline-block',
      width: 'calc(100px + 20vw)',
      height: 'calc(100px + 20vw)'
    };
    const wrapper = mount(
      <div className="container" style={style}>
        <ScaleText>
          <span className="child">text</span>
        </ScaleText>
      </div>,
      options
    );
    const childWrapper = wrapper.find('.child').first();
    const child = childWrapper.getDOMNode();

    try {
      await wait(200);
      const before = getFontSize(child);
      window.resizeTo(windowWidth / 2, windowHeight / 2);

      await wait(200);
      wrapper.update();
      const after = getFontSize(child);
      expect(parseFloat(before)).to.be.greaterThan(parseFloat(after));
      expect(isOverflowing(wrapper.getDOMNode())).to.be.false;

      wrapper.detach();
      return Promise.resolve(true);
    }
    catch (err) {
      return Promise.reject(err);
    }
  });

  it('will not resize below minFontSize', async () => {
    const style = {
      display: 'inline-block',
      width: 'calc(5vw + 16px)',
      height: 'calc(5vw + 16px)'
    };
    const wrapper = mount(
      <div className="container" style={style}>
        <ScaleText minFontSize={16}>
          <span className="child">text</span>
        </ScaleText>
      </div>,
      options
    );
    const childWrapper = wrapper.find('.child').first();
    const child = childWrapper.getDOMNode();

    try {
      await wait(200);
      const before = getFontSize(child);
      window.resizeTo(40, 40);

      await wait(200);
      wrapper.update();
      const after = getFontSize(child);
      expect(parseFloat(after)).to.be.greaterThan(15);

      wrapper.detach();
      return Promise.resolve(true);
    }
    catch (err) {
      return Promise.reject(err);
    }
  });
});
