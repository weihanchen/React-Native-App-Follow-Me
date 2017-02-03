import {
  AsyncStorage
} from 'react-native'
export default class StorageService {
   constructor() {}
   checkIdExist() {
     return AsyncStorage.getItem('groupId')
              .then(groupId => AsyncStorage.getItem('userId').then(userId => {
                return {groupId, userId}
              }))
              .then(identify => Object.assign({}, identify, {isIdentify: identify.groupId != undefined && identify.userId != undefined}))
   }

   getId() {
      return AsyncStorage.getItem('groupId')
               .then(groupId => AsyncStorage.getItem('userId').then(userId => ({groupId, userId})))
   }
}
