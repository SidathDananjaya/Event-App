
import React from 'react';
//import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Body } from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,Picker,StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');

import DatePicker from 'react-native-datepicker';

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname:'',
      uemail: '',
      phoneNo:'',
      upassword: '',
      checkvalidate:true,
      checkPvalidate:true,
      emptyError:true,
      //set value in state for initial date
      date:'',
      time:'',
      PickerSelectedVal :'Birthdays',
    }
  }
  render() {
    
    return (
      

        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={{fontSize: 26,color: '#0080ff',textAlign: 'center',marginBottom: 30,marginTop:10}}>
          Create New Event
        </Text>

        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <TextInput style={[styles.inputs]}
                placeholder="Event Name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
               // onChangeText={(uname) => this.setState({uname})}/>
               onChangeText={(uname) => {this.setState({uname});this.validate(uname,'username')}}/>
            <Image style={styles.inputIcon} source={require('../../images/icons8-event-48.png')}/>
            
        </View>

        <View style={[styles.inputContainer]}>
          
          <DatePicker
            style={{width: 760}}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select Date"
            format="DD-MM-YYYY"
            //minDate="01-01-1999"
            minDate={new Date()}
            //maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../../images/icons8-date-from-64.png')}
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    //left: 0,
                    top: 4,
                    right:0,
                    //marginLeft: 2,
                    //marginRight:2
                },
                dateInput: {
                    marginLeft: -656,
                    borderWidth:0,
                }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>
        <View style={[styles.inputContainer]}>
          
          <DatePicker
            style={{width: 760}}
            date={this.state.time} //initial date from state
            mode="time" //The enum of date, datetime and time
            placeholder="Select Time"
            //format="DD-MM-YYYY"
            //minDate="01-01-1999"
            //minDate={new Date()}
            //maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../../images/icons8-time-64.png')}
            customStyles={{
                timeIcon: {
                    position: 'absolute',
                    //left: 0,
                    top: 4,
                    right:0,
                    //marginLeft: 2
                    marginRight:2
                },
                dateInput: {
                    marginLeft: -606,
                    borderWidth:0,
                }
            }}
            onDateChange={(time) => {this.setState({time: time})}}
          />

        </View>

        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <TextInput style={[styles.inputs]}
                placeholder="Location"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
               // onChangeText={(uname) => this.setState({uname})}/>
               onChangeText={(uname) => {this.setState({uname});this.validate(uname,'username')}}/>
            <Image style={styles.inputIcon} source={require('../../images/icons8-place-marker-52.png')}/>
            
        </View>
        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <Picker
            selectedValue={this.state.PickerSelectedVal}
            style={{height: 50, width: 750}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({PickerSelectedVal: itemValue})
            }>
            <Picker.Item label="Birthdays" value="Birthdays" />
            <Picker.Item label="Family Event" value="FamilyEvent" />
            <Picker.Item label="Wedding" value="Wedding" />
            <Picker.Item label="Wedding Anniversaries" value="WeddingAnniversaries" />
            <Picker.Item label="Meeting" value="Meeting" />
            </Picker>
            
        </View>
        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <Picker
            selectedValue={this.state.PickerSelectedVal}
            style={{height: 50, width: 750}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({PickerSelectedVal: itemValue})
            }>
            <Picker.Item label="Select Contacts" value="Birthdays" />
            
            </Picker>
            
        </View>
        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <Picker
            selectedValue={this.state.PickerSelectedVal}
            style={{height: 50, width: 750}}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({PickerSelectedVal: itemValue})
            }>
            <Picker.Item label="Select Groups" value="Birthdays" />
            
            </Picker>
            
        </View>
        <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
            <TextInput style={[styles.inputs]}
                placeholder="Add other contacts"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
               // onChangeText={(uname) => this.setState({uname})}/>
               onChangeText={(uname) => {this.setState({uname});this.validate(uname,'username')}}/>
            <Image style={styles.inputIcon} source={require('../../images/icons8-add-128.png')}/>
            
        </View>
        {/* <Button title="Get Selected Picker Value" onPress={ this.getSelectedPickerValue } /> */}
          
        {!this.state.checkvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Sorry! Invalid Email</Text>}
        {!this.state.checkPvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>password is invalid!</Text>}
        {!this.state.emptyError && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter username & password!!!</Text>}

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserRegFunction}>
            <Text style={styles.loginText}>Create</Text>
          </TouchableOpacity>          
        </View>
    );
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:wp('20%'),
    height:hp('15%'),
      justifyContent: 'center',
      marginBottom:20,
    },
  inputContainer: {
   // borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    //borderBottomWidth: 1,
    width:wp('80%'),
    height:hp('5%'),
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    width:wp('80%'),
    height:hp('5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  registerContainer: {
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop:80,
    width:wp('50%'),   
    backgroundColor:'transparent'
  },
  btnRegister: {
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    marginTop:1.5,
    width:wp('50%'),
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    width:wp('80%'),
    height:hp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#0080ff",
  },
  loginText: {
    color: 'white',
    fontSize: hp('3%'),
  },
  bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
    fontWeight:'bold',
    fontSize: hp('2%'),
  },
  btnText1:{
    color:"white",
    fontWeight:'bold',
    fontSize: hp('2%'),
  },
  error:{
      borderWidth:1,
      borderColor:"red",
      borderRadius:30,
  }
});