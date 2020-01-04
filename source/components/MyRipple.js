import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Ripple from 'react-native-material-ripple';

export default class MyRipple extends Component {
    render() {
        return (
            <Ripple
                style={{
                    height: 60,
                    elevation: 10
                }}
                rippleColor="green"
                rippleOpacity={20}
                rippleDuration={1200}
                rippleFades={false}
            >
                <Text>Hello World</Text>
            </Ripple>
        )
    }
}
