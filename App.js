import React from 'react';
import {Root, Header, Text} from 'native-base';
import {
  View,
  StatusBar,
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
import HeaderComponent from './HeaderComponent'
let data = [
  {
    id: '1',
    title: 'MANAN',
  },
  {
    id: '2',
    title: 'Zindage na milay gi dobara',
  },
  {
    id: '3',
    title: 'Dil wale dulhaniye le jayen gay',
  },
  {
    id: '4',
    title: 'Aye dil hai mushkil',
  },
  {
    id: '5',
    title: 'Bahubali',
  },
  {
    id: '6',
    title: 'Dangal',
  },
  {
    id: '7',
    title: 'Har pal geo',
  },
  {
    id: '8',
    title: 'Zindage na milay gi dobara',
  },
  {
    id: '9',
    title: 'Dil wale dulhaniye le jayen gay',
  },
  {
    id: '10',
    title: 'Aye dil hai mushkil',
  },
  {
    id: '12',
    title: 'Bahubali',
  },
  {
    id: '13',
    title: 'Dangal',
  },

  {
    id: '14',
    title: 'Har pal geo',
  },
  {
    id: '15',
    title: 'Zindage na milay gi dobara',
  },
  {
    id: '16',
    title: 'Dil wale dulhaniye le jayen gay',
  },
  {
    id: '17',
    title: 'Aye dil hai mushkil',
  },
  {
    id: '18',
    title: 'Bahubali',
  },
  {
    id: '19',
    title: 'Dangal',
  },
  {
    id: '20',
    title: 'Har pal geo',
  },
  {
    id: '21',
    title: 'Zindage na milay gi dobara',
  },
  {
    id: '22',
    title: 'Dil wale dulhaniye le jayen gay',
  },
  {
    id: '23',
    title: 'Aye dil hai mushkil',
  },
  {
    id: '24',
    title: 'Bahubali',
  },
  {
    id: '25',
    title: 'N',
  },
  {
    id: '26',
    title: 'Manan',
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

  onPress = (dataObj) => {
    console.log(dataObj)
  }
  render() {
    return (
      <Root>
        {/* <SearchComp data={data} /> */}
         <StatusBar backgroundColor='#008BAC' />
        {/* // <View 
           style={[
        //     styles.container
        //   ]}>
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

        <HeaderComponent 
        data={data}
        onPress={this.onPress}  
        />

        

        <Text style={{ 
          fontSize:30,
          color:'#333333',
          textAlign:'center',
          paddingTop:20
        }}>Zpe Search Demo</Text>
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
