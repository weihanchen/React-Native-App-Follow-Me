'use strict'
import React, {Component, PropTypes} from 'react'
import {Text, TextInput, TimePickerAndroid, TouchableNativeFeedback, View} from 'react-native'
import styles from './styles'
class CreateBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            durationHour: 2,
            durationMinute: 0,
            durationText: '02:00',
            groupName: '',
            userName: '',

            endLocation: ''
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    showPicker = async(stateKey, options) => {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in '${stateKey}': `, message);
        }
    };

    render() {
        return (
            <View>
                <Text style={styles.title}>車隊名稱：</Text>
                <TextInput value={this.state.groupName}></TextInput>
                <Text style={styles.title}>暱稱：</Text>
                <TextInput value={this.state.userName}></TextInput>
                <Text style={styles.title}>車隊持續時間：</Text>
                <TouchableNativeFeedback onPress={this.showPicker.bind(this, 'duration', {hour: this.state.durationHour, minute: this.state.durationMinute})}>
                  <Text>{this.state.durationText}</Text>
                </TouchableNativeFeedback>
                <Text style={styles.title}>終點：</Text>
            </View>
        )
    }
}

CreateBody.propTypes = {}

function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute)
}

export default CreateBody
