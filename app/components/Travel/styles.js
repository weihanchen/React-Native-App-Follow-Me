import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end'

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
   buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginVertical: 20
   },
   button: {

   }
})
