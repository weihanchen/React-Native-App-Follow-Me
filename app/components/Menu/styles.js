import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: MainStyle.color.skyblue
    },
    item: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#0a8acd',
        borderStyle: 'solid',
        borderRadius: 6
    },
    itemTitle: {
      fontSize: MainStyle.font.large
    },
    itemSubTitle: {
      fontSize: MainStyle.font.small
    }
})
