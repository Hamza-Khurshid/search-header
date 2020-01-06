import React from 'react';
import {
  Root, Header,
  Text
} from 'native-base';
import { View, StatusBar, StyleSheet, Animated, Easing } from 'react-native';
import Left from './source/components/Left';
import Right from './source/components/Right';
import Center from './source/components/Center';
import CircleTransition from './source/home/CirlceExpand';
import MyRipple from './source/components/MyRipple';
import Search from './source/search'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSearchActive: false,
      searchValue: '',
      // the Green background default value
      defaultScaleValue: new Animated.Value(1),
      // the White background default value
      searchScaleValue: new Animated.Value(0.01),
      // we will resolve the radius and diameter whitin onLayout callback
      radius: 0,
      diameter: 0,
      // it'll change zIndex after the animation is complete
      order: 'defaultFirst',
    };
  }

  getRef = (ref) => this.myRipple = ref

  onSearchOpenRequested = () => {
    this.animateBackground(0.01, this.state.searchScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.defaultScaleValue.setValue(1);
      // move default background above the search background (higher zIndex)
      this.setState({ order: 'searchFirst' });
    });
  };

  onSearchCloseRequested = () => {
    this.animateBackground(1, this.state.defaultScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.searchScaleValue.setValue(0.01);
      // move default bcakground under the search background (lower zIndex)
      this.setState({ order: 'defaultFirst' });
    });
  };

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;

    // pythagorean
    const radius = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    let diameter = radius * 2;
    // because there is issue in react native that we can't set scale value to 0, we need to use
    // 0.01 and it means we still see the point even if the scale set to 0.01
    const bgPosition = width - radius; // the correct left position of circle background
    // we need circle to be bigger, then we won't see the 0.01 scaled point (because it'll be
    // out of screen)
    const pointSize = diameter * 0.01;
    diameter += pointSize;

    this.setState({
      bgPosition,
      radius: diameter / 2,
      diameter,
    });
  };

  animateBackground = (v, value, onComplete) => {
    Animated.timing(value, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start(onComplete);
  };

  renderAnimatedBackgrounds = styles => {
    const {
      diameter,
      bgPosition,
      radius,
      defaultScaleValue,
      searchScaleValue,
      order,
    } = this.state;
    console.log()
    const bgStyle = {
      position: 'absolute',
      top: -radius,
      width: diameter,
      height: diameter,
      borderRadius: radius,
    };


    var searchA = searchScaleValue.interpolate({
      inputRange: [0.01, 1],
      outputRange: [0.01, 1]
    })

    var dscale = defaultScaleValue.interpolate({
      inputRange: [0.01, 1],
      outputRange: [1, 0.3]
    })
    const bgSearch = (
      <Animated.View
        key="searchBackground"
        style={[
          {
            left: bgPosition,
            backgroundColor: 'white',
            transform: [{ scale: searchA }],
          },
          bgStyle,
        ]}
      />
    );

    const bgDefault = (
      <Animated.View
        key="defaultBackground"
        style={[
          {
            right: bgPosition,
            backgroundColor: 'green',
            transform: [{ scale: dscale }],
          },
          bgStyle,
        ]}
      />
    );

    let content = null;

    if (order === 'defaultFirst') {
      content = [bgDefault, bgSearch];
    } else {
      content = [bgSearch, bgDefault];
    }

    return <View style={StyleSheet.absoluteFill}>{content}</View>;
  };

  onSearchPressed = () => {
    this.myRipple.start()
    this.setState({ isSearchActive: true });
  };

  onSearchTextChanged = searchValue => {
    this.setState({ searchValue });
  };

  onSearchClearPressed = () => {
    this.onSearchTextChanged('');
  };

  onSearchClosed = () => {
    if(this.state.isSearchActive){

      this.myRipple.start()
    }
    this.setState({
      isSearchActive: false,
      searchValue: '',
    });
  };

  render() {
    const { isSearchActive, searchValue } = this.state;

    return (
        <View
          style={[
            styles.container
          ]}>
        <StatusBar backgroundColor='#008BAC' />
        {/* <View style={styles.statusBar} /> */}
        {/* 
        </View> */}
        {/* <CircleTransition
          isSearchActive={isSearchActive}
          onSearchClose={this.onSearchClosed}
          title="Animation"
          searchValue={searchValue}
          onSearchTextChange={this.onSearchTextChanged}
          onSearchPress={this.onSearchPressed}
          onSearchClear={this.onSearchClearPressed}
        /> */}
        <MyRipple
        ref={this.getRef}>
          <View style={styles.toolbarContainer}>

            <Left
              isSearchActive={isSearchActive}
              onSearchClose={this.onSearchClosed}
            />
            <Center
              title="Sites"
              searchValue={searchValue}
              isSearchActive={isSearchActive}
              onSearchTextChange={this.onSearchTextChanged}
            />
            <Right
              searchValue={searchValue}
              isSearchActive={isSearchActive}
              onSearchPress={this.onSearchPressed}
              onSearchClear={this.onSearchClearPressed}
            />
          </View>
        </MyRipple>
        <Text style={{
          fontSize:30,
          color:'#333333',
          textAlign:'center',
          paddingTop:20
        }}>Zpe Search Demo</Text>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  // headerContainer: {
  //   display: 'flex',
  //   paddingTop: 12,
  //   flexDirection: 'row',
  //   backgroundColor: 'green',
  //   justifyContent: 'space-between',
  // },
  container: {
    flex:1
  },
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height: 60,
    width:'100%',
    paddingHorizontal:15,
  },
});

export default App;

{/* <Header style={styles.headerContainer}>
          <Left />
          <Center title="Let's Find" />
          <Right />
        </Header> */}