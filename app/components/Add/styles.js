import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
   btnSubmit: {
      borderRadius: 8,
      borderColor: MainStyle.color.navy,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10,
      padding: 10
   },
   container: {
      flex: 1,
      padding: 20
   },
   title: {
      fontSize: MainStyle.font.medium,
      fontWeight: 'bold'
   }
})
