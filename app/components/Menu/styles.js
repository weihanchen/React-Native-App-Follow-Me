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
    icon: {
      fontSize: MainStyle.font.huge
    },
    item: {
        backgroundColor: MainStyle.color.lightgreen,
        borderColor: '#0a8acd',
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 10
    },
    itemContainer: {
        flexDirection: 'row'
    },
    itemIcon: {
        justifyContent: 'center',
        marginRight: 15,
        marginLeft: 15
    },
    itemTitle: {
        fontSize: MainStyle.font.large
    },
    itemSubTitle: {
        fontSize: MainStyle.font.small
    }
})
