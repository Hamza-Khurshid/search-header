import React, { Component } from 'react'
import { Text, View, Animated, Button, Easing } from 'react-native'
// import Ripple from './Ripple';

export default class MyRipple extends Component {
    animation = new Animated.Value(0)
    toggle = false
    // getRef = (ref) => this.ripRef = ref


    start = () => {
        var toValue = this.toggle ? 0 : 1
        Animated.spring(this.animation, {
            duration: 2000,
            toValue: toValue,
        }).start(() => {
            this.toggle = !this.toggle
        })
    }
    render() {
        const value = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2]
        })
        const color = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['green', 'white']
        })
        const width = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
        })


        let Anistyle = {
            transform: [{
                scaleX: value
            }],
            backgroundColor: color,
            width, height: 60,
            position: 'absolute',
        }
        const {children} = this.props;
        return (
            <View>
                <Animated.View style={Anistyle} />
                {children}
            </View>

        )
    }
}
