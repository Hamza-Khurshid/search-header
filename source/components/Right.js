import React, { Component } from 'react'
import { Icon } from 'native-base'
import { View, Text } from 'react-native'

class Right extends Component {
    render() {
        const { onSearchPress, onSearchClear, isSearchActive, searchValue } = this.props;

        if (isSearchActive && searchValue.length === 0) {
            return null;
        }

        const iconProps = {};

        if (isSearchActive && searchValue.length > 0) {
            iconProps.name = 'clear';
            iconProps.onPress = onSearchClear;
        } else {
            iconProps.name = 'search';
            iconProps.onPress = onSearchPress;
        }

        return (
            <View>
                <Icon {...iconProps} style={{ color: (isSearchActive && searchValue.length) > 0 ? "green" : "black" }} />
            </View>
        )
    }
}

export default Right;