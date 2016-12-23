'use strict'
import React, {Component, PropTypes} from 'react'
import {
    DatePickerAndroid,
    Text,
    TextInput,
    TimePickerAndroid,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import moment from 'moment'
import styles from './styles'

class CreateBody extends Component {
    constructor(props) {
        super(props)
        let date = new Date();
        this.state = {
            endTimeDate: date,
            endTimeDateText: moment(date).format('YYYY/MM/DD'),
            endTimeHour: 2,
            endTimeMinute: 0,
            endTimeText: '02:00',
            groupName: '',
            userName: '',
            endLocation: ''
        }


    }

    watchID: ?number = null;

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });
    }

    componentWillUnmount() {}

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
                newState[`${stateKey}Text`] = _formatTime(hour, minute)
                newState[`${stateKey}Hour`] = hour
                newState[`${stateKey}Minute`] = minute
            }
            this.setState(newState)
        } catch ({code, message}) {
            console.warn(`Error in '${stateKey}': `, message)
        }
    }

    render() {
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
                                <Icon name="calendar" style={styles.itemText}/>
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
                                <Icon name="clock-o" style={styles.itemText}/>
                            </View>
                            <View>
                                <Text style={styles.itemText}>{this.state.endTimeText}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>終點</Text>
            </View>
        )
    }
}

CreateBody.propTypes = {}

function _formatTime(hour, minute) {
    return hour + ':' + (minute < 10
        ? '0' + minute
        : minute)
}

export default CreateBody
