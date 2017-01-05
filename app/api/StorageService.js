import {
  AsyncStorage
} from 'react-native'
export default class StorageService {
   constructor() {}
   checkIdExist() {
     return AsyncStorage.getItem('groupId')
              .then(groupId => AsyncStorage.getItem('userId').then(userId => {groupId, userId}))
              .then(identity => identity.groupId != null && identity.userId != null)
   }
}
