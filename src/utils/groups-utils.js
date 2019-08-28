import { groups } from "./constants";
import { ApiError } from "./error";

let utils = {
  resolveGroup: group => group.mask
    ? group
    : (Number.isInteger( group )
      ? utils.groupByMask( group )
      : groups[ group ]),

  resolveAllGroups: (...groups) => groups.map( utils.resolveGroup ),

  hasRight: (group, mask) => (mask & utils.resolveGroup( group ).mask) === utils.resolveGroup( group ).mask,

  grouping: (...groups) => groups.reduce( (mask, group) => mask | utils.resolveGroup( group ).mask, 0 ),

  addGroup: (mask, group) => mask | utils.resolveGroup( group ).mask,

  removeGroup: (mask, group) => mask ^ utils.resolveGroup( group ).mask,

  groupByMask: mask => {
    if (mask === groups.all.mask) {
      return groups.all;
    }

    const filteredGroups = utils.groupsByMask( mask );

    if (!filteredGroups.length) {
      throw new ApiError( 'group_not_found', 400 );
    }

    return filteredGroups[ 0 ];
  },

  groupsByMask: mask => Object.keys( groups )
    .filter( groupKey => groupKey !== 'all' && utils.hasRight( groupKey, mask ) )
    .map( groupKey => groups[ groupKey ] ),

  groupsByMaskSorted: (mask, order = 'desc') => {
    const sign = order === 'desc' ? -1 : 1;

    return utils.groupsByMask( mask )
      .sort( (a, b) => sign * (a.mask - b.mask) );
  },

  maxGroupByMask: mask => {
    const filteredGroups = utils.groupsByMaskSorted( mask );

    if (!filteredGroups.length) {
      throw new ApiError( 'group_not_found', 400 );
    }

    return filteredGroups[ 0 ];
  },

  minGroupByMask: mask => {
    const filteredGroups = utils.groupsByMaskSorted( mask, 'asc' );

    if (!filteredGroups.length) {
      throw new ApiError( 'group_not_found', 400 );
    }

    return filteredGroups[ 0 ];
  }
};

export default { groups, utils };