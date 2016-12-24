import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
  container: {
      flex: 1,
      padding: 20
  },
  endTime: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15
  },
  endTimeItem: {
    flexDirection: 'row',
    marginRight: 20
  },
  errorText: {
    color: MainStyle.color.danger,
    fontSize: MainStyle.font.large
  },
  itemIcon: {
    justifyContent: 'center',
    marginRight: 10
  },
  itemText: {
    fontSize: MainStyle.font.large,
    color: MainStyle.color.navy
  },
  startPosition: {
    flexDirection: 'row'
  },
  startPositionItem: {
    marginRight: 10
  },
  tipText: {
    color: MainStyle.color.navy
  },
  title: {
    fontSize: MainStyle.font.medium,
    fontWeight: 'bold'
  }
})
