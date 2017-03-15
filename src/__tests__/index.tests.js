jest.setMock('../utils', require('../__mocks__/utils'));

import React from 'react';
import { mount, shallow } from 'enzyme';
import ScaleText from '../index';

// jest.mock('../utils');
const utils = require('utils');


describe('ScaleText', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<div><ScaleText><p>Some text</p></ScaleText></div>);
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: Find reliable way to unit test with dependencies on DOM
  // Element proeperties such as clientHeight/Width, scrollHeight/Width
  // getBoundingClientRect(), etc.  jsdom doesn't polyfill those, as it
  // doesn't have a full rendering engine.
  it('renders correctly, with minFontSize', () => {
    utils.__setMockElements({
      wrapper: { width: 100, height: 100, top: 0, left: 0 },
      content: { width: 105, height: 105, top: 0, left: 0 }
    });
    const pStyles = { width: '100px', height: '100px' };
    const wrapper = mount(
      <div className="parent" style={pStyles}>
        <ScaleText minFontSize={12}><p>Some text</p></ScaleText>
      </div>
    );
    wrapper.update();
    const fontSize = utils.__getMockElement('content').style.fontSize;
    expect(parseFloat(fontSize, 10)).toBeGreaterThanOrEqual(12);
    wrapper.unmount();
  });

  it('renders correctly, with maxFontSize', () => {
    utils.__setMockElements({
      wrapper: { width: 800, height: 800, top: 0, left: 0 },
      content: { width: 100, height: 100, top: 0, left: 0 }
    });
    const pStyles = { width: '800px', height: '800px' };
    const wrapper = mount(
      <div style={pStyles}><ScaleText maxFontSize={20}><p>Some text</p></ScaleText></div>
    );
    const fontSize = utils.__getMockElement('content').style.fontSize;
    expect(parseFloat(fontSize, 10)).toBeLessThanOrEqual(20);
    wrapper.unmount();
  });
});
