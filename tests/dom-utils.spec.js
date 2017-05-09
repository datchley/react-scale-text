import chai, { expect } from 'chai';
import { camelize, css, getStyle, getOverflow } from '../src/dom-utils';

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

  describe('getOverflow', () => {
    it('properly detects element overflow', () => {
        // setup some common styles we can use to build our test divs
        const standard = { position: 'static' };
        const absolute = { position: 'absolute', top: '0px', left: '0px' };
        const relative = { position: 'relative', top: '0px', left: '0px' };
        const boxStyles = {
          display: 'inline-block',
          padding: '5px',
          overflow: 'hidden',
          width: '120px',
          height: '120px'
        };
        const contentStyles = {
          padding: '2px',
          whiteSpace: 'nowrap'
        };
        const iterations = [
          [standard, standard],
          [standard, absolute],
          [standard, relative],
          [relative, absolute],
          [absolute, relative],
          [absolute, absolute]
        ];
        const overflows = [
          [true, false],
          [false, false], // always fail absolute child in static parent
          [true, false],
          [true, false],
          [true, false],
          [true, false]
        ];

        // our test div container
        const container = document.createElement('div');

        // making divs....
        for (let [parent, child] of iterations) {
          const box = document.createElement('div');
          css(box, { ...boxStyles, ...parent });
          box.className = "box";
          const content = document.createElement('p');
          content.textContent = 'test content which overflows container';
          css(content, { ...contentStyles, ...child });
          box.appendChild(content);
          container.appendChild(box);
        }
        document.body.appendChild(container);

        // gather up our test divs
        const boxes = document.querySelectorAll('.box');

        for (let i in Array.from(boxes)) {
          const box = boxes[i];
          const expected = overflows[i];
          expect(getOverflow(box)).to.eql(expected);
        }
    })
  })
});
