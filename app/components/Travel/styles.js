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
      color: MainStyle.color.skyblue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      marginRight: 2
   },
   messageContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      ...StyleSheet.absoluteFillObject
   },
   modeButton: {
      alignItems: 'center',
      backgroundColor: MainStyle.color.white,
      borderColor: MainStyle.color.skyblue,
      borderWidth: 1,
      flexDirection: 'column',
      height: 30,
      justifyContent: 'center',
      width: 30
   },
   modeButtonActive: {
      backgroundColor: MainStyle.color.skyblue
   },
   modeButtonIcon: {
     fontSize: MainStyle.font.big
   },
   modeButtonIconActive: {
     color: MainStyle.color.white
   },
   modeContainer: {
      flexDirection: 'row',
      marginTop: 10,
      marginRight: 10,
      justifyContent: 'flex-end'
   },
   toolContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: 20,
      marginVertical: 40,
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
