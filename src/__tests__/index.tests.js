import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleText from '../index';

describe('ScaleText', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<div><ScaleText><p>Some text</p></ScaleText></div>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly, with minFontSize', () => {
    const pStyles = { width: '100px', height: '100px' };
    const wrapper = mount(
      <div style={pStyles}><ScaleText minFontSize={12}><p>Some text</p></ScaleText></div>
    );
    const fontSize = parseFloat(wrapper.find('p').getDOMNode().style.fontSize, 10);
    expect(fontSize).toBeGreaterThanOrEqual(12);
  });

  it('renders correctly, with maxFontSize', () => {
    const pStyles = { width: '800px', height: '800px' };
    const wrapper = mount(
      <div style={pStyles}><ScaleText maxFontSize={20}><p>Some text</p></ScaleText></div>
    );
    const fontSize = parseFloat(wrapper.find('p').getDOMNode().style.fontSize, 10);
    expect(fontSize).toBeLessThanOrEqual(20);
  });
});
