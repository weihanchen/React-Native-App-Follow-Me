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
              .then(identity => identity.groupId != undefined && identity.userId != undefined)
   }
}
