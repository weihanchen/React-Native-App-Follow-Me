const checkStatus = (response) => {
   if (response.status >= 200 && response.status < 300) {
      return response
   } else {
      return response.json().then(json => {
         const errorMsg = json.hasOwnProperty('error_message') ? json.error_message : response.statusText
         const error = new Error(errorMsg)
         throw errorMsg
      })
   }
}

export {
   checkStatus
}

export default {
   checkStatus
}
