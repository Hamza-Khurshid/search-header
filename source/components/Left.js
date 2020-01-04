import React, { Component } from 'react'
import { Icon } from 'native-base'
import { View, Text, Animated, Easing } from 'react-native'

class Left extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            leftElement: 'chevron-left',
            spinValue: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(nextProps) {
        // goes to search state
        if (nextProps.isSearchActive && !this.props.isSearchActive) {
            this.animate({ toValue: 1, leftElement: 'circle-with-cross' });
        }
        // goes to default look
        if (!nextProps.isSearchActive && this.props.isSearchActive) {
            this.animate({ toValue: 0, leftElement: 'chevron-left' });
        }
    }

    animate = ({ toValue, leftElement }) => {
        Animated.timing(this.state.spinValue, {
            toValue: 0.5,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({ leftElement });

            Animated.timing(this.state.spinValue, {
                toValue,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }

    render() {
        const { leftElement, spinValue } = this.state;
        const { isSearchActive, onSearchClose } = this.props;

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        return (
            <Animated.View style={[{ transform: [{ rotate: spin }] }]} >
                <Icon type="Entypo" name={leftElement} style={{ color : isSearchActive ? 'grey' : 'black' }} onPress={onSearchClose} />
            </Animated.View>
        )
    }
}

export default Left;