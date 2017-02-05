'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {TouchableOpacity, View} from 'react-native'
import {Button, List, ListItem} from 'react-native-elements'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'

class TravelMenu extends Component {
   constructor(props) {
      super(props)
      this.state = {
         members: [
            {
               name: '後衛',
               type: 'leader'
            }, {
               name: '前鋒',
               type: 'self'
            }, {
               name: '中鋒',
               type: 'member'
            }, {
               name: '終點',
               type: 'endPosition'
            }
         ]
      }
   }

   onLeaveGroup() {
      this.props.handleLeaveGroup()
   }

   render() {
      return (
         <View style={styles.menuContainer}>
            <View style={styles.menuTop}>
               <ListItem key={10000} title={'Weihanchen'}
                 roundAvatar={true}
                 avatar={{uri: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?oh=7f3dfacc99a506cd7759421da479c6c7&oe=59444149'}}
                 hideChevron={true}></ListItem>
            </View>
            <View>
              <List>
                 {this.state.members.map((map, index) => (<ListItem key={index}
                   roundAvatar={true}
                   avatar={{uri: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?oh=7f3dfacc99a506cd7759421da479c6c7&oe=59444149'}}
                   title={map.name}/>))}
              </List>
            </View>
            <View style={styles.menuBottom}>
                <Button reverse title="離開隊伍" backgroundColor={mainStyle.color.danger} borderRadius={mainStyle.radius.medium} icon={{
                   name: 'sign-out',
                   type: 'font-awesome'
                }} onPress={this.onLeaveGroup.bind(this)} Component={TouchableOpacity}></Button>
            </View>
         </View>
      )
   }
}

TravelMenu.propTypes = {
   handleLeaveGroup: PropTypes.func
}

export default TravelMenu
