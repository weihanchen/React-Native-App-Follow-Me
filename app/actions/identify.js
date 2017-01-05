export const CHECK_IDENTIFY = 'CHECK_IDENTIFY'
export const CHECK_IDENTIFY_FAILED = 'CHECK_IDENTIFY_FAILED'
export const CHECK_IDENTIFY_SUCCESS = 'CHECK_IDENTIFY_SUCCESS'

export function requestCheckIdentify() {
  return {
    type: CHECK_IDENTIFY
  }
}
