import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleText from '../index';


describe('ScaleText', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<div><ScaleText><p>Some text</p></ScaleText></div>);
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: Find reliable way to unit test with dependencies on DOM
  // Element proeperties such as clientHeight/Width, scrollHeight/Width
  // getBoundingClientRect(), etc.  jsdom doesn't polyfill those, as it
  // doesn't have a full rendering engine.
  /*it('renders correctly, with minFontSize', () => {
    const pStyles = { width: '100px', height: '100px' };
    const wrapper = mount(
      <div className="parent" style={pStyles}>
        <ScaleText minFontSize={12}><p>Some text</p></ScaleText>
      </div>
    );
    console.log('offsetWidth: ', wrapper.find('.parent').offsetWidth);
    const fontSize = parseFloat(wrapper.find('p').getDOMNode().style.fontSize, 10);
    expect(fontSize).toBeGreaterThanOrEqual(12);
    wrapper.unmount();
  });

  it('renders correctly, with maxFontSize', () => {
    const pStyles = { width: '800px', height: '800px' };
    const wrapper = mount(
      <div style={pStyles}><ScaleText maxFontSize={20}><p>Some text</p></ScaleText></div>
    );
    const fontSize = parseFloat(wrapper.find('p').getDOMNode().style.fontSize, 10);
    expect(fontSize).toBeLessThanOrEqual(20);
    wrapper.unmount();
  });*/
});
