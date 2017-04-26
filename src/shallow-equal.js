import keys from 'lodash/keys';

/* eslint-disable no-void */
export default function shallowEqual(objA, objB, compare, compareContext) {
  const context = compareContext || null;
  let ret = compare ? compare.call(context, objA, objB) : void 0;

  if (ret !== (void 0)) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = keys(objA);
  const keysB = keys(objB);

  const len = keysA.length;
  if (len !== keysB.length) {
    return false;
  }


  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < len; i++) {
    const key = keysA[i];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    const valueA = objA[key];
    const valueB = objB[key];

    ret = compare ? compare.call(context, valueA, valueB, key) : void 0;
    if (ret === false || (ret === (void 0) && valueA !== valueB)) {
      return false;
    }
  }

  return true;
}
