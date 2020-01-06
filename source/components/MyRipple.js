import React, {Component} from 'react';
import {Text, View, Animated, Button, Dimensions} from 'react-native';
// import Ripple from './Ripple';
const {width:my} = Dimensions.get('window');
export default class MyRipple extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
    this.toggle = false;
  }
  // getRef = (ref) => this.ripRef = ref

  start = () => {
    var toValue = this.toggle ? 0 : 1;
    Animated.spring(this.animation, {
      duration: 2000,
      toValue: toValue,
    }).start(() => {
      this.toggle = !this.toggle;
    });
  };
  render() {
    // const value = this.animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, 2],
    // });
    const color = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#008BAC', 'white'],
    });
    const width = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [my, 0],
    });

    let Anistyle = {
      backgroundColor: color,
      width,
      height: 60,
      position: 'absolute',
    };
    const {children} = this.props;
    return (
      <View
      style={{
          backgroundColor:'white',
          elevation:20
      }}
      >
        <Animated.View style={[Anistyle]} />
        {children}
      </View>
    );
  }
}
