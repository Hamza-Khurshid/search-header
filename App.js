import React from 'react';
import {Root, Header, Text} from 'native-base';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Left from './source/components/Left';
import Right from './source/components/Right';
import Center from './source/components/Center';
import CircleTransition from './source/home/CirlceExpand';
import MyRipple from './source/components/MyRipple';
import Search from './source/search';
import SearchComp from './source/search/NewComp';

let data = [
  {
    id: 'sdfsd545sd64fsd4f6',
    title: 'Har pal geo',
  },
  {
    id: 'sdfsd545sd6Sdf2s4df',
    title: 'Zindage na milay gi dobara',
  },
  {
    id: 'sdfsd5454s4dFsd4FS',
    title: 'Dil wale dulhaniye le jayen gay',
  },
  {
    id: 'sdfsd545sd45sdf45sdf',
    title: 'Aye dil hai mushkil',
  },
  {
    id: 'sdfsd545sd4f5d4f5d4f5df',
    title: 'Bahubali',
  },
  {
    id: 'sd45s4d5sd45sd',
    title: 'Dangal',
  },
];

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

  getRef = ref => (this.myRipple = ref);

  onSearchOpenRequested = () => {
    this.animateBackground(0.01, this.state.searchScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.defaultScaleValue.setValue(1);
      // move default background above the search background (higher zIndex)
      this.setState({order: 'searchFirst'});
    });
  };

  onSearchCloseRequested = () => {
    this.animateBackground(1, this.state.defaultScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.searchScaleValue.setValue(0.01);
      // move default bcakground under the search background (lower zIndex)
      this.setState({order: 'defaultFirst'});
    });
  };

  onLayout = event => {
    const {width, height} = event.nativeEvent.layout;

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
    console.log();
    const bgStyle = {
      position: 'absolute',
      top: -radius,
      width: diameter,
      height: diameter,
      borderRadius: radius,
    };

    var searchA = searchScaleValue.interpolate({
      inputRange: [0.01, 1],
      outputRange: [0.01, 1],
    });

    var dscale = defaultScaleValue.interpolate({
      inputRange: [0.01, 1],
      outputRange: [1, 0.3],
    });
    const bgSearch = (
      <Animated.View
        key="searchBackground"
        style={[
          {
            left: bgPosition,
            backgroundColor: 'white',
            transform: [{scale: searchA}],
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
            transform: [{scale: dscale}],
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
    this.myRipple.start();
    this.setState({isSearchActive: true});
  };

  onSearchTextChanged = searchValue => {
    this.setState({searchValue});
  };

  onSearchClearPressed = () => {
    this.onSearchTextChanged('');
  };

  onSearchClosed = () => {
    if (this.state.isSearchActive) {
      this.myRipple.start();
    }
    this.setState({
      isSearchActive: false,
      searchValue: '',
    });
  };

  render() {
    const {isSearchActive, searchValue} = this.state;

    return (
      <Root>
        {/* <SearchComp data={data} /> */}
        {/* // <View 
           style={[
        //     styles.container
        //   ]}>
        // <StatusBar backgroundColor='#008BAC' />
        // {/* <View style={styles.statusBar} /> */}
        {/* 
        // </View> */}
        {/* <CircleTransition
        //   isSearchActive={isSearchActive}
        //   onSearchClose={this.onSearchClosed}
        //   title="Animation"
        //   searchValue={searchValue}
        //   onSearchTextChange={this.onSearchTextChanged}
        //   onSearchPress={this.onSearchPressed}
        //   onSearchClear={this.onSearchClearPressed}
        // /> */}
        {/* <MyRipple
        ref={this.getRef}>
          <View style={styles.toolbarContainer}>

            <Left
              isSearchActive={isSearchActive}
              onSearchClose={this.onSearchClosed}
            />
            <Center
              data={data}
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
        </MyRipple> */}
        {/* <Text style={{ 
        //   fontSize:30,
        //   color:'#333333',
        //   textAlign:'center',
        //   paddingTop:20
        // }}>Zpe Search Demo</Text>
        // </View>
        */}

        <View
          style={{
            
          }}>
          <View
            style={{
              width: '100%',
              height: 60,
            }}>
            <MyRipple ref={this.getRef}>
              <View style={styles.toolbarContainer}>
                <Left
                  isSearchActive={isSearchActive}
                  onSearchClose={this.onSearchClosed}
                />
                <Center
                  data={data}
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
          </View>

          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: 60,
            }}>
            {isSearchActive && searchValue != '' ? (
              <FlatList
                keyboardShouldPersistTaps="always"
                data={data.find((n) => n.title.toLowerCase().match(searchValue) )}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.suggestionElementView}
                      onPress={() => {
                        alert(item.id, item.title);
                      }}>
                      <Text
                        style={[
                          styles.suggestionItem,
                        ]}
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : null}
          </View>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  // headerContainer: {
  //   display: 'flex',
  //   paddingTop: 12,
  //   flexDirection: 'row',
  //   backgroundColor: 'green',
  //   justifyContent: 'space-between',
  // },
  suggestionElementView:{
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 14,
    paddingBottom: 14,
    width: "100%",
    borderBottomWidth:2,
    borderBottomColor:'#3333'
},
  container: {
    flex: 1,
  },
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default App;

{
  /* <Header style={styles.headerContainer}>
          <Left />
          <Center title="Let's Find" />
          <Right />
        </Header> */
}
