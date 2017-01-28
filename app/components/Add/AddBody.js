'use strict'
import React, {Component, PropTypes} from 'react'
import {View, Text, TextInput, ToastAndroid, TouchableOpacity, StyleSheet} from 'react-native'
//stylesheets
import mainStyle from '../../stylesheets'
import styles from './styles'

class AddBody extends Component {
   constructor(props) {
      super(props)
      this.state = {
         groupName: '',
         userName: ''
      }
   }

   onAddToGroup() {
      if (this.state.groupName.length <= 0) {
         ToastAndroid.show('請輸入您的群組名稱', ToastAndroid.SHORT)
      } else if (this.state.userName.length <= 0) {
         ToastAndroid.show('請輸入您的暱稱', ToastAndroid.SHORT)
      } else {

         const groupName = this.state.groupName,
            userName = this.state.userName
         this.props.handleAddToGroup(groupName, userName)
      }
   }

   render() {
     const {group} = this.props
      return (
         <View style={styles.container}>
            <Text style={styles.title}>請輸入群組名稱</Text>
            <TextInput value={this.state.groupName} maxLength={10} onChangeText={(groupName) => this.setState({groupName})}></TextInput>
            <Text style={styles.title}>請輸入您的暱稱</Text>
            <TextInput value={this.state.userName} maxLength={10} onChangeText={(userName) => this.setState({userName})}></TextInput>
            <TouchableOpacity style={styles.btnSubmit} activeOpacity={0.8} onPress={this.onAddToGroup.bind(this)}>
              {_addGroupBtnSection(group.status)}
            </TouchableOpacity>
         </View>
      )
   }
}

const _addGroupBtnSection = (status) => {
   const defaultTemplate = (
      <Text style={styles.title}>加入群組</Text>
   )
   const renderStatus = {
      init: () => defaultTemplate,
      loading: () => (<ActivityIndicator color={mainStyle.color.skyblue} style={styles.startPositionItem}/>),
      add_success: () => defaultTemplate,
      error: () => defaultTemplate
   }
   if (renderStatus.hasOwnProperty(status))
      return renderStatus[status]()
   return defaultTemplate
}

AddBody.propTypes = {
   group: PropTypes.object,
   handleAddToGroup: PropTypes.func
}

export default AddBody
