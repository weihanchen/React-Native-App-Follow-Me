export const CHECK_IDENTIFY = 'CHECK_IDENTIFY'
export const CHECK_IDENTIFY_SUCCESS = 'CHECK_IDENTIFY_SUCCESS'
export const IDENTIFY_FAILED = 'IDENTIFY_FAILED'
export const REQUEST_IDENTIFY = 'REQUEST_IDENTIFY'
export const REQUEST_IDENTIFY_SUCCESS = 'REQUEST_IDENTIFY_SUCCESS'

const requestCheckIdentify = () => ({
   type: CHECK_IDENTIFY
})

const requestIdentify = () => ({
   type: REQUEST_IDENTIFY
})

export {
   requestCheckIdentify,
   requestIdentify
}
