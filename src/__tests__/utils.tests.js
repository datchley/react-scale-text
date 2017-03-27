import { uniqId, camelize, getStyle, css, getFillSize } from '../utils';

describe('uniqId()', () => {
  it('returns a string id', () => {
    const id = uniqId();
    expect(typeof id).toBe('string');
  });
  it('returns unique ids overtime', () => {
    const ids = [];
    for (let i=0; i<100; i++) {
      ids.push(uniqId());
    }
    expect((new Set(ids)).size).toEqual(100);
  });
});

describe('css()', () => {
  it('will set style properties on a given element', () => {
    const el = { style: {} };
    const expected = { style: { lineHeight: 1.4, fontSize: '14px' } };
    css(el, { lineHeight: 1.4, fontSize: '14px' });
    expect(el.style).toMatchObject(expected.style);
  });
});

describe('camelize()', () => {
  it('correctly camelizes a dashed string', () => {
    const before = 'not-camelized-string';
    const after = 'notCamelizedString';
    expect(camelize(before)).toEqual(after);
  });
  it('correctly camelizes a flat string', () => {
    const before = 'singlestring';
    const after = 'singlestring';
    expect(camelize(before)).toEqual(after);
  });
});

describe('getStyle()', () => {
  it('correctly gets style properties from an element', () => {
    document.body.innerHTML = `<html><body>
      <div class="target" style="font-size: 12px">testing</div>
    </body></html>`;

    const target = document.querySelector('.target');
    expect(getStyle(target, 'font-size')).toEqual('12px');
  });
});
