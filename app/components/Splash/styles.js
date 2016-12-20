import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MainStyle.color.black
    },
    logoView: {
        height: 200,
        width: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontSize: MainStyle.font.large,
        color: MainStyle.color.skyblue,
        backgroundColor: 'transparent',
        marginBottom: 20
    }
})
