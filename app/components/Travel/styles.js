import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
   bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginLeft: 10,
      marginRight: 10,
      marginVertical: 40,
      ...StyleSheet.absoluteFillObject
   },
   container: {
      flex: 1
   },
   end: {
      borderColor: MainStyle.color.danger,
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row'
   },
   endText: {
      color: MainStyle.color.blue,
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
   leaveContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
   },
   map: {
      ...StyleSheet.absoluteFillObject
   },
   member: {
      flexDirection: 'column'
   },
   memberImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: MainStyle.color.skyblue
   },
   memberText: {
      color: MainStyle.color.skyblue,
      fontSize: MainStyle.font.medium,
      fontWeight: "bold",
      textAlign: 'center',
      marginRight: 2
   },
   menuBottom: {
      marginBottom: 10
   },
   menuContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
   },
   menuTop: {
      marginTop: 10
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
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'column',
      height: 35,
      justifyContent: 'center',
      width: 35
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
      justifyContent: 'flex-end',
      marginTop: 15
   },
   selfText: {
     color: MainStyle.color.skyblue,
     fontSize: MainStyle.font.medium,
     fontWeight: "bold",
     textAlign: 'center',
     marginRight: 2
   },
   toolContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
   },
   topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 10,
      marginLeft: 10
   }
})
