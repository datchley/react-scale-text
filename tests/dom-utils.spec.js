import chai, { expect } from 'chai';
import { camelize, css, getStyle } from '../src/dom-utils';

describe('dom util functions', () => {

  describe('camelize', () => {

    it('properly camel cases dashed strings', () => {
      const tries = [
        ['none', 'none'],
        ['one-dash', 'oneDash'],
        ['one-two-dashes', 'oneTwoDashes']
      ];

      for ([before,after] of tries) {
        expect(camelize(before)).to.equal(after);
      }
    });
  });

  describe('css', () => {
    it('handles setting one or more styles', () => {
      const styles = [
        {},
        { color: '#fff' },
        { color: '#fff', fontSize: '1.2em' },
        { color: '#fff', fontSize: '1.2em', 'background-color': 'rgba(0,0,0,0.7)' },
        { zIndex: 20, color: '#fff', fontSize: '1.2em', 'background-color': 'rgba(0,0,0,0.7)' }
      ];

      for (const style of styles) {
        const div = document.createElement('div');
        css(div, style);
        Object.keys(style).forEach(prop => {
          expect(div.style[prop]).to.exist;
        });
      }
    });
  });

  describe('getStyle', () => {
    it('properly retrieves style', () => {
      const div = document.createElement('div');
      css(div, { color: 'red', backgroundColor: '#fff', border: '1px solid #000' });
      document.body.appendChild(div);
      const expected = {
        color: ['rgb(255, 0, 0)', '#f00', '#ff0000', 'red'],
        'background-color': ['rgb(255, 255, 255)', '#ffffff', 'white'],
        'border': ['1px solid rgb(0, 0, 0)', '1px solid #000000', '1px solid black']
      };

      expect(getStyle(div, 'display')).to.equal('block');
      expect(getStyle(div, 'color')).to.be.oneOf(expected['color']);
      expect(getStyle(div, 'background-color')).to.be.oneOf(expected['background-color']);
      expect(getStyle(div, 'border')).to.be.oneOf(expected['border']);
    });
  });

});
