'use strict'

import React from 'react'
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import styles from './styles'
import MainStyle from '../../stylesheets'
class MenuBody extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }

  onCreateGroup() {

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>創建車隊</Text>
            <Text style={styles.itemSubTitle}>車隊號碼、成員管理</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
export default MenuBody
