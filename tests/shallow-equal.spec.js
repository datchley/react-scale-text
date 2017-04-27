import chai, { expect } from 'chai';
import shallowEqual from '../src/shallow-equal';

describe('shallowEqual', () => {

  it('properly handles non-object types', () => {
    const s = "string";
    const n = 45;
    const bool = true;

    expect(shallowEqual(s, "string")).to.be.true;
    expect(shallowEqual(n, 45)).to.be.true;
    expect(shallowEqual(bool, true)).to.be.true;
    expect(shallowEqual(null, null), 'null is equal null').to.be.true;
    expect(shallowEqual(undefined, undefined), 'undef is equal undef').to.be.true;
    expect(shallowEqual(null, undefined), 'null not equal undef').to.be.false;
  });

  it('properly compares objects', () => {
    let obj = { one: 1, two: [1,2], three: '3', four: { a: 1, b: "cat" }};
    let good = Object.assign({}, obj);
    let bad = Object.assign({}, obj, { one: "dog" });

    expect(shallowEqual(obj,obj), 'same object reference').to.be.true;
    expect(shallowEqual(obj,good), 'matching objects').to.be.true;
    expect(shallowEqual(obj,bad), 'non-matching objects').to.be.false;
  });

  it('properly compares arrays', () => {
    let arr = [1,2,3];
    let good = [...arr];
    let bad = [1,3];

    expect(shallowEqual(arr, arr), 'same array reference').to.be.true;
    expect(shallowEqual(arr, good), 'matching arrays').to.be.true;
    expect(shallowEqual(arr, bad), 'non-matching arrays').to.be.false;
  });

  it('with custom comparator', () => {
    const Thing = function(name) {
      this.name = name;
      this.type = 'thing';
    };
    const cmp = (a, b) => a.name === b.name;
    const thing1 = new Thing('thing1');
    const thing2 = new Thing('thing1');

    expect(shallowEqual(thing1, thing2, cmp)).to.be.true;
  });
});
