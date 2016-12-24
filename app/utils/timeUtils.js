const toHHmm = (hour, minute) => {
  hour = (hour < 10)? `0${hour}`: hour
  minute = (minute < 10)? `0${minute}`: minute
  return `${hour} : ${minute}`
}

export {
  toHHmm
}
