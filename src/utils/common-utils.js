/**
 * @param {string} value
 * @returns {string}
 */
export function ensureString (value) {
  return (value || '').toString();
}

/**
 * @param {number|*} value
 * @returns {number}
 */
export function ensureNumber (value) {
  value = Number( value );
  if (Number.isNaN( value )) {
    return 0;
  }
  return value;
}

/**
 *
 * @param {array} ids
 * @returns {number[]}
 */
export function getOnlyNumberIds (ids = []) {
  return ids.map( Number ).filter( v => !Number.isNaN( v ) );
}