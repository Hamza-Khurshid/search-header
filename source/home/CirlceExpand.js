import React, {
    Component
  } from 'react'
   
  import {
    Easing,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
  } from 'react-native'
  import Left from '../components/Left';
  import Right from '../components/Right';
  import Center from '../components/Center';
   
  import CircleTransition from '../components/ExpandCircle'
  const ANIMATION_DURATION = 1000
  const INITIAL_VIEW_BACKGROUND_COLOR = '#E3E4E5'
  const CIRCLE_COLOR1 = '#29C5DB'
  const CIRCLE_COLOR2 = '#4EB8AE'
  const CIRCLE_COLOR3 = '#81C781'
  const CIRCLE_COLOR4 = '#B0D882'
  const TRANSITION_BUFFER = 10
  const POSITON = 'custom'
   
  const reactMixin = require('react-mixin')
  import TimerMixin from 'react-timer-mixin'
   
  class Exemples extends Component {
    constructor (props) {
      super(props)
      this.state = {
        viewBackgroundColor: INITIAL_VIEW_BACKGROUND_COLOR,
        circleColor: CIRCLE_COLOR1,
        customLeftMargin: 0,
        customTopMargin: 0,
        counter: 0
      }
      this.handlePress = this.handlePress.bind(this)
      this.changeColor = this.changeColor.bind(this)
    }
   
    handlePress (event) {
      let pressLocationX = event.nativeEvent.locationX
      let pressLocationY = event.nativeEvent.locationY
      this.setState({
        customLeftMargin: pressLocationX,
        customTopMargin: pressLocationY
      }, this.circleTransition.start(this.changeColor))
    }
   
    changeColor () {
      const { circleColor, counter } = this.state
      let newCounter = counter < 3 ? counter + 1 : 0
      let newCircleColor = this.getColor(newCounter)
      this.setState({
        viewBackgroundColor: circleColor,
        counter: newCounter
      })
      this.changeCircleColor(newCircleColor)
    }
   
    changeCircleColor (newCircleColor) {
      this.setTimeout(() => {
        this.setState({
          circleColor: newCircleColor
        })
      }, TRANSITION_BUFFER + 5)
    }
   
    getColor (counter) {
      switch (counter) {
        case 0:
          return CIRCLE_COLOR1
        case 1:
          return CIRCLE_COLOR2
        case 2:
          return CIRCLE_COLOR3
        case 3:
          return CIRCLE_COLOR4
        default:
          return CIRCLE_COLOR4
      }
    }
   
    render () {
      let {
        circleColor,
        viewBackgroundColor,
        customTopMargin,
        customLeftMargin
      } = this.state
      let {
        isSearchActive,
        onSearchClosed,
        title,
        searchValue,
        onSearchTextChanged,
        onSearchPressed,
        onSearchClearPressed
      } = this.props;

      return (
        <View style={[
          styles.container,
          {
            backgroundColor: viewBackgroundColor
          }]}>
              <View style={{
              width:'100%',
              height:80
          }}>
            <View style={styles.touchableView}>
              <Left
                isSearchActive={isSearchActive}
                onSearchClose={onSearchClosed}
              />
              <Center
                title={title}
                searchValue={searchValue}
                isSearchActive={isSearchActive}
                onSearchTextChange={onSearchTextChanged}
              />
              <Right
                searchValue={searchValue}
                isSearchActive={isSearchActive}
                onSearchPress={onSearchPressed}
                onSearchClear={onSearchClearPressed}
              />
            </View>
          <CircleTransition
            ref={(circle) => { this.circleTransition = circle }}
            color={circleColor}
            expand={false}
            scaleShrink={10}
            size={80}
            customTopMargin={customTopMargin}
            customLeftMargin={customLeftMargin}
            transitionBuffer={TRANSITION_BUFFER}
            duration={ANIMATION_DURATION}
            easing={Easing.linear}
            position={POSITON}
          />
              
          </View>
          
        </View>
      )
    }
  }
   
  reactMixin(Exemples.prototype, TimerMixin)
   
  const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: 60,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    touchableView: {
      flex: 1,
      paddingHorizontal: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 45,
      fontWeight: '400',
      color: '#253039'
    },
    touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
   
  export default Exemples