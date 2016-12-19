import {StyleSheet} from 'react-native'
import MainStyle from '../../stylesheets'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MainStyle.color.black,
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 50,
        paddingRight: 50
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
        color: MainStyle.color.lightblue,
        backgroundColor: 'transparent',
        marginBottom: 20
    }
})
