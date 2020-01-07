import React from 'react';

import { Text, View, FlatList,TouchableOpacity, StatusBar, StyleSheet, Animated, Easing } from 'react-native';
import Left from './source/components/Left';
import Right from './source/components/Right';
import Center from './source/components/Center';
import MyRipple from './source/components/MyRipple'
class HeaderComponent extends React.Component {
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
      filterData:[]
    };
  }


  searchData = (search) => {
    if (search != '') {
        var proData = this.props.data
        var filterData = proData.filter((item) => {
            return item['title'].toLowerCase().match(search.toLowerCase())
        })
        console.log(filterData)
        this.setState({ filterData:filterData })
    }
    else {
        this.setState({ filterData: this.props.data })
    }


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

  

  onSearchPressed = () => {
    this.myRipple.start()
    this.setState({ isSearchActive: true });
  };

  onSearchTextChanged = searchValue => {
    this.setState({ searchValue });
    this.searchData(searchValue)
  };

  onSearchClearPressed = () => {
    this.onSearchTextChanged('');
  };

  onSearchClosed = () => {
    if (this.state.isSearchActive) {

      this.myRipple.start()
    }
    this.setState({
      isSearchActive: false,
      searchValue: '',
    });
  };

  

  render() {
    const { isSearchActive, searchValue,filterData } = this.state;
    const {onPress} = this.props
    const isSuggest = isSearchActive && searchValue != ''?true:false
    return (
      <View
          style={isSuggest?{
            height:'100%'
          }:null}>
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
              height:'100%',
              paddingBottom:60
            }}>
            {isSuggest ? (
              <FlatList
                keyboardShouldPersistTaps="always"
                data={filterData}
                extraData={filterData.length}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.suggestionElementView}
                      onPress={() => onPress(item)}>
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
    );
  }
};

const styles = StyleSheet.create({
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
  itemText: {
    fontSize: 20
  },
  container: {
    flex: 1
  },
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
});

export default HeaderComponent;
