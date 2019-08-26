/**
 * @param {string} value
 * @returns {string}
 */
import { maxLimitDefault } from "./constants";

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

/**
 * Get limit by max
 * @param {number|string} limit
 * @param {number} maxLimit
 * @returns {*}
 */
export function getLimitByMax (limit, maxLimit = maxLimitDefault) {
  limit = ensureNumber( limit );

  return limit > maxLimit
    ? maxLimit
    : limit;
}