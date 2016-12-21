'use strict'

import React from 'react'
import {Button, View, Text, TouchableOpacity, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import MainStyle from '../../stylesheets'
import styles from './styles'
class MenuBody extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {}
    componentWillUnmount() {}

    onCreateGroup() {}

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemIcon}>
                            <Icon name="users" size={MainStyle.font.huge}/>
                        </View>
                        <View>
                            <Text style={styles.itemTitle}>創建車隊</Text>
                            <Text style={styles.itemSubTitle}>車隊名稱、用戶ID、結束時間</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemIcon}>
                            <Icon name="plus" size={MainStyle.font.huge}/>
                        </View>
                        <View>
                            <Text style={styles.itemTitle}>加入車隊</Text>
                            <Text style={styles.itemSubTitle}>根據ID加入、搜尋車隊名稱</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
                  <View style={styles.itemContainer}>
                      <View style={styles.itemIcon}>
                          <Icon name="cog" size={MainStyle.font.huge}/>
                      </View>
                      <View>
                          <Text style={styles.itemTitle}>設定</Text>
                          <Text style={styles.itemSubTitle}>Pending...</Text>
                      </View>
                  </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default MenuBody
