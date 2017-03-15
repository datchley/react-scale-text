import { camelize, getStyle } from '../utils';

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

