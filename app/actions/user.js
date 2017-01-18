export const REQUEST_FETCH_USER = 'REQUEST_FETCH_USER'
export const REQUEST_FETCH_USER_FAILED = 'REQUEST_FETCH_USER_FAILED'
export const REQUEST_FETCH_USER_SUCCESS = 'REQUEST_FETCH_USER_SUCCESS'

const requestFetchUser = (userId) => ({
  type: REQUEST_FETCH_USER,
  userId
})

export {
  requestFetchUser
}
