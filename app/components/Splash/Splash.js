'use strict';

import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
} from 'react-native';

import MenuContainer from '../../containers/MenuContainer';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {navigator} = this.props;
     this.timer=setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MenuContainer,
          name: 'MenuContainer'
        });
      });
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>'Loading'</Text>
      </View>
    );
  }
}
export default Splash;
