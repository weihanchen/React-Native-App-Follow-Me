'use strict'
import React, {Component, PropTypes} from 'react'

//plugins
import {
    ActivityIndicator,
    DatePickerAndroid,
    Text,
    TextInput,
    TimePickerAndroid,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import MapView from 'react-native-maps'

//stylesheets
import mainStyle from '../../stylesheets'
import styles from './styles'

//utils
import {timeUtils} from '../../utils'

class CreateBody extends Component {
    constructor(props) {
        super(props)
        let endDate = moment(new Date()).add(2, 'hours');
        this.state = {
            endTimeDate: endDate.date(),
            endTimeDateText: endDate.format('YYYY/MM/DD'),
            endTimeHour: endDate.hours(),
            endTimeMinute: endDate.minute(),
            endTimeText: endDate.format('HH:mm'),
            groupName: '',
            userName: '',
            endLocation: ''
        }
    }

    watchID :
        ? number = null;

    componentDidMount() {
        ToastAndroid.show('正在取得您目前的位置...', ToastAndroid.SHORT);
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lastPosition = JSON.stringify(position);
            console.log(lastPosition)
            this.setState({lastPosition});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    showDatePicker = async(stateKey, options) => {
        try {
            var newState = {}
            const {action, year, month, day} = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day)
                newState[`${stateKey}DateText`] = moment(date).format('YYYY/MM/DD')
                newState[`${stateKey}Date`] = date
            }
            this.setState(newState)
        } catch ({code, message}) {
            console.warn(`Error in '${stateKey}': `, message)
        }
    }

    showTimePicker = async(stateKey, options) => {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options)
            var newState = {}
            if (action === TimePickerAndroid.timeSetAction) {
                newState[`${stateKey}Text`] = timeUtils.toHHmm(hour, minute)
                newState[`${stateKey}Hour`] = hour
                newState[`${stateKey}Minute`] = minute
            }
            this.setState(newState)
        } catch ({code, message}) {
            console.warn(`Error in '${stateKey}': `, message)
        }
    }

    render() {
        const {location} = this.props
        console.log(location)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>請輸入車隊名稱</Text>
                <TextInput value={this.state.groupName}></TextInput>
                <Text style={styles.title}>請輸入您的暱稱</Text>
                <TextInput value={this.state.userName}></TextInput>
                <Text style={styles.title}>車隊結束時間</Text>
                <View style={styles.endTime}>
                    <TouchableOpacity onPress={this.showDatePicker.bind(this, 'endTime', {date: this.state.endTimeDate})}>
                        <View style={styles.endTimeItem}>
                            <View style={styles.itemIcon}>
                                <Icon name='calendar' style={styles.itemText}/>
                            </View>
                            <View>
                                <Text style={styles.itemText}>{this.state.endTimeDateText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showTimePicker.bind(this, 'endTime', {
                        hour: this.state.endTimeHour,
                        minute: this.state.endTimeMinute
                    })} activeOpacity={0.7}>
                        <View style={styles.endTimeItem}>
                            <View style={styles.itemIcon}>
                                <Icon name='clock-o' style={styles.itemText}/>
                            </View>
                            <View>
                                <Text style={styles.itemText}>{this.state.endTimeText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
              {_startPositionSection(location.status, location.error)}
                <Text style={styles.title}>終點</Text>
            </View>
        )
    }
}

//private methods
const _startPositionSection = (status, errorMessage) =>{
    let indicator, tipText
    if (status === 'loading'){
      indicator = <ActivityIndicator color={mainStyle.color.navy} style={styles.startPositionItem} />
      tipText = <Text style={styles.tipText}>正在取得您目前的位置...</Text>
   } else if (status === 'success') {
      indicator = <Icon name='map-marker' style={[styles.startPositionItem, styles.itemText]} />
      tipText = <Text style={styles.title}>已套用您目前的位置</Text>
   } else if (status === 'error'){
      indicator = <Icon name='times' style={[styles.startPositionItem, styles.errorText]} />
      tipText = <Text style={styles.errorText}>{errorMessage}</Text>
   }
   return (
       <View style={styles.startPosition}>
          <Text style={[styles.title, styles.startPositionItem]}>起點</Text>
          {indicator}
          {tipText}
       </View>
   )
}

CreateBody.propTypes = {
    location: PropTypes.object
}

export default CreateBody
