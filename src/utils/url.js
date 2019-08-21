import { baseDomain } from './constants';

/**
 * @param {string} pathTo
 * @return {string}
 */
export function getURL (pathTo) {
  if (!pathTo.startsWith( '/' )) {
    pathTo = '/' + pathTo;
  }
  return `https://${ baseDomain }${ pathTo }`;
}