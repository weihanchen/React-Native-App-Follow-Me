export const REQUEST_ADD_TO_GROUP = 'REQUEST_ADD_TO_GROUP'
export const REQUEST_ADD_TO_GROUP_SUCCESS = 'REQUEST_ADD_TO_GROUP_SUCCESS'
export const REQUEST_CREATEGROUP = 'REQUEST_CREATEGROUP'
export const REQUEST_CREATEGROUP_SUCCESS = 'REQUEST_CREATEGROUP_SUCCESS'
export const REQUEST_FETCH_GROUP = 'REQUEST_FETCH_GROUP'
export const REQUEST_FETCH_GROUP_SUCCESS = 'REQUEST_FETCH_GROUP_SUCCESS'
export const REQUEST_LEAVE_GROUP = 'REQUEST_LEAVE_GROUP'
export const REQUEST_LEAVE_GROUP_SUCCESS = 'REQUEST_LEAVE_GROUP_SUCCESS'
export const REQUEST_GROUP_FAILED = 'REQUEST_GROUP_FAILED'

const requestAddToGroup = (groupName, userName) => ({
   type: REQUEST_ADD_TO_GROUP,
   groupName,
   userName
})

const requestCreateGroup = (groupName, userName, expiredTime, startPosition, endPosition) => ({
   type: REQUEST_CREATEGROUP,
   groupName,
   userName,
   expiredTime,
   startPosition,
   endPosition
})

const requestFetchGroup = (groupId) => ({
   type: REQUEST_FETCH_GROUP,
   groupId
})

const requestLeaveGroup = (groupId, userId, isLeader) => ({
   type: REQUEST_LEAVE_GROUP,
   groupId,
   userId,
   isLeader
})

export {
   requestAddToGroup,
   requestCreateGroup,
   requestFetchGroup,
   requestLeaveGroup
}
