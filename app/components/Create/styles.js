import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
  smallGap: {
    marginRight: 5
  },
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
  endAddressSearch: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  endAddressSearchText: {
    flex: 1
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
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  startPosition: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 10
  },
  startPositionItem: {
    marginRight: 10
  },
  tipText: {
    color: MainStyle.color.skyblue
  },
  title: {
    fontSize: MainStyle.font.medium,
    fontWeight: 'bold'
  }
})
