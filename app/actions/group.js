export const REQUEST_CREATEGROUP = 'REQUEST_CREATEGROUP'
export const REQUEST_CREATEGROUP_FAILED = 'REQUEST_CREATEGROUP_FAILED'
export const REQUEST_CREATEGROUP_SUCCESS = 'REQUEST_CREATEGROUP_SUCCESS'
export const REQUEST_FETCH_GROUP = 'REQUEST_FETCH_GROUP'
export const REQUEST_FETCH_GROUP_FAILED = 'REQUEST_FETCH_GROUP_FAILED'
export const REQUEST_FETCH_GROUP_SUCCESS = 'REQUEST_FETCH_GROUP_SUCCESS'

const requestCreateGroup = (groupName, username, expiredTime, startPosition, endPosition) => ({
  type: REQUEST_CREATEGROUP,
  groupName,
  username,
  expiredTime,
  startPosition,
  endPosition
})

const requestFetchGroup = (groupId) => ({
  type: REQUEST_FETCH_GROUP,
  groupId
})

export {
  requestCreateGroup,
  requestFetchGroup
}
