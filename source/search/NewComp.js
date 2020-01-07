import React,{Component} from 'react';
import {View, ToastAndroid, TextInput,Text, StyleSheet, Dimensions, Measure, Keyboard, FlatList, TouchableWithoutFeedback, ViewPropTypes, Alert} from 'react-native';
import PropTypes from 'prop-types';
// import BorderTextInput from './BorderTextInput';
// import constants from '../../configurations/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
// import { NativeModulesCall } from '../../services/helperFunctions';
import { Toast } from 'native-base';
import Modal from "react-native-modal";

class AutoComplete extends Component{
    constructor(props) {
        super(props);
        console.log("===============")
        console.log("Data: ", props.data)
        console.log("===============")
        this.onChangeTextDelayed = _.debounce(this.displaySuggestion, 500);
        this.state = {
            isModal: false,
            selectedId: null,
            selectedValue: null,
            dataSource :[],
        }
        this.sugestionsListPos = {};
        this.elementHeight= null;
        this.elementPosition= null;
        this.primaryString = null;
        this.store = props.data;
        this.keyboardPos = Dimensions.get('screen').height;
        this.showSuggestions = true;
        this.measure = false;
    }

    // register events on keyboardDidShow and keyboardDidHide

    componentDidMount  () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
      }

    // deregister events on keyboardDidShow and keyboardDidHide
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    //when keyboard appears disbale scroll of parent component and pass it to the autocomplete component
    _keyboardDidShow (e) {
        this.keyboardPos = e.endCoordinates.screenY;
        this.showSuggestions = true;
        this.props.parentEndScroll();
    }

    //when keyboard hides disable scroll of autocomplete and pass it back to parent component
    _keyboardDidHide () {
        this.measure = false;
        this.keyboardPos = Dimensions.get('screen').height;
        this.showSuggestions = false;
        this.props.parentStartScroll();
    }

    //triggers at minimum of two characters 
    //if the previous text was substring of new text filter from the previous list else filter from main list
    getDataLogic = (str)=>{
        if(str.length > 0){
            let dataSource = [];
            // if(str.toLowerCase().indexOf(this.primaryString != null ? this.primaryString.toLowerCase() : null) >=0){
                dataSource = this.store.filter((itm) =>  (new RegExp(str.toLowerCase())).test(itm.title.toLowerCase()));
                console.log("Date Source: ", dataSource)
                this.setState({dataSource, isModal: dataSource.length > 0 ? true : false });
            // } 
            // else {
            //     this.primaryString = str;
            //     let requiredData = this.props.data.filter((itm) => (new RegExp(str.toLowerCase())).test(itm.title.toLowerCase()));
            //     this.store = requiredData;
            //     if(this.props.sorted){
            //         dataSource = requiredData.sort((a, b) => a[this.props.valueKey].toLowerCase().localeCompare(b[this.props.valueKey].toLowerCase()));
            //     }
            //     else{
            //         dataSource = requiredData;
            //     }
            //     this.setState({dataSource});
            // }
            if(!dataSource.length){
                Toast.show({ 
                    text: 'No data found',
                    position: 'center',
                    type: 'warning'
                })
                // NativeModulesCall(ToastAndroid.show)(constants.variableString.NO_DATA_FOUND, ToastAndroid.SHORT);
            }
        }
        // else{
        //     this.primaryString = null;
        //     this.store = [];
        //     this.setState({dataSource: []});
        // }
    }

    //on clicking of one of the suggestion
    onSuggestionSelect = (id, value)=>{
        // this.props.onSelect(id);
        this.setState({selectedId: id, selectedValue: value});
    }

    //on press of cross button reset 
    onSuggestionDeselect = ()=>{
        this.primaryString = null;
        this.store = [];
        this.props.onSelect(null);
        this.setState({selectedId: null, selectedValue: null, dataSource: []});
    }

    //measure position of element and display suggestions
    displaySuggestion = (str) =>{
        if(!this.measure){
            this.measure = true;
            if(!this.myComponent){
                return false;
            }
            this.myComponent.measure((fx, fy, width, height, px, py) => {
                this.elementHeight= height;
                this.elementPosition= py;
                let spaceAboveElement = this.elementPosition;
                let spaceBelowElement = (this.keyboardPos) - (this.elementPosition + this.elementHeight);
                this.sugestionsListPos = {"top": this.elementHeight, "maxHeight": spaceBelowElement - this.props.heightBottomThreshold};
                if(spaceAboveElement - this.props.heightTopThreshold > spaceBelowElement - this.props.heightBottomThreshold){
                    this.sugestionsListPos = {"bottom": this.elementHeight, "maxHeight": spaceAboveElement - this.props.heightTopThreshold};
                }
                this.getDataLogic(str);
            }) 
        }
        else{
            this.getDataLogic(str);
        }
    }

    render() {
        return this.state.selectedValue ? (
            <View style={[styles.selectedValueArea, this.props.selectedValueAreaStyle]}>
                <Text style={[styles.selectedValue, this.props.textStyle]} >{this.state.selectedValue}</Text>
                <View style = {styles.closeButtonArea}>
                    <TouchableWithoutFeedback onPress={this.onSuggestionDeselect}>       
                        <Icon name="md-close-circle" style={[styles.icon, this.props.iconStyle]}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>): 
            (<View style={{  height: '100%', width: '100%' }} onPress={()=>console.log("dfgdfgdfgdfgdf")}>
                <View ref={(element) => { this.myComponent = element; }} onLayout={() => { }}>
                    <TextInput  
                        height = {60}
                        placeholder = "Search"
                        style= {this.props.textStyle}
                        onChangeText ={this.onChangeTextDelayed}
                        onFocus={() => this.setState({isModal: false})}
                    />
                    <FlatList
                                keyboardShouldPersistTaps = 'always'
                                data={this.state.dataSource} 
                                renderItem={(data) => {
                                    return (
                                        <View key={data.item.id} >
                                            <TouchableWithoutFeedback
                                                onPress={() => {this.onSuggestionSelect(data.item.id, data.item.title)}}>
                                                <View style= {[styles.suggestionElementView, this.props.suggestionElementViewStyle]}>
                                                    <Text style = {[styles.suggestionItem, this.props.suggestionItemStyle]} numberOfLines={1}>
                                                        {data.item.title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    )}}
                                keyExtractor={data => 
                                    data.id ? data.id.toString() : null}
                            />
                </View>
                {this.state.dataSource.length > 0  && this.showSuggestions ? (
                    // <Modal
                    //     avoidKeyboard={true}
                    //     animationOutTiming={0}
                    //     backdropColor="transparent"
                    //     isVisible={this.state.isModal}
                    //     transparent={true}
                    //     onBackdropPress={() => this.setState({ isModal: false })}
                    // >
                        <View style={[styles.suggestionArea, this.sugestionsListPos]}>
                            <FlatList
                                keyboardShouldPersistTaps = 'always'
                                data={this.state.dataSource} 
                                renderItem={(data) => {
                                    return (
                                        <View key={data.item.id} >
                                            <TouchableWithoutFeedback
                                                onPress={() => {this.onSuggestionSelect(data.item.id, data.item.title)}}>
                                                <View style= {[styles.suggestionElementView, this.props.suggestionElementViewStyle]}>
                                                    <Text style = {[styles.suggestionItem, this.props.suggestionItemStyle]} numberOfLines={1}>
                                                        {data.item.title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    )}}
                                keyExtractor={data => 
                                    data.id ? data.id.toString() : null}
                            />
                        </View>
                    // </Modal>
                ) : null}
            </View>
            );
    }   
}


//default props
AutoComplete.defaultProps = {
    placeholder: "",
    data: [],
    heightTopThreshold: 50,
    heightBottomThreshold: 20,
    sorted: true,
};

//prop types validation
AutoComplete.propTypes = {
    selectedValueAreaStyle: PropTypes.oneOfType([
        PropTypes.object,
        ViewPropTypes.style,
    ]),
    placeholder: PropTypes.string, //placeholder string 
    // If this component is used in any scrollView we need to block parent scroll when suggestions appear and re enable scroll when suggestion disappear
    parentEndScroll: PropTypes.func.isRequired,
    parentStartScroll: PropTypes.func.isRequired,
    //Array of objects to bind data
    data: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
    //Function to trigger on any option selection
    onSelect: PropTypes.func.isRequired,
    iconStyle: PropTypes.oneOfType([
        PropTypes.object,
        ViewPropTypes.style,
    ]),
    suggestionElementViewStyle: PropTypes.oneOfType([
        PropTypes.object,
        ViewPropTypes.style,
    ]),
    suggestionItemStyle: PropTypes.oneOfType([
        PropTypes.object,
        Text.propTypes.style,
    ]),
    //id and value key of data array
    idKey: PropTypes.string.isRequired,
    valueKey: PropTypes.string.isRequired,
    fontFamily: PropTypes.string,
    color: PropTypes.string,
    textStyle: PropTypes.oneOfType([
        PropTypes.object,
        Text.propTypes.style,
    ]),
    sorted: PropTypes.bool
}


//default styles
const styles = StyleSheet.create({
    suggestionArea : {
        position: "absolute",
        left: 0, 
        right: 0, 
        zIndex: 99999999,
        borderRadius: 2,
        shadowColor: 'black',        
        borderWidth: 1,        
        borderColor: 'grey',
        borderBottomWidth: 0,        
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 15,
        backgroundColor: 'white',
    },
    suggestionElementView:{
        backgroundColor: 'white',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 14,
        paddingBottom: 14,
        width: "100%",
    },
    selectedValueArea:{
        flexDirection: "row", 
        paddingTop: 5, 
        paddingBottom: 5
    },
    closeButtonArea:{
        justifyContent : "center", 
        paddingLeft: 5
    },
    icon: {
        color: 'grey', 
        fontSize: 18,
        height: 25,
        width: 25
    },
    suggestionItem:{
        color: "black"
    },
    selectedValue:{
        color: "black", 
        maxWidth: "95%"
    }
});

export default AutoComplete;