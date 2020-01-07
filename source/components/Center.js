import React from 'react';
import {
    Text,
    View,
    Easing,
    Animated,
    TextInput,
    StyleSheet
} from 'react-native';
import Search from '../search';
import NewComp from '../search/NewComp'

export default class Center extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            textInput: props.isSearchActive,
            opacityValue: new Animated.Value(1),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isSearchActive !== nextProps.isSearchActive) {
            this.animateElements(nextProps.isSearchActive);
        }
    }

    animateElements = (nextIsSearchActive) => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({
                textInput: nextIsSearchActive,
            });

            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }

    render() {
        const { title, onSearchTextChange, searchValue, isSearchActive } = this.props;
        const { opacityValue, textInput } = this.state;

        const color = isSearchActive ? "grey" : 'white';

        let content = <Text style={[styles.text, { color }]}>{title}</Text>;

        if (textInput) {
            content = ( 
            <TextInput 
            onChangeText={onSearchTextChange}
            placeholder="Search by ID/Name" /> 
            // <Search />
            
            );
        }

        return (
            <Animated.View style={[styles.container2, { opacity: opacityValue }]}>
                {content}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        marginLeft: 22,
    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'white',
        fontSize: 20,
    }
});