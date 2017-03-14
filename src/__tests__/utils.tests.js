import { camelize, getStyle, getOverflow, hasOverflow } from '../utils';

function createMockDiv(width, height, styles = {}) {
  const div = document.createElement('div');
  Object.assign(div.style, {
    width: `${width}px`,
    height: `${height}px`,
  }, styles);

  // we have to mock this for jsdom.
  div.getBoundingClientRect = () => ({
    width: div.style.width || width,
    height: div.style.height || height,
    top: 0,
    left: 0,
    right: div.style.width || width,
    bottom: div.style.height || height,
  });
  return div;
}

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

describe('getOverflow() + hasOverflow()', () => {
  it('detects and tests for overflow', () => {
    document.body.innerHTML = '<html><body></body></html>';

    const parent = createMockDiv(100, 100, { overflow: 'hidden' });
    document.body.appendChild(parent);
    const child = createMockDiv(200, 200);
    parent.appendChild(child);

    expect(getOverflow(parent, child)).toMatchObject({ horizontal: true, vertical: true });
    expect(hasOverflow(parent, child)).toEqual(true);
    child.style.height = '100px';
    expect(getOverflow(parent, child)).toMatchObject({ horizontal: true, vertical: false });
    expect(hasOverflow(parent, child)).toEqual(true);
    child.style.width = '100px';
    expect(getOverflow(parent, child)).toMatchObject({ horizontal: false, vertical: false });
    expect(hasOverflow(parent, child)).toEqual(false);
  });
});
