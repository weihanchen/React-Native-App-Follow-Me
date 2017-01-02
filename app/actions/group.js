export const REQUEST_CREATEGROUP = 'REQUEST_CREATEGROUP'
export const REQUEST_CREATEGROUP_FAILED = 'REQUEST_CREATEGROUP_FAILED'
export const REQUEST_CREATEGROUP_SUCCESS = 'REQUEST_CREATEGROUP_SUCCESS'

export function requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
  return {
    type: REQUEST_CREATEGROUP,
    groupName,
    username,
    expiredTime
  }
}
