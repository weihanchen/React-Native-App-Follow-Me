import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1

   },
   map: {
      ...StyleSheet.absoluteFillObject
   },
   end: {
      borderColor: MainStyle.color.danger,
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row'
   },
   endText: {
      color: MainStyle.color.danger,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      margin: 2
   },
   leaderText: {
      color: MainStyle.color.danger,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      margin: 2
   },
   member: {
      flexDirection: 'row'
   },
   memberText: {
      color: MainStyle.color.blue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      margin: 2
   },
   selfText: {
      color: MainStyle.color.skyblue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold"
   },
   toolContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: 20,
      marginVertical: 25,
      ...StyleSheet.absoluteFillObject
   },
   toolButton: {
      backgroundColor: MainStyle.color.white,
      borderColor: MainStyle.color.navy,
      borderRadius: MainStyle.radius.huge,
      borderWidth: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      width: 40,
      height: 40
   },
   toolButtonAlert: {
      borderColor: MainStyle.color.warning
   },
   toolButtonIcon: {
      fontSize: MainStyle.font.large,
      color: MainStyle.color.navy
   },
   toolButtonIconAlert: {
      color: MainStyle.color.warning
   }

})
